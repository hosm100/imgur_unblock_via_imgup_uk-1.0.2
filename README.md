# Imgur Unblock Firefox Extension

**Imgur Unblock - Access Imgur in the UK**

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

### Test the extension:

1. Load extension in Chrome
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

## 📜 License

Free to use and modify. No warranty provided.

The proxy service (imgup.uk) is provided as-is and may be 
discontinued at any time.

---

**Built with ❤️ to bypass unnecessary censorship**

