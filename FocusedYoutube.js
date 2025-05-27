// FocusedYoutube.js

// A map from option key → CSS snippet
const OPTIONAL_RULES = {
  comments: `#comments { display: none !important; }`,
  homescreen: `
    ytd-rich-grid-renderer,
    ytd-browse[page-subtype="home"] #contents {
      display: none !important;
    }
  `,
  shorts: `
    ytd-reel-shelf-renderer,
	ytd-rich-shelf-renderer[is-shorts],
    ytd-shelf-renderer[is-shorts] {
      display: none !important;
    }
  `,
  toolbar: `
    #guide-button,
    tp-yt-app-drawer,
    ytd-topbar-logo-renderer,
    ytd-notification-topbar-button-renderer {
      display: none !important;
    }
  `,
  next: `
    .ytp-next-button {
      display: block !important;
    }
  `,
  playlist: `
    .ytp-playlist-menu-button {
      display: block !important;
    }
  `,
  hideNextButton: `
    .ytp-next-button {
      display: none !important;
    }
  `
};

// Inject or update the dynamic style tag
function applyDynamicCSS(cssText) {
  let tag = document.getElementById('fy-dynamic-css');
  if (!tag) {
    tag = document.createElement('style');
    tag.id = 'fy-dynamic-css';
    document.head.appendChild(tag);
  }
  tag.textContent = cssText;
}

// Read all stored settings, build up the CSS, and apply it
browser.storage.sync.get().then(settings => {
  const rules = Object.entries(settings)
    .filter(([key, enabled]) => enabled && OPTIONAL_RULES[key])
    .map(([key]) => OPTIONAL_RULES[key])
    .join('\n');
  applyDynamicCSS(rules);
});

// Re-apply whenever storage changes (e.g. user flipped a checkbox)
browser.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') return;
  browser.storage.sync.get().then(settings => {
    const rules = Object.entries(settings)
      .filter(([key, enabled]) => enabled && OPTIONAL_RULES[key])
      .map(([key]) => OPTIONAL_RULES[key])
      .join('\n');
    applyDynamicCSS(rules);
  });
});
