
  // Block common "save / view source / devtools" shortcuts (best-effort)
  document.addEventListener('keydown', function(e) {
    const key = (e.key || '').toLowerCase();

    // Ctrl/Cmd + S (Save)
    if ((e.ctrlKey || e.metaKey) && key === 's') {
      e.preventDefault();
      // optional feedback:
      // alert('Saving the page is disabled on this site.');
      return false;
    }

    // Ctrl/Cmd + U (View Source)
    if ((e.ctrlKey || e.metaKey) && key === 'u') {
      e.preventDefault();
      return false;
    }

    // Ctrl/Cmd + Shift + I  / F12  (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === 'i') {
      e.preventDefault();
      return false;
    }
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
  });

  // Optional: block right-click context menu (casual deterrent)
  document.addEventListener('contextmenu', function(e) {
    // comment out if you don't want to block right-click everywhere
    e.preventDefault();
    return false;
  });
