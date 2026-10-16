/* Fills the GGT012 return visits template (one location per tab).
   Works on the workbook's XML directly so the charts, logo, comments and formatting are kept.
   Usage: const buf = await fillGGT012(templateArrayBuffer, data)
   data = { fullNo, date: Date, locations: [ { name, instruments, remarks: [lines], waterMax,
            rows: [ {C,D,E,...,Q} ... up to 6 ] } ] }  (max 10 locations per call) */
(function(){
  "use strict";
  const MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  const REL_NS  = "http://schemas.openxmlformats.org/package/2006/relationships";
  const R_NS    = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  const C_NS    = "http://schemas.openxmlformats.org/drawingml/2006/chart";
  const CT_NS   = "http://schemas.openxmlformats.org/package/2006/content-types";
  const COLS = ["C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q"];
  const FIRST_ROW = 9, MAX_ROWS = 6, MAX_TABS = 10;

  const P = new DOMParser(), S = new XMLSerializer();
  const parse = t => P.parseFromString(t, "application/xml");
  const ser = d => S.serializeToString(d);

  function dirOf(p){ return p.includes("/") ? p.slice(0, p.lastIndexOf("/")+1) : ""; }
  function resolve(base, target){
    if(target.startsWith("/")) return target.slice(1);
    const parts = (dirOf(base) + target).split("/"), out = [];
    for(const x of parts){ if(x==="..") out.pop(); else if(x!=="." && x!=="") out.push(x); }
    return out.join("/");
  }
  function relsPath(p){ return dirOf(p) + "_rels/" + p.slice(p.lastIndexOf("/")+1) + ".rels"; }
  function colNum(c){ let n=0; for(const ch of c) n = n*26 + ch.charCodeAt(0)-64; return n; }
  function splitRef(ref){ const m = ref.match(/^([A-Z]+)(\d+)$/); return {col:m[1], row:+m[2]}; }

  /* ---- worksheet cells ---- */
  function getRow(doc, r){
    const sd = doc.getElementsByTagNameNS(MAIN_NS, "sheetData")[0];
    for(const row of sd.getElementsByTagNameNS(MAIN_NS, "row")){
      const n = +row.getAttribute("r"); if(n===r) return row; if(n>r){ const nr=doc.createElementNS(MAIN_NS,"row"); nr.setAttribute("r",r); sd.insertBefore(nr,row); return nr; }
    }
    const nr = doc.createElementNS(MAIN_NS,"row"); nr.setAttribute("r",r); sd.appendChild(nr); return nr;
  }
  function getCell(doc, ref){
    const {col,row} = splitRef(ref), rowEl = getRow(doc,row), cn = colNum(col);
    for(const c of rowEl.getElementsByTagNameNS(MAIN_NS,"c")){
      const cc = splitRef(c.getAttribute("r")).col;
      if(cc===col) return c;
      if(colNum(cc)>cn){ const nc=doc.createElementNS(MAIN_NS,"c"); nc.setAttribute("r",ref); rowEl.insertBefore(nc,c); return nc; }
    }
    const nc = doc.createElementNS(MAIN_NS,"c"); nc.setAttribute("r",ref); rowEl.appendChild(nc); return nc;
  }
  function setCell(doc, ref, value){
    const c = getCell(doc, ref);
    while(c.firstChild) c.removeChild(c.firstChild);
    c.removeAttribute("t");
    if(value===null || value===undefined || value==="") return;
    if(typeof value==="number" && isFinite(value)){ const v=doc.createElementNS(MAIN_NS,"v"); v.textContent=String(value); c.appendChild(v); return; }
    c.setAttribute("t","inlineStr");
    const is=doc.createElementNS(MAIN_NS,"is"), t=doc.createElementNS(MAIN_NS,"t");
    t.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"); t.textContent=String(value); is.appendChild(t); c.appendChild(is);
  }
  // Keep a formula but update the value Excel shows before it recalculates.
  function setCached(doc, ref, value){
    const c = getCell(doc, ref), f = c.getElementsByTagNameNS(MAIN_NS,"f")[0];
    if(!f) return setCell(doc, ref, value);
    [...c.getElementsByTagNameNS(MAIN_NS,"v")].forEach(v=>c.removeChild(v));
    const v = doc.createElementNS(MAIN_NS,"v"); v.textContent = String(value);
    if(typeof value==="number") c.removeAttribute("t"); else c.setAttribute("t","str");
    c.appendChild(v);
  }

  /* ---- charts ---- */
  function fillChart(doc, grid, waterMax){
    const refs = [...doc.getElementsByTagNameNS(C_NS,"strRef"), ...doc.getElementsByTagNameNS(C_NS,"numRef")];
    for(const ref of refs){
      const f = ref.getElementsByTagNameNS(C_NS,"f")[0]; if(!f) continue;
      const m = f.textContent.match(/!\$([A-Z]+)\$(\d+):\$[A-Z]+\$(\d+)/); if(!m) continue;
      const isNum = ref.localName==="numRef";
      [...ref.childNodes].forEach(n=>{ if(n.localName==="strCache"||n.localName==="numCache") ref.removeChild(n); });
      const cache = doc.createElementNS(C_NS, isNum ? "c:numCache" : "c:strCache");
      if(isNum){ const fc=doc.createElementNS(C_NS,"c:formatCode"); fc.textContent="General"; cache.appendChild(fc); }
      const n = +m[3]-+m[2]+1, pc = doc.createElementNS(C_NS,"c:ptCount"); pc.setAttribute("val",n); cache.appendChild(pc);
      for(let i=0;i<n;i++){
        const val = grid[m[1]+(+m[2]+i)];
        if(val===undefined || val==="" || (isNum && typeof val!=="number")) continue;
        const pt=doc.createElementNS(C_NS,"c:pt"); pt.setAttribute("idx",i); const v=doc.createElementNS(C_NS,"c:v"); v.textContent=String(val); pt.appendChild(v); cache.appendChild(pt);
      }
      f.nextSibling ? ref.insertBefore(cache, f.nextSibling) : ref.appendChild(cache);
    }
    // The depth axis is the one drawn top-down; scale it to the well depth.
    if(waterMax){
      for(const ax of doc.getElementsByTagNameNS(C_NS,"valAx")){
        const sc = ax.getElementsByTagNameNS(C_NS,"scaling")[0], or = sc && sc.getElementsByTagNameNS(C_NS,"orientation")[0];
        if(!or || or.getAttribute("val")!=="maxMin") continue;
        const mx = sc.getElementsByTagNameNS(C_NS,"max")[0]; if(mx) mx.setAttribute("val", waterMax);
        const mu = ax.getElementsByTagNameNS(C_NS,"majorUnit")[0]; if(mu) mu.setAttribute("val", waterMax>10 ? 2 : 1);
      }
    }
  }

  function safeSheetName(name, used){
    let n = String(name||"Location").replace(/[\[\]:*?\/\\']/g,"-").trim().slice(0,31) || "Location";
    let base = n, i = 2; while(used.has(n.toUpperCase())) n = base.slice(0,28) + "-" + (i++);
    used.add(n.toUpperCase()); return n;
  }

  async function fillGGT012(buf, data){
    const zip = await JSZip.loadAsync(buf);
    const txt = p => zip.file(p).async("string");
    const locs = data.locations.slice(0, MAX_TABS);

    // Workbook and its sheets
    const wbPath = "xl/workbook.xml", wbRelsPath = relsPath(wbPath);
    const wb = parse(await txt(wbPath)), wbRels = parse(await txt(wbRelsPath));
    const relById = {}; for(const r of wbRels.getElementsByTagNameNS(REL_NS,"Relationship")) relById[r.getAttribute("Id")] = r;
    const sheetEls = [...wb.getElementsByTagNameNS(MAIN_NS,"sheet")];
    const used = new Set(), renames = [], keep = [];
    sheetEls.forEach((s, i) => {
      const rel = relById[s.getAttributeNS(R_NS,"id")], path = resolve(wbPath, rel.getAttribute("Target"));
      if(i < locs.length){
        const nn = safeSheetName(locs[i].name, used);
        renames.push([s.getAttribute("name"), nn]); s.setAttribute("name", nn); keep.push({path, loc:locs[i], index:i});
      } else { s.parentNode.removeChild(s); rel.parentNode.removeChild(rel); }
    });
    // Print areas: drop the removed tabs' and keep the rest pointing at the right tab.
    const dn = wb.getElementsByTagNameNS(MAIN_NS,"definedNames")[0];
    if(dn) [...dn.getElementsByTagNameNS(MAIN_NS,"definedName")].forEach(d=>{ const id=d.getAttribute("localSheetId"); if(id!==null && +id>=locs.length) dn.removeChild(d); });
    const bv = wb.getElementsByTagNameNS(MAIN_NS,"workbookView")[0]; if(bv){ bv.setAttribute("activeTab","0"); bv.removeAttribute("firstSheet"); }
    const calc = wb.getElementsByTagNameNS(MAIN_NS,"calcPr")[0]; if(calc) calc.setAttribute("fullCalcOnLoad","1");
    // Calculation chain is rebuilt by Excel; remove it because cells have changed.
    for(const r of [...wbRels.getElementsByTagNameNS(REL_NS,"Relationship")]) if(/calcChain$/.test(r.getAttribute("Type"))) r.parentNode.removeChild(r);

    // Rename sheet references everywhere (two steps so names can't collide).
    const renameRefs = s => { renames.forEach(([o],i)=>{ s = s.split("'"+o+"'!").join("'\u0001"+i+"\u0001'!"); }); renames.forEach(([,n],i)=>{ s = s.split("'\u0001"+i+"\u0001'!").join("'"+n+"'!"); }); return s; };
    zip.file(wbPath, renameRefs(ser(wb)));
    zip.file(wbRelsPath, ser(wbRels));

    // Fill each kept tab and its charts
    for(const k of keep){
      const doc = parse(renameRefs(await txt(k.path))), L = k.loc, grid = {};
      for(let r=0;r<MAX_ROWS;r++){
        const row = L.rows[r] || {};
        for(const c of COLS){ const v = row[c]; setCell(doc, c+(FIRST_ROW+r), v===undefined?"":v); grid[c+(FIRST_ROW+r)] = v===undefined?"":v; }
      }
      setCell(doc, "F5", L.name);
      setCell(doc, "E15", L.instruments || "");
      const rem = L.remarks || [];
      setCell(doc, "E16", rem[0] || ""); setCell(doc, "E17", rem.slice(1).join("; "));
      if(k.index===0){ setCell(doc, "E2", data.fullNo); setCell(doc, "Q3", data.dateSerial); }
      else { setCached(doc, "E2", data.fullNo); setCached(doc, "Q3", data.dateSerial); }
      zip.file(k.path, ser(doc));
      // charts on this tab
      const sRels = relsPath(k.path); if(!zip.file(sRels)) continue;
      for(const r of parse(await txt(sRels)).getElementsByTagNameNS(REL_NS,"Relationship")){
        if(!/\/drawing$/.test(r.getAttribute("Type"))) continue;
        const dPath = resolve(k.path, r.getAttribute("Target")), dRels = relsPath(dPath); if(!zip.file(dRels)) continue;
        for(const cr of parse(await txt(dRels)).getElementsByTagNameNS(REL_NS,"Relationship")){
          if(!/\/chart$/.test(cr.getAttribute("Type"))) continue;
          const cPath = resolve(dPath, cr.getAttribute("Target"));
          const cdoc = parse(renameRefs(await txt(cPath))); fillChart(cdoc, grid, L.waterMax); zip.file(cPath, ser(cdoc));
        }
      }
    }

    // Remove every part no longer reachable (removed tabs, their charts, calc chain).
    const reach = new Set(), queue = [""];
    while(queue.length){
      const part = queue.shift(), rp = part==="" ? "_rels/.rels" : relsPath(part);
      if(!zip.file(rp)) continue; reach.add(rp);
      for(const r of parse(await txt(rp)).getElementsByTagNameNS(REL_NS,"Relationship")){
        if(r.getAttribute("TargetMode")==="External") continue;
        const t = resolve(part, r.getAttribute("Target")); if(!reach.has(t)){ reach.add(t); queue.push(t); }
      }
    }
    const ct = parse(await txt("[Content_Types].xml"));
    for(const name of Object.keys(zip.files)){
      if(zip.files[name].dir || name==="[Content_Types].xml" || reach.has(name)) continue;
      zip.remove(name);
    }
    for(const o of [...ct.getElementsByTagNameNS(CT_NS,"Override")]){
      const pn = o.getAttribute("PartName").replace(/^\//,"");
      if(!zip.file(pn)) o.parentNode.removeChild(o);
      else if(/spreadsheetml\.template\.main\+xml$/.test(o.getAttribute("ContentType"))) o.setAttribute("ContentType","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml");
    }
    zip.file("[Content_Types].xml", ser(ct));
    // Sheet titles in the document properties are optional; drop them rather than leave stale ones.
    if(zip.file("docProps/app.xml")){
      const app = parse(await txt("docProps/app.xml"));
      ["HeadingPairs","TitlesOfParts"].forEach(n=>[...app.getElementsByTagName(n)].forEach(e=>e.parentNode.removeChild(e)));
      zip.file("docProps/app.xml", ser(app));
    }
    return zip.generateAsync({type:"arraybuffer", compression:"DEFLATE"});
  }
  window.fillGGT012 = fillGGT012;
  window.GGT012_MAX_TABS = MAX_TABS;
})();
