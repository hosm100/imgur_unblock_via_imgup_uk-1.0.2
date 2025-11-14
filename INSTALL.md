# 🚀 Quick Start Guide - Imgur Unblock Extension

**Get Imgur working in the UK in 5 minutes!**

---

## Step 1️⃣: Upload PHP Proxy to IONOS

### File to Upload:
- **Local:** `v2/public/proxy/index.php`
- **Server:** Upload to `/public/proxy/index.php`

### Via IONOS File Manager:
1. Login to IONOS hosting
2. Navigate to `/public/`
3. Create folder: `proxy`
4. Upload `index.php` into that folder

### Test it works:
Open in browser: `https://imgup.uk/proxy/?url=i.imgur.com/tA3wPzG.jpg`

**Should show:** An image (even in UK!)
**If error:** Check file uploaded to correct location

---

## Step 2️⃣: Add Icons to Extension

You need 2 icon files in `firefox-extension/icons/`:

### Option A: Use Existing Icons (Fastest)
Copy your imgup.uk logo and resize to:
- `icon-48.png` (48x48 pixels)
- `icon-96.png` (96x96 pixels)

### Option B: Create Simple Icons
Use any image editor (Paint, Photoshop, GIMP):
1. Create 48x48 canvas
2. Add gradient background (teal/orange)
3. Add "I" letter in white
4. Save as `icon-48.png`
5. Repeat at 96x96 for `icon-96.png`

### Option C: Download Free Icons
1. Visit: https://www.flaticon.com/
2. Search: "image icon" or "photo"
3. Download 48x48 and 96x96 PNG
4. Rename to `icon-48.png` and `icon-96.png`

### Option D: Use Placeholder (Testing Only)
Any 48x48 and 96x96 PNG will work for testing!
Just rename them correctly.

---

## Step 3️⃣: Load Extension in Firefox

### Temporary Installation (For Testing):

1. Open Firefox
2. Type in address bar: `about:debugging`
3. Click "This Firefox" in left sidebar
4. Click "Load Temporary Add-on..."
5. Navigate to `v2/firefox-extension/` folder
6. Select `manifest.json` file
7. Click "Open"

**✅ Extension loaded!**

**Note:** This is removed when Firefox closes.

---

## Step 4️⃣: Test It Works

1. **Open extension popup:**
   - Click extension icon in toolbar
   - Should show "Active" status

2. **Visit Reddit:**
   - Go to https://reddit.com/r/pics
   - Imgur images should load normally

3. **Check stats:**
   - Open extension popup
   - "Images proxied" should increase

**🎉 Success! Imgur works in UK!**

---

## Step 5️⃣ (Optional): Permanent Installation

### Package as .xpi:

**Windows PowerShell:**
```powershell
cd v2/firefox-extension
Compress-Archive -Path * -DestinationPath ../imgur-unblock.xpi
```

**Mac/Linux:**
```bash
cd v2/firefox-extension
zip -r -FS ../imgur-unblock.xpi * -x '*.DS_Store'
```

### Install .xpi:

**Option A: Developer Mode**
1. Open Firefox
2. Type: `about:config`
3. Search: `xpinstall.signatures.required`
4. Set to: `false`
5. Drag `imgur-unblock.xpi` to Firefox
6. Click "Add"

**Option B: Firefox Add-ons (Official)**
1. Create account at https://addons.mozilla.org
2. Submit extension for review
3. Wait ~2 weeks for approval
4. Users can install from store

---

## 🧪 Troubleshooting

### "Extension won't load"
- ✅ Check icons exist in `icons/` folder
- ✅ Verify `manifest.json` is valid
- ✅ Try loading from `about:debugging` first

### "Images not loading"
- ✅ Test proxy: `https://imgup.uk/proxy/?url=i.imgur.com/test.jpg`
- ✅ Check extension is "Active" in popup
- ✅ Refresh page after enabling extension
- ✅ Open Firefox Console (F12) for errors

### "Proxy not working"
- ✅ Verify PHP file uploaded to `/public/proxy/index.php`
- ✅ Check folder permissions (755)
- ✅ Test URL directly in browser

---

## 📊 What You Should See

### Extension Popup:
```
🖼️ Imgur Unblock
Proxy via imgup.uk

🟢 Active
📊 Images proxied: 42
🌍 Server: Germany (IONOS)

[✓ Enabled - Click to Disable]
[Reset Stats]

Visit imgup.uk
```

### Browser Console (F12):
```
[Imgur Unblock] Extension loaded and ready!
[Imgur Unblock] Proxying: https://i.imgur.com/abc.jpg → https://imgup.uk/proxy/?url=...
```

---

## 🎯 Usage Tips

- **Toggle on/off** via toolbar icon
- **Works everywhere** - Reddit, Twitter, Discord, etc.
- **Zero config** - Just install and forget
- **Privacy-focused** - No data stored
- **Check stats** - See how many images proxied

---

## 📞 Need Help?

**Test URLs:**
- Proxy endpoint: https://imgup.uk/proxy/?url=i.imgur.com/tA3wPzG.jpg
- Extension debugging: about:debugging

**Common issues:**
1. Icons missing → Add placeholder PNGs
2. Proxy 404 → Upload PHP to correct folder
3. Extension disabled → Click toggle in popup

---

**That's it! Enjoy unrestricted Imgur access! 🎉**
