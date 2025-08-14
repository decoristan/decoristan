/* security.js - Basic Frontend Security Enhancements */

// 1. Clickjacking Protection (break out of iframes)
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

// 2. Disable Right Click & Certain Keys (basic deterrent)
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+J
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // I or J
        (e.ctrlKey && e.keyCode === 85) // U
    ) {
        e.preventDefault();
    }
});

// 3. Simple Input Sanitization Function (for forms, XSS prevention)
window.sanitizeInput = function(input) {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
};

// 4. Warn user if site is loaded over HTTP (mixed content warning)

// 5. Block embedding of external scripts dynamically (extra CSP-like layer)
(function() {
    const allowedDomains = [location.hostname];
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const el = originalCreateElement.call(document, tagName);
        if (tagName.toLowerCase() === 'script') {
            el.addEventListener('beforescriptexecute', function(e) {
                const src = el.src || '';
                const valid = allowedDomains.some(domain => src.includes(domain));
                if (src && !valid) {
                    console.error(`Blocked unauthorized script: ${src}`);
                    e.preventDefault();
                }
            });
        }
        return el;
    };
})();

console.log("✅ Security.js loaded - Frontend protections enabled.");
