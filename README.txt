GAS MONITORING FIELD SHEET - SETUP

What this is
A web page that works on Android and iPhone without any account. Readings are saved on the
phone as they are typed and stay there until exported. Nothing is sent anywhere else.

Hosting (one-off, done by one person)
Upload all files in this folder, unchanged and together, to any static web host that serves
over HTTPS. For example:
  - GitHub Pages (free): create a repository, upload the files, Settings > Pages > deploy from main.
  - Netlify, Cloudflare Pages, or your company website.
Only the person uploading needs an account with the host. Field staff just need the link.

Each field user, once, with signal
  1. Open the link.
  2. iPhone: Safari > Share > Add to Home Screen.
     Android: Chrome > menu > Add to Home screen / Install app.
  3. Always open it from the home screen icon. After that it opens without signal.

Important
  - Data lives on the phone that entered it, in that app/browser only.
  - Export at the end of each visit (Share or Download) and save to Egnyte or email.
  - Deleting the home screen app or clearing browser data deletes unexported visits.
  - On iPhone, the home screen app and Safari keep separate data: always use the icon.

Updating the tool
Upload new files over the old ones and change CACHE in sw.js (e.g. gasfield-v2).
Phones pick up the new version the next time it is opened with signal (then reopened).
