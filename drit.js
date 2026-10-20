/* DRIT (double ring infiltrometer test) helpers.
   - osgbGridRef(lat, lon): GPS position to an OS National Grid reference.
   - getGridRef(onProgress): asks the phone for its best position over a few seconds.
   - dritCalc(runs): the numbers the spreadsheet will show.
   - fillDRIT(templateBuffer, data): fills the DRIT template, keeping its chart and logo. */
(function(){
"use strict";

/* ---------- OS National Grid ---------- */
// WGS84 (GPS) -> OSGB36 by Helmert transform, then Transverse Mercator. Good to about 5 m,
// which is within the usual accuracy of a phone's GPS.
const RAD = Math.PI/180;
function toCartesian(lat, lon, a, b){
  const e2 = 1 - (b*b)/(a*a), s = Math.sin(lat), c = Math.cos(lat);
  const nu = a/Math.sqrt(1 - e2*s*s);
  return [nu*c*Math.cos(lon), nu*c*Math.sin(lon), (1-e2)*nu*s];
}
function fromCartesian(x, y, z, a, b){
  const e2 = 1 - (b*b)/(a*a), p = Math.sqrt(x*x + y*y);
  let lat = Math.atan2(z, p*(1-e2)), prev = 2*Math.PI;
  while(Math.abs(lat-prev) > 1e-12){ const nu = a/Math.sqrt(1 - e2*Math.sin(lat)**2); prev = lat; lat = Math.atan2(z + e2*nu*Math.sin(lat), p); }
  return [lat, Math.atan2(y, x)];
}
function wgs84ToOsgb36(latDeg, lonDeg){
  const [x1,y1,z1] = toCartesian(latDeg*RAD, lonDeg*RAD, 6378137, 6356752.314245);
  const tx=-446.448, ty=125.157, tz=-542.060, s=20.4894e-6;
  const rx=(-0.1502/3600)*RAD, ry=(-0.2470/3600)*RAD, rz=(-0.8421/3600)*RAD;
  const x2 = tx + (1+s)*x1 - rz*y1 + ry*z1;
  const y2 = ty + rz*x1 + (1+s)*y1 - rx*z1;
  const z2 = tz - ry*x1 + rx*y1 + (1+s)*z1;
  return fromCartesian(x2, y2, z2, 6377563.396, 6356256.909);
}
function osgbEN(latDeg, lonDeg){
  const [lat, lon] = wgs84ToOsgb36(latDeg, lonDeg);
  const a=6377563.396, b=6356256.909, F0=0.9996012717, lat0=49*RAD, lon0=-2*RAD, N0=-100000, E0=400000;
  const e2 = 1-(b*b)/(a*a), n=(a-b)/(a+b), n2=n*n, n3=n*n*n;
  const cosL=Math.cos(lat), sinL=Math.sin(lat), tanL=Math.tan(lat);
  const nu=a*F0/Math.sqrt(1-e2*sinL*sinL), rho=a*F0*(1-e2)/Math.pow(1-e2*sinL*sinL,1.5), eta2=nu/rho-1;
  const Ma=(1+n+(5/4)*n2+(5/4)*n3)*(lat-lat0), Mb=(3*n+3*n2+(21/8)*n3)*Math.sin(lat-lat0)*Math.cos(lat+lat0);
  const Mc=((15/8)*n2+(15/8)*n3)*Math.sin(2*(lat-lat0))*Math.cos(2*(lat+lat0)), Md=(35/24)*n3*Math.sin(3*(lat-lat0))*Math.cos(3*(lat+lat0));
  const M=b*F0*(Ma-Mb+Mc-Md);
  const I=M+N0, II=(nu/2)*sinL*cosL, III=(nu/24)*sinL*cosL**3*(5-tanL**2+9*eta2), IIIA=(nu/720)*sinL*cosL**5*(61-58*tanL**2+tanL**4);
  const IV=nu*cosL, V=(nu/6)*cosL**3*(nu/rho-tanL**2), VI=(nu/120)*cosL**5*(5-18*tanL**2+tanL**4+14*eta2-58*tanL**2*eta2);
  const dL=lon-lon0;
  return {e: E0+IV*dL+V*dL**3+VI*dL**5, n: I+II*dL**2+III*dL**4+IIIA*dL**6};
}
function gridLetters(e, n){
  const e100k=Math.floor(e/100000), n100k=Math.floor(n/100000);
  if(e100k<0 || e100k>6 || n100k<0 || n100k>12) return null;
  let l1=(19-n100k)-(19-n100k)%5+Math.floor((e100k+10)/5), l2=(19-n100k)*5%25+e100k%5;
  if(l1>7) l1++; if(l2>7) l2++; // the grid skips the letter I
  return String.fromCharCode(l1+65) + String.fromCharCode(l2+65);
}
// 10-figure reference, e.g. "TM 44521 61987" (1 m precision).
function osgbGridRef(lat, lon){
  const {e, n} = osgbEN(lat, lon), letters = gridLetters(e, n);
  if(!letters) return null;
  const pad = v => String(Math.floor(v % 100000)).padStart(5, "0");
  return {gridRef:`${letters} ${pad(e)} ${pad(n)}`, easting:Math.round(e), northing:Math.round(n)};
}

// Watches the position for up to maxMs and keeps the most accurate fix.
// Stops early once accuracy is within goodM metres.
function getGridRef(onProgress, {maxMs=20000, goodM=5}={}){
  return new Promise((resolve, reject)=>{
    if(!navigator.geolocation) return reject(new Error("This phone can't share its location with the app."));
    let best=null, id=null, timer=null, done=false;
    const finish = err => {
      if(done) return; done=true; navigator.geolocation.clearWatch(id); clearTimeout(timer);
      if(best){ const g = osgbGridRef(best.coords.latitude, best.coords.longitude);
        if(!g) return reject(new Error("That position is outside the OS National Grid."));
        resolve({...g, lat:best.coords.latitude, lon:best.coords.longitude, accuracy:Math.round(best.coords.accuracy), at:Date.now()}); }
      else reject(err || new Error("Couldn't get a position. Try again with a clear view of the sky."));
    };
    id = navigator.geolocation.watchPosition(pos=>{
      if(!best || pos.coords.accuracy < best.coords.accuracy) best = pos;
      if(onProgress) onProgress(Math.round(best.coords.accuracy));
      if(best.coords.accuracy <= goodM) finish();
    }, err=>{
      if(err.code===1) finish(new Error("Location permission is off for this app. Turn it on in your phone's settings."));
      else if(!best) finish(new Error("Couldn't get a position: "+(err.message||"unknown error")));
    }, {enableHighAccuracy:true, maximumAge:0, timeout:maxMs});
    timer = setTimeout(()=>finish(), maxMs);
    getGridRef.stop = () => finish();
  });
}

/* ---------- Calculations (mirror the template's formulas) ---------- */
// runs: [{start, end (minutes after midnight), after, before (cm)}], completed runs only, in order.
function dritCalc(runs){
  const rows = []; let cum = 0, cumInf = 0;
  runs.forEach((r, i)=>{
    let dur = r.end - r.start; if(dur < 0) dur += 1440; // over midnight
    const inf = (r.before - r.after)*10;               // mm
    cum += dur; if(i>0) cumInf += inf;                 // template: M15 = 0, then M = M(prev) + J
    rows.push({interval:dur, cum, inf, rate: dur ? inf/dur : null, ms: dur ? (inf/1000)/(dur*60) : null, cumInf});
  });
  const n = rows.length, take = n >= 5 ? 4 : Math.min(2, n);
  const from = n - take; // index of first averaged run
  const avgOf = k => { const v = rows.slice(from).map(r=>r[k]).filter(x=>x!==null); return v.length ? v.reduce((a,b)=>a+b,0)/v.length : null; };
  return {rows, from, take, avgRate:avgOf("rate"), avgMs:avgOf("ms"), totalMin:cum};
}

/* ---------- Spreadsheet template ---------- */
const colNum = c => c.split("").reduce((a,ch)=>a*26+ch.charCodeAt(0)-64, 0);
const xmlEsc = s => String(s ?? "").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmtNum = v => (v===null || v===undefined || !isFinite(v)) ? null : String(v);

function parseSheet(xml){
  const sdStart = xml.indexOf("<sheetData>"), sdEnd = xml.indexOf("</sheetData>");
  const head = xml.slice(0, sdStart), tail = xml.slice(sdEnd + "</sheetData>".length), body = xml.slice(sdStart+11, sdEnd);
  const rows = new Map();
  const rowRe = /<row r="(\d+)"([^>]*?)(\/>|>([\s\S]*?)<\/row>)/g; let m;
  while((m = rowRe.exec(body))){
    const cells = new Map(), cellRe = /<c r="([A-Z]+)(\d+)"((?:\s+[\w:]+="[^"]*")*)\s*(\/>|>([\s\S]*?)<\/c>)/g; let c;
    const inner = m[4] || "";
    while((c = cellRe.exec(inner))){ const s = (c[3].match(/\ss="(\d+)"/)||[])[1], t = (c[3].match(/\st="(\w+)"/)||[])[1]; cells.set(c[1], {attrs:c[3], s, t, inner:c[5]||""}); }
    rows.set(+m[1], {attrs:m[2], cells});
  }
  return {head, tail, rows};
}
function sheetXml(sh){
  const rows = [...sh.rows.entries()].sort((a,b)=>a[0]-b[0]).map(([r, row])=>{
    const cells = [...row.cells.entries()].sort((a,b)=>colNum(a[0])-colNum(b[0])).map(([col, c])=>{
      const attrs = c.attrs.replace(/\s(s|t)="[^"]*"/g, "") + (c.s!==undefined ? ` s="${c.s}"` : "") + (c.t ? ` t="${c.t}"` : "");
      return c.inner ? `<c r="${col}${r}"${attrs}>${c.inner}</c>` : `<c r="${col}${r}"${attrs}/>`;
    }).join("");
    return `<row r="${r}"${row.attrs}>${cells}</row>`;
  }).join("");
  return sh.head + "<sheetData>" + rows + "</sheetData>" + sh.tail;
}
function cell(sh, ref){
  const [, col, r] = ref.match(/^([A-Z]+)(\d+)$/);
  if(!sh.rows.has(+r)) sh.rows.set(+r, {attrs:"", cells:new Map()});
  const row = sh.rows.get(+r);
  if(!row.cells.has(col)) row.cells.set(col, {attrs:"", s:undefined, inner:""});
  const c = row.cells.get(col); c.t = undefined; c.attrs = c.attrs.replace(/\st="[^"]*"/g, ""); return c;
}
function setStr(sh, ref, text){ const c = cell(sh, ref); if(text===null || text===undefined || text===""){ c.inner=""; return; } c.t = "inlineStr"; c.inner = `<is><t xml:space="preserve">${xmlEsc(text)}</t></is>`; }
function setNum(sh, ref, v){ const c = cell(sh, ref); const s = fmtNum(v); c.inner = s===null ? "" : `<v>${s}</v>`; }
function setFormula(sh, ref, f, v){ const c = cell(sh, ref); const s = fmtNum(v);
  if(s===null){ c.t = "e"; c.inner = `<f>${xmlEsc(f)}</f><v>#DIV/0!</v>`; } else c.inner = `<f>${xmlEsc(f)}</f><v>${s}</v>`; }
function clearCell(sh, ref){ const c = cell(sh, ref); c.inner = ""; }

const FIRST = 15, TEMPLATE_RUNS = 10, AVG_ROW = 26, PRINT_LAST = 47;
const ST = {plainK:"21", plainL:"22", orangeK:"28", orangeL:"29"}; // styles already in the template

// Moves every row from `from` down by k, and inserts k blank run rows copied from row from-1.
function insertRows(sh, from, k){
  const moved = new Map();
  for(const [r, row] of sh.rows) moved.set(r >= from ? r + k : r, row);
  const model = sh.rows.get(from - 1);
  for(let i=0;i<k;i++){
    const cells = new Map(); for(const [col, c] of model.cells) cells.set(col, {...c, inner:""});
    moved.set(from + i, {attrs:model.attrs, cells});
  }
  sh.rows = moved;
  const shift = ref => ref.replace(/([A-Z]+)(\d+)/g, (_, c, r) => c + (+r >= from ? +r + k : r));
  sh.tail = sh.tail.replace(/<mergeCell ref="([^"]+)"\/>/g, (_, ref) => `<mergeCell ref="${shift(ref)}"/>`);
  sh.head = sh.head.replace(/<dimension ref="([^"]+)"\/>/, (_, ref) => `<dimension ref="${shift(ref)}"/>`)
                   .replace(/<selection activeCell="[^"]*" sqref="[^"]*"\/>/, '<selection activeCell="D5" sqref="D5"/>');
}

function numCache(vals, fmt){
  const pts = vals.map((v,i)=>fmtNum(v)===null ? "" : `<c:pt idx="${i}"><c:v>${fmtNum(v)}</c:v></c:pt>`).join("");
  return `<c:numCache><c:formatCode>${fmt}</c:formatCode><c:ptCount val="${vals.length}"/>${pts}</c:numCache>`;
}

/* data: {fullNo, site, by, dateSerial, location, w3w, gridRef, runs:[{start,end,after,before}]} */
async function fillDRIT(buf, data){
  const zip = await JSZip.loadAsync(buf);
  const sheetPath = "xl/worksheets/sheet1.xml";
  const sh = parseSheet(await zip.file(sheetPath).async("string"));
  const runs = data.runs, n = runs.length, calc = dritCalc(runs);
  const extra = Math.max(0, n - TEMPLATE_RUNS), avgRow = AVG_ROW + extra;
  if(extra) insertRows(sh, FIRST + TEMPLATE_RUNS, extra);

  // Header
  setStr(sh, "D5", data.fullNo);
  setStr(sh, "J5", data.by);
  setStr(sh, "D6", data.site);
  if(data.dateSerial) setNum(sh, "D7", data.dateSerial); else clearCell(sh, "D7");
  setStr(sh, "D8", data.location);
  if(String(data.w3w||"").trim()){ setStr(sh, "C9", "what3words:"); setStr(sh, "D9", String(data.w3w).trim()); }
  else { setStr(sh, "C9", "Grid Reference:"); setStr(sh, "D9", data.gridRef || ""); }

  // Runs
  const lastRow = FIRST + Math.max(TEMPLATE_RUNS, n) - 1;
  for(let r=FIRST, i=0; r<=lastRow; r++, i++){
    const used = i < n, avg = used && i >= calc.from;
    setNum(sh, "C"+r, i+1);
    cell(sh, "K"+r).s = avg ? ST.orangeK : ST.plainK;
    cell(sh, "L"+r).s = avg ? ST.orangeL : ST.plainL;
    if(!used){ ["D","E","F","G","H","I","J","K","L","M"].forEach(c=>clearCell(sh, c+r)); }
    else {
      const run = runs[i], row = calc.rows[i];
      let end = run.end; if(end < run.start) end += 1440;
      setNum(sh, "D"+r, run.start/1440); setNum(sh, "E"+r, end/1440);
      setNum(sh, "F"+r, run.after); setNum(sh, "G"+r, run.before);
      setFormula(sh, "H"+r, r===FIRST ? `(E${r}-D$${FIRST})*1440` : `((E${r}-D${r})*1440)+H${r-1}`, row.cum);
      setFormula(sh, "I"+r, `(E${r}-D${r})*1440`, row.interval);
      setFormula(sh, "J"+r, `(G${r}-F${r})*10`, row.inf);
      setFormula(sh, "K"+r, `J${r}/I${r}`, row.rate);
      setFormula(sh, "L"+r, `(J${r}/1000)/(I${r}*60)`, row.ms);
      if(r===FIRST) setNum(sh, "M"+r, 0); else setFormula(sh, "M"+r, `M${r-1}+J${r}`, row.cumInf);
    }
    setFormula(sh, "P"+r, `K$${avgRow}`, calc.avgRate);
  }
  if(n){
    const a = FIRST + calc.from, b = FIRST + n - 1;
    setFormula(sh, "K"+avgRow, `AVERAGE(K${a}:K${b})`, calc.avgRate);
    setFormula(sh, "L"+avgRow, `AVERAGE(L${a}:L${b})`, calc.avgMs);
  } else { clearCell(sh, "K"+avgRow); clearCell(sh, "L"+avgRow); }
  zip.file(sheetPath, sheetXml(sh));

  // Chart: data series covers every run; average line keeps the template's range; x-axis fits the full time.
  const chartPath = Object.keys(zip.files).find(p=>/^xl\/charts\/chart\d+\.xml$/.test(p));
  if(chartPath){
    let c = await zip.file(chartPath).async("string");
    const last = FIRST + Math.max(n,1) - 1;
    const valueAt = (col, r) => { const i = r - FIRST; if(i<0 || i>=n) return null;
      const row = calc.rows[i]; return {H:row.cum, K:row.rate, M:i===0?0:row.cumInf, P:calc.avgRate}[col]; };
    let serIdx = 0;
    c = c.replace(/<c:ser>[\s\S]*?<\/c:ser>/g, ser => {
      const first = serIdx++ === 0;
      return ser.replace(/<c:numRef><c:f>([^<]*)<\/c:f><c:numCache><c:formatCode>([^<]*)<\/c:formatCode>[\s\S]*?<\/c:numCache><\/c:numRef>/g, (all, f, fmt) => {
        const m = f.match(/^(.*!)\$([A-Z]+)\$(\d+):\$([A-Z]+)\$(\d+)$/); if(!m) return all;
        const col = m[2], r1 = +m[3], r2 = first ? last : +m[5];
        const vals = []; for(let r=r1; r<=r2; r++) vals.push(valueAt(col, r));
        return `<c:numRef><c:f>${m[1]}$${col}$${r1}:$${col}$${r2}</c:f>${numCache(vals, fmt)}</c:numRef>`;
      });
    });
    const xMax = Math.max(10, Math.ceil(calc.totalMin/10)*10);
    c = c.replace(/(<c:valAx>(?:(?!<\/c:valAx>)[\s\S])*?<c:axPos val="b"\/>)/, ax => ax.replace(/<c:max val="[^"]*"\/>/, `<c:max val="${xMax}"/>`));
    zip.file(chartPath, c);
  }

  // Drawings below the run rows move down with them.
  if(extra){
    const drawPath = Object.keys(zip.files).find(p=>/^xl\/drawings\/drawing\d+\.xml$/.test(p));
    if(drawPath){
      let d = await zip.file(drawPath).async("string");
      d = d.replace(/<xdr:row>(\d+)<\/xdr:row>/g, (all, r) => +r >= FIRST + TEMPLATE_RUNS - 1 ? `<xdr:row>${+r + extra}</xdr:row>` : all);
      zip.file(drawPath, d);
    }
  }

  // Workbook: recalculate on open, stretch the print area, drop the stale calculation chain.
  let wb = await zip.file("xl/workbook.xml").async("string");
  wb = wb.replace(/\$N\$(\d+)/, (_, r) => "$N$" + (+r + extra));
  wb = /<calcPr[^>]*fullCalcOnLoad/.test(wb) ? wb : wb.replace(/<calcPr/, '<calcPr fullCalcOnLoad="1"');
  zip.file("xl/workbook.xml", wb);
  if(zip.file("xl/calcChain.xml")){
    zip.remove("xl/calcChain.xml");
    const rp = "xl/_rels/workbook.xml.rels"; let rels = await zip.file(rp).async("string");
    zip.file(rp, rels.replace(/<Relationship [^>]*Target="calcChain\.xml"\/>/, ""));
    let ct = await zip.file("[Content_Types].xml").async("string");
    zip.file("[Content_Types].xml", ct.replace(/<Override PartName="\/xl\/calcChain\.xml"[^>]*\/>/, ""));
  }
  return zip.generateAsync({type:"arraybuffer", compression:"DEFLATE"});
}

const root = typeof window !== "undefined" ? window : globalThis;
Object.assign(root, {osgbGridRef, getGridRef, dritCalc, fillDRIT, DRIT_TEMPLATE_RUNS:TEMPLATE_RUNS});
})();
