const checkboxIds = ['homescreen','comments','shorts','toolbar','next','playlist','hideNextButton'];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize checkboxes from storage
  browser.storage.sync.get(checkboxIds).then(settings => {
    checkboxIds.forEach(id => {
      document.getElementById(id).checked = settings[id] ?? false;
    });
  });

  // Save on change
  checkboxIds.forEach(id => {
    const cb = document.getElementById(id);
    cb.addEventListener('change', () => {
      const obj = { [id]: cb.checked };
      browser.storage.sync.set(obj).then(() => {
        const success = document.getElementById('success');
        success.textContent = 'Saved!';
        success.style.opacity = 1;
        setTimeout(() => (success.style.opacity = 0), 1000);
      });
    });
  });
});
