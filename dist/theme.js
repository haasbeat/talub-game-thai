// Theme Manager (Light / Dark mode) with persistence & auto-detect
(function() {
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function setupToggle() {
    const btn = document.querySelector('#theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('talub_theme', next);
      } catch (e) {
        // LocalStorage might fail in private browsing mode
      }
    });
  }

  // Listen to system preference changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        try {
          if (!localStorage.getItem('talub_theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      });
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggle);
  } else {
    setupToggle();
  }
})();
