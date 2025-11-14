/**
 * Content Script - Automatically proxies all Imgur images on web pages
 */

// Track which images we've already processed
const processedImages = new WeakSet();
let extensionEnabled = true;

// Get initial enabled state
chrome.storage.local.get(["enabled"], (result) => {
  extensionEnabled = result.enabled !== undefined ? result.enabled : true;
  if (extensionEnabled) {
    init();
  }
});

// Listen for state changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.enabled) {
    extensionEnabled = changes.enabled.newValue;
    console.log(
      "[Imgur Unblock] Extension",
      extensionEnabled ? "enabled" : "disabled"
    );

    if (extensionEnabled) {
      scanForImgurImages();
      processBackgroundImages();
    }
  }
});

/**
 * Check if an image is from Imgur
 */
function isImgurImage(src) {
  if (!src) return false;
  return src.includes("i.imgur.com") && !src.includes("imgup.uk/proxy");
}

/**
 * Convert Imgur URL to proxy URL
 */
function getProxyUrl(imgurUrl) {
  let cleanUrl = imgurUrl.trim();

  // Ensure protocol
  if (
    !cleanUrl.startsWith("http://") &&
    !cleanUrl.startsWith("https://")
  ) {
    cleanUrl = "https://" + cleanUrl;
  }

  return `https://imgup.uk/proxy/?url=${encodeURIComponent(cleanUrl)}`;
}

/**
 * Process an image element
 */
function processImage(img) {
  if (!extensionEnabled) return;

  if (processedImages.has(img)) return;

  const originalSrc = img.src;
  if (!isImgurImage(originalSrc)) return;

  processedImages.add(img);

  const proxyUrl = getProxyUrl(originalSrc);
  img.src = proxyUrl;

  if (img.srcset) {
    img.srcset = img.srcset
      .split(",")
      .map((part) => {
        const [url, descriptor] = part.trim().split(/\s+/);
        if (isImgurImage(url)) {
          return `${getProxyUrl(url)} ${descriptor || ""}`.trim();
        }
        return part;
      })
      .join(", ");
  }

  console.log(
    "[Imgur Unblock] Proxied:",
    originalSrc,
    "→",
    proxyUrl
  );
}

/**
 * Scan visible images
 */
function scanForImgurImages() {
  if (!extensionEnabled) return;
  document.querySelectorAll("img").forEach(processImage);
}

/**
 * Scan CSS background images
 */
function processBackgroundImages() {
  if (!extensionEnabled) return;

  const elements = document.querySelectorAll("*");
  elements.forEach((el) => {
    const style = window.getComputedStyle(el);
    const bgImage = style.backgroundImage;

    if (bgImage && bgImage !== "none") {
      const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
      if (match && isImgurImage(match[1])) {
        const proxyUrl = getProxyUrl(match[1]);
        el.style.backgroundImage = `url("${proxyUrl}")`;
        console.log(
          "[Imgur Unblock] Background proxied:",
          match[1],
          "→",
          proxyUrl
        );
      }
    }
  });
}

/**
 * Initialize
 */
function init() {
  setTimeout(() => {
    scanForImgurImages();
    processBackgroundImages();
  }, 100);

  const observer = new MutationObserver((mutations) => {
    if (!extensionEnabled) return;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.tagName === "IMG") {
            processImage(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll("img").forEach(processImage);
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log(
    "[Imgur Unblock] Content script active - auto-proxying Imgur images"
  );
}
