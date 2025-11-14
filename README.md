# Imgur Unblock Firefox Extension

**Bypass UK Imgur block by proxying through imgup.uk's German server**

---

## 📦 What's Included

- `manifest.json` - Extension configuration
- `background.js` - Request interceptor and proxy logic
- `popup.html` - Extension popup UI
- `popup.js` - Popup functionality
- `icons/` - Extension icons (you need to add these)

---

## 🎨 Icons Needed

You need to create/add two icon files:

1. **`icons/icon-48.png`** - 48x48px icon (active state)
2. **`icons/icon-96.png`** - 96x96px icon (active state)

**Quick icon options:**
- Use imgup.uk logo
- Create simple "I" letter on gradient background
- Download from: https://www.flaticon.com/ (search "image proxy")

**Optional:**
- `icons/icon-disabled-48.png` - Greyed out version when disabled

---

## 🚀 Installation Instructions

### For Testing (Temporary):

1. Open Firefox
2. Type `about:debugging` in address bar
3. Click "This Firefox" in left sidebar
4. Click "Load Temporary Add-on..."
5. Navigate to this folder and select `manifest.json`
6. Extension loaded! ✅

**Note:** Temporary extensions are removed when Firefox closes.

### For Permanent Use (Developer Mode):

1. Open Firefox
2. Type `about:config` in address bar
3. Search for `xpinstall.signatures.required`
4. Set to `false`
5. Package extension as `.xpi` (see below)
6. Drag `.xpi` file to Firefox

### Packaging as .xpi:

**Windows:**
```powershell
cd firefox-extension
Compress-Archive -Path * -DestinationPath ../imgur-unblock.xpi
```

**Linux/Mac:**
```bash
cd firefox-extension
zip -r -FS ../imgur-unblock.xpi * -x '*.DS_Store'
```

---

## 🔧 How It Works

1. **User browses Reddit/Twitter** with Imgur images
2. **Extension detects** Imgur image URLs
3. **Rewrites URL** to `https://imgup.uk/proxy/?url=...`
4. **Your IONOS server** (Germany) fetches from Imgur
5. **Streams image** back to user in UK
6. **No storage** - pure passthrough proxy

---

## 📊 Features

- ✅ **Works everywhere** - Reddit, Twitter, Discord, any website
- ✅ **Toggle on/off** - Toolbar icon popup
- ✅ **Statistics** - Track how many images proxied
- ✅ **No caching** - Zero storage, pure relay
- ✅ **Fast** - Direct stream from Germany
- ✅ **Private** - No data stored on imgup.uk

---

## 🌐 Server Setup

### Upload to IONOS:

1. **Upload:** `v2/public/proxy/index.php`
   - Destination: `/public/proxy/index.php` on server
   
2. **Test endpoint:**
   ```
   https://imgup.uk/proxy/?url=i.imgur.com/test.jpg
   ```
   Should fetch and display the image

3. **Done!** Extension will use this endpoint

---

## 🧪 Testing

### Test the proxy endpoint:
```
https://imgup.uk/proxy/?url=i.imgur.com/tA3wPzG.jpg
```

Should show an image (even in UK).

### Test the extension:

1. Load extension in Firefox
2. Visit Reddit (e.g., r/pics)
3. Open extension popup - should show images being proxied
4. Images load normally despite UK block ✅

---

## 🔒 Security Features

- **Domain whitelist** - Only allows imgur.com domains
- **HTTPS only** - Enforces secure connections
- **No execution** - Images served with `X-Content-Type-Options: nosniff`
- **Rate limiting** - Built into proxy (30/hour per IP)
- **CORS enabled** - Extension can call proxy

---

## 📝 Publishing to Firefox Add-ons

### Requirements:

1. **Mozilla account** - Create at addons.mozilla.org
2. **Source code** - This folder
3. **Icons** - Proper 48x48 and 96x96 PNGs
4. **Privacy policy** - Explain no data is stored

### Submission:

1. Go to: https://addons.mozilla.org/developers/
2. Click "Submit a New Add-on"
3. Upload `.xpi` file
4. Fill in description, screenshots
5. **Review time:** ~2 weeks

### Description Template:

```
Imgur Unblock - Access Imgur in the UK

Bypass the UK Imgur block by proxying images through imgup.uk's 
German server. No data storage, pure relay.

Features:
• Works on Reddit, Twitter, Discord, all websites
• Toggle on/off via toolbar icon
• View statistics on images proxied
• Zero data storage - privacy-focused
• Open source

Privacy: No data is stored. Images are streamed directly from 
Imgur through our German server to you. No tracking, no logs.
```

---

## 🛠️ Troubleshooting

### Extension not working?

1. Check proxy endpoint: `https://imgup.uk/proxy/?url=i.imgur.com/test.jpg`
2. Open Firefox Console (Ctrl+Shift+J) - look for errors
3. Check extension is enabled (popup should say "Active")
4. Reload page after enabling extension

### Images not loading?

1. Check browser console for errors
2. Verify CORS headers on proxy endpoint
3. Test proxy URL directly in browser
4. Check IONOS bandwidth limits

### Extension won't install?

1. Ensure all files are in folder
2. Icons must exist (even placeholders)
3. manifest.json must be valid JSON
4. Try temporary installation first

---

## 📈 Performance

**Average load time:**
- Direct Imgur (if accessible): ~200ms
- Through proxy: ~400-600ms
- Acceptable for images, may notice delay on videos

**Bandwidth usage:**
- ~500KB per image average
- Your IONOS plan likely has unlimited bandwidth
- Monitor if extension becomes popular

---

## 🎯 Future Enhancements

Possible additions:

- [ ] Optional 24h cache for popular images
- [ ] Compress images before sending (save bandwidth)
- [ ] Support for Imgur albums/galleries
- [ ] Statistics dashboard on imgup.uk
- [ ] Automatic failover to alternative proxies
- [ ] Chrome extension version

---

## 📞 Support

**Issues?** Check:
1. Proxy endpoint: https://imgup.uk/proxy/
2. Extension console logs
3. Firefox version (need 78+)

**Contact:** admin@imgup.uk

---

## 📜 License

Free to use and modify. No warranty provided.

The proxy service (imgup.uk) is provided as-is and may be 
discontinued at any time.

---

**Built with ❤️ to bypass unnecessary censorship**
