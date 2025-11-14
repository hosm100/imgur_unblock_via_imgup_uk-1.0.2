/**
 * Imgur Unblock Extension - Background Script (MV3)
 * Handles state, icon updates, and popup communication.
 * Redirect logic is now handled via declarativeNetRequest rules.
 */

const PROXY_URL = "https://imgup.uk/proxy/";

// State
let extensionEnabled = true;
let statsProxied = 0;

// Load state at startup
chrome.storage.local.get(["enabled", "statsProxied"], (result) => {
  if (result.enabled !== undefined) {
    extensionEnabled = result.enabled;
  }
  if (result.statsProxied !== undefined) {
    statsProxied = result.statsProxied;
  }
  updateIcon();
});

/**
 * Update extension icon based on enabled state
 */
function updateIcon() {
  const iconPath = extensionEnabled
    ? "icons/icon-48.png"
    : "icons/icon-disabled-48.png";

  chrome.action.setIcon({ path: iconPath });
  chrome.action.setTitle({
    title: extensionEnabled
      ? "Imgur Unblock (Active)"
      : "Imgur Unblock (Disabled)",
  });
}

/**
 * Enable/disable redirect rules
 */
function updateRules() {
  const ENABLED_RULE_ID = 1;

  if (extensionEnabled) {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ["imgur_redirect"]
    });
  } else {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ["imgur_redirect"]
    });
  }
}

/**
 * Listen for messages from popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggle") {
    extensionEnabled = !extensionEnabled;
    chrome.storage.local.set({ enabled: extensionEnabled });
    updateIcon();
    updateRules();
    sendResponse({ enabled: extensionEnabled });

  } else if (message.action === "getStats") {
    sendResponse({
      enabled: extensionEnabled,
      proxied: statsProxied,
    });

  } else if (message.action === "resetStats") {
    statsProxied = 0;
    chrome.storage.local.set({ statsProxied: 0 });
    sendResponse({ proxied: 0 });
  }

  return true;
});

/**
 * Listen for DNR redirect events so we can count proxied requests
 */
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  if (info.rule.ruleId === 1 && extensionEnabled) {
    statsProxied++;
    chrome.storage.local.set({ statsProxied: statsProxied });
  }
});

console.log("[Imgur Unblock] MV3 background service worker loaded.");
