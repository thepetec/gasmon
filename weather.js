/* Met Office weather suggestions for a visit.
   Land Observations (nearest UK station, measured): pressure tendency, pressure, recent weather codes.
   Site Specific Global Spot (forecast at the GPS point): temperature, wind, sky, rain now.
   Returns suggestions only; the app asks the user to confirm before saving anything. */
(function(){
  "use strict";
  const OBS_KEY  = "eyJ4NXQjUzI1NiI6Ik5XVTVZakUxTkRjeVl6a3hZbUl4TkdSaFpqSmpOV1l6T1dGaE9XWXpNMk0yTWpRek5USm1OVEE0TXpOaU9EaG1NVFJqWVdNellXUm1ZalUyTTJJeVpBPT0iLCJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ==.eyJzdWIiOiJwZXRlckBnZW9zcGhlcmUtZW52aXJvbm1lbnRhbC5jby51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InBldGVyQGdlb3NwaGVyZS1lbnZpcm9ubWVudGFsLmNvLnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJsYW5kX29icy1kM2I0MzU4Yi1kZmY0LTRhZDMtYWJhMS0yZTA4ODExZDlhYWYiLCJpZCI6NjgzOTUsInV1aWQiOiJmY2Q1NTQ3MS0wZTlkLTRiNGYtOTM2OS0wZjdiNzMzZTBlOTYifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfY2RwX2xhbmRvYnNfZnJlZSI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IkNEUF9PYnNlcnZhdGlvbl9MYW5kIiwiY29udGV4dCI6Ilwvb2JzZXJ2YXRpb24tbGFuZFwvMSIsInB1Ymxpc2hlciI6IkNvbnN1bWVyRGlnaXRhbF9DSSIsInZlcnNpb24iOiIxIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9jZHBfbGFuZG9ic19mcmVlIn1dLCJ0b2tlbl90eXBlIjoiYXBpS2V5IiwiaWF0IjoxNzkyNDA1MDE1LCJqdGkiOiI5M2Q5MDRlMS1jN2U1LTQyZjEtYjhlNi0xMDYwY2Q5OTNiNjcifQ==.PXT8mPyp9pvsTj-H4jxjdDDSKK6INqvM96VvSdPkRbOiz9p9VhILQKimcLqcC93n8KpQ7HguIcKL7VobCuXkmnmf3FsPA4PZq9Ny_gp_mZDFsiBYuLShOVgw2dtGYDgRaihPNMiiroOFP6EEBXKr1E-GpP80jNdSLxsdsko8U-vWCI3JVOWU5jgIetViK2ld5rYP8qvbBrPufFeDrtvc4f4nUKWGVp-He-w_fgV1p2-9J2Ob5ZmeQi1aHwFxPUIehOmZpCFD1KPfzFt-US_zNspqWEupufgWBRFSpugMPZLRsySpqFYh9_goCrVFGa2N1WPqL4OGst0Zod0pC1HFqw==";
  const SPOT_KEY = "eyJ4NXQjUzI1NiI6Ik5XVTVZakUxTkRjeVl6a3hZbUl4TkdSaFpqSmpOV1l6T1dGaE9XWXpNMk0yTWpRek5USm1OVEE0TXpOaU9EaG1NVFJqWVdNellXUm1ZalUyTTJJeVpBPT0iLCJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ==.eyJzdWIiOiJwZXRlckBnZW9zcGhlcmUtZW52aXJvbm1lbnRhbC5jby51a0BjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6InBldGVyQGdlb3NwaGVyZS1lbnZpcm9ubWVudGFsLmNvLnVrIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJzaXRlX3NwZWNpZmljLWQzYjQzNThiLWRmZjQtNGFkMy1hYmExLTJlMDg4MTFkOWFhZiIsImlkIjo2ODM5NiwidXVpZCI6IjBlOWI3Mzc1LWVlZmQtNDhkNS04NDhlLTQzNTc2Mjk5Njg0ZSJ9LCJpc3MiOiJodHRwczpcL1wvYXBpLW1hbmFnZXIuYXBpLW1hbmFnZW1lbnQubWV0b2ZmaWNlLmNsb3VkOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUiOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsImdyYXBoUUxNYXhDb21wbGV4aXR5IjowLCJncmFwaFFMTWF4RGVwdGgiOjAsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6InNlYyJ9fSwia2V5dHlwZSI6IlBST0RVQ1RJT04iLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTaXRlU3BlY2lmaWNGb3JlY2FzdCIsImNvbnRleHQiOiJcL3NpdGVzcGVjaWZpY1wvdjAiLCJwdWJsaXNoZXIiOiJKYWd1YXJfQ0kiLCJ2ZXJzaW9uIjoidjAiLCJzdWJzY3JpcHRpb25UaWVyIjoid2RoX3NpdGVfc3BlY2lmaWNfZnJlZSJ9XSwidG9rZW5fdHlwZSI6ImFwaUtleSIsImlhdCI6MTc5MjQwNTA1NiwianRpIjoiZjgxZjI0NGItZjkzYS00MjMwLThiNTMtYmIwYTgwZGY0ZTE0In0=.GwBv2N4ymXeU6bni3NgWaVkK0X7WsIyMECGRl7ZmFHiGH1Uo2t7uwBniTYFqIlWBX5ozRKRE3h49sHHDEGDPRIU1GkanzqzyfdIILio-z5mhKMC6FZya2A5nmUwAbePhFtk8YECytGyDJ0phmBI4-mxmTbeW2-mEDbvNpwt9G-mz-Pr_tblVtM1GD5ir47wA9Zzlqt_DqAgCrvbKHYdDCNECok8g1qHAn7zAXYwiq6y19NHRHgALGRr-ii5OoWaNt4nSPKDPTCpSQbMCyGdsiPtI_6Boz3zvbBCAFkLKe--XcT-eVWydx1VtdPE0_H_rPFj4Jhqy0XzGWbcAOm5D8A==";
  const BASE = "https://data.hub.api.metoffice.gov.uk";
  const COMPASS = ["N","NE","E","SE","S","SW","W","NW"];

  function locate(){
    return new Promise((res, rej) => {
      if(!navigator.geolocation) return rej(new Error("This phone can't share its location."));
      navigator.geolocation.getCurrentPosition(p => res(p.coords),
        e => rej(new Error(e.code===1 ? "Location permission was refused. Allow location for this app in the phone's settings, then try again."
                                      : "Couldn't get your location. Check location is turned on and try again.")),
        {enableHighAccuracy:true, timeout:20000, maximumAge:300000});
    });
  }
  async function getJSON(url, key){
    let r;
    try{ r = await fetch(url, {headers:{apikey:key, accept:"application/json"}}); }
    catch(e){
      const err = new Error(navigator.onLine ? "The Met Office service didn't accept the request from the app. Let the app administrator know: it needs a small relay." : "No signal. Try again when you have signal.");
      err.blocked = navigator.onLine; throw err;
    }
    if(!r.ok) throw new Error(r.status===401||r.status===403 ? "The Met Office key was refused." : r.status===429 ? "Today's Met Office allowance has been used up. Try again tomorrow." : "Met Office error " + r.status + ".");
    return r.json();
  }
  const n = v => (v===null||v===undefined||v==="") ? null : (isFinite(+v) ? +v : null);
  const when = v => typeof v==="number" ? new Date(v < 1e12 ? v*1000 : v) : new Date(v);
  const listOf = j => Array.isArray(j) ? j : (j && (j.data || j.observations || j.locations || (j.features && j.features.map(f=>f.properties)))) || [];
  const isRain = c => c!==null && (c===-1 || c>=9);

  async function landObs(lat, lon){
    const near = listOf(await getJSON(`${BASE}/observation-land/1/nearest?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`, OBS_KEY));
    const st = near[0]; if(!st || !st.geohash) throw new Error("No nearby Met Office station found.");
    const obs = listOf(await getJSON(`${BASE}/observation-land/1/${encodeURIComponent(st.geohash)}`, OBS_KEY))
      .map(o => ({t: when(o.datetime ?? o.time ?? o.date), mslp: n(o.mslp ?? o.pressure ?? o.msl_pressure), tend: o.pressure_tendency ?? o.pressureTendency ?? null,
                  code: n(o.weather_code ?? o.weatherCode), temp: n(o.temperature)}))
      .filter(o => !isNaN(o.t)).sort((a,b) => a.t-b.t);
    return {station: st.area || st.name || st.geohash, obs};
  }
  async function spot(lat, lon){
    const j = await getJSON(`${BASE}/sitespecific/v0/point/hourly?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&includeLocationName=true&excludeParameterMetadata=true`, SPOT_KEY);
    const f = j.features && j.features[0], p = f && f.properties;
    const ts = (p && p.timeSeries || []).map(x => ({...x, t: new Date(x.time)})).filter(x => !isNaN(x.t)).sort((a,b) => a.t-b.t);
    return {place: p && p.location && p.location.name, ts};
  }

  async function getWeatherSuggestion(){
    const c = await locate(), lat = c.latitude, lon = c.longitude, now = new Date();
    const [ob, sp] = await Promise.allSettled([landObs(lat, lon), spot(lat, lon)]);
    if(ob.status==="rejected" && sp.status==="rejected"){ throw ob.reason.blocked ? ob.reason : (sp.reason || ob.reason); }
    const O = ob.status==="fulfilled" ? ob.value : null, S = sp.status==="fulfilled" ? sp.value : null;
    const obs = O ? O.obs.filter(o => o.t <= now) : [], last = obs[obs.length-1] || null;
    const ts = S ? S.ts : [], past = ts.filter(x => x.t <= new Date(now.getTime()+30*60000));
    const cur = past[past.length-1] || ts[0] || null;

    const out = {fields:{}, lines:[], source:{at:now.toISOString(), lat:+lat.toFixed(3), lon:+lon.toFixed(3), station:O&&O.station||"", place:S&&S.place||""}};

    // Pressure trend: measured tendency at the nearest station, else change over about 3 hours.
    let trend = null, how = "", hpa = null;
    if(last){ hpa = last.mslp; const t = String(last.tend||"").toUpperCase().charAt(0); trend = {R:"Rising", F:"Falling", S:"Steady"}[t] || null; if(trend) how = `measured at ${O.station}`; }
    const change = (series, val) => { if(series.length<2) return null; const end = series[series.length-1], target = end.t - 3*3600000;
      const start = series.reduce((b,x) => Math.abs(x.t-target) < Math.abs(b.t-target) ? x : b, series[0]);
      const a = val(start), z = val(end); return (a===null||z===null||end.t-start.t < 2*3600000) ? null : z-a; };
    if(!trend){ const d = change(obs.filter(o=>o.mslp!==null), o=>o.mslp); if(d!==null){ trend = Math.abs(d)<1 ? "Steady" : d>0 ? "Rising" : "Falling"; how = `${d>0?"+":""}${d.toFixed(1)} mb in 3 hrs at ${O.station}`; } }
    if(!trend && S){ const d = change(past.filter(x=>n(x.mslp)!==null), x=>n(x.mslp)/100); if(d!==null){ trend = Math.abs(d)<1 ? "Steady" : d>0 ? "Rising" : "Falling"; how = `${d>0?"+":""}${d.toFixed(1)} mb in 3 hrs (forecast model)`; } }
    if(hpa===null && cur && n(cur.mslp)!==null) hpa = n(cur.mslp)/100;
    if(trend){ out.fields.pressureTrend = trend; out.lines.push(`Pressure: ${trend}${hpa?` (${Math.round(hpa)} mb)`:""}, ${how}`); }

    // Temperature
    const tc = cur && n(cur.screenTemperature)!==null ? n(cur.screenTemperature) : (last ? last.temp : null);
    if(tc!==null){ out.fields.airTemp = String(Math.round(tc*10)/10); out.fields.temp = tc<5 ? "Cold" : tc<12 ? "Cool" : tc<=20 ? "Warm" : "Hot"; out.lines.push(`Temperature: ${out.fields.temp} (${tc.toFixed(1)} °C)`); }

    // Sky from the weather code
    const code = cur && n(cur.significantWeatherCode)!==null ? n(cur.significantWeatherCode) : (last ? last.code : null);
    if(code!==null){ out.fields.sky = (code===0||code===1) ? "Sunny" : (code===2||code===3||code===7) ? "Cloudy" : "Overcast"; out.lines.push(`Sky: ${out.fields.sky}`); }

    // Wet / damp / dry from rain now and rain reported over the last 6 and 24 hours
    const since = h => obs.filter(o => o.t >= new Date(now - h*3600000));
    const rain6 = since(6).filter(o=>isRain(o.code)).length, rain24 = since(24).filter(o=>isRain(o.code)).length;
    const pastRain = ts.filter(x => x.t <= now && x.t >= new Date(now - 24*3600000)).reduce((s,x) => s + (n(x.totalPrecipAmount)||0), 0);
    const rainingNow = (cur && (n(cur.precipitationRate)||0) > 0.1) || isRain(code) || (last && isRain(last.code));
    if(obs.length || cur){
      out.fields.wet = (rainingNow || rain6>=2) ? "Wet" : (rain24>0 || pastRain>0.2) ? "Damp" : "Dry";
      out.lines.push(`Ground: ${out.fields.wet}${rainingNow?" (raining now)":""}`);
    }

    // Wind (forecast model, m/s to mph)
    const ws = cur && n(cur.windSpeed10m), wg = cur && n(cur.windGustSpeed10m), wd = cur && n(cur.windDirectionFrom10m);
    let windTxt = "";
    if(ws!==null){ const mph = ws*2.237; out.fields.wind = mph<4 ? "Calm" : mph<13 ? "Breezy" : mph<25 ? "Windy" : "Very windy";
      windTxt = `wind ${wd!==null?COMPASS[Math.round(wd/45)%8]+" ":""}${Math.round(mph)} mph${wg!==null?`, gusts ${Math.round(wg*2.237)} mph`:""}`;
      out.lines.push(`Wind: ${out.fields.wind} (${windTxt.replace(/^wind /,"")})`); }

    // Recent weather line
    const parts = [];
    if(O && obs.length) parts.push(rain24 ? `Rain reported in ${rain24} of the last 24 hrs at ${O.station}` : `No rain reported in the last 24 hrs at ${O.station}`);
    else if(pastRain>0.2) parts.push(`About ${Math.round(pastRain)} mm rain in recent hours`);
    if(windTxt) parts.push(windTxt);
    if(hpa) parts.push(`pressure ${Math.round(hpa)} mb${trend?" "+trend.toLowerCase():""}`);
    if(parts.length){ out.fields.recentWeather = parts.join("; ").replace(/^./, s=>s.toUpperCase()); }

    if(!O) out.lines.push("Nearest station data wasn't available; trend from the forecast model.");
    if(!Object.keys(out.fields).length) throw new Error("The Met Office returned no usable data for this location.");
    return out;
  }
  window.getWeatherSuggestion = getWeatherSuggestion;
})();
