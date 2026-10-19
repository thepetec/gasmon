GAS MONITORING FIELD SHEET - VERSION 2 SETUP

FILES TO UPLOAD TO GITHUB (all together, same folder):
  index.html, sw.js, firebase.js, xlsx.full.min.js, jszip.min.js, ggt012.js, weather.js, GGT012.xltx,
  manifest.webmanifest,
  icon-192.png, icon-512.png, apple-touch-icon.png
Do NOT upload firestore.rules or this README (harmless if you do, but not needed).

FIREBASE RULES (publish again after this update)
Firebase console > Firestore Database > Rules: replace everything with the contents of
firestore.rules and Publish. These stop records ever being permanently deleted.
When moving to a company account, delete the line with the test gmail address, both here
and in EXTRA_ALLOWED_EMAILS near the top of the script in index.html.

FIRST USE ON EACH PHONE (needs signal)
  1. Open https://thepetec.github.io/gasmon/ and add it to the home screen.
  2. Create an account with a work email, then confirm it from the email link.
  3. After that, sign-in is remembered and the app works without signal.

HOW SYNC WORKS
Everything is saved on the phone first, then synced when there is signal. The top bar
shows "Synced", "Syncing..." or "On phone - will sync". Other phones see changes once
both have had signal.

RELEASING AN UPDATE
Change APP_VERSION near the top of the script in index.html and CACHE in sw.js to the same
new number, then upload both.

UPDATING THE GGT012 TEMPLATE
If the return visits template is revised, save it as GGT012.xltx (same name), upload it
over the old one and bump the version numbers as above. The new template must keep the
same layout: tabs Hole 1-10, visit rows 9-14 in columns C-Q, instruments in E15,
remarks in E16/E17.

SHARED WITH OTHER GEOSPHERE TOOLS (from version 2.8)
Projects (number, letter codes, site name) are shared by all field tools that use this Firebase
project, e.g. the planned DRITs tool. Each tool keeps its own records (visits, dritTests) and its
own "completed" flag (gasCompleted for this tool). Any tool hosted under thepetec.github.io
shares the same sign-in automatically. Use a different cache name prefix and storage key prefix
in each tool (this one uses "gasfield-" and "gasfield.").
