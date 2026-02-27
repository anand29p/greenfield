/**
 * Theme Switcher — Greenfield International Academy
 * Dynamically swaps the theme stylesheet and persists selection in localStorage.
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'gia-theme';
    const DEFAULT_THEME = 'progressive';
    const THEMES = [
        'prestige', 'minimal', 'progressive', 'tech',
        'sunrise', 'ocean', 'royal', 'forest', 'crimson', 'midnight'
    ];

    /**
     * Determine the base path for CSS assets relative to the current page.
     * Root pages use "assets/css/", sub-directory pages use "../assets/css/".
     */
    function getBasePath() {
        // Check if we are inside a subdirectory by looking at the page path
        const depth = window.location.pathname.replace(/\/+$/, '').split('/').length - 1;
        // If page is index.html at root or root itself, depth is 0 or 1
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        // If the last path segment is a directory page (like /about/ or /about/index.html)
        const htmlFile = pathSegments[pathSegments.length - 1];
        const isInSubdir = pathSegments.length > 1 &&
            (htmlFile === 'index.html' || !htmlFile.includes('.'));

        // Find the existing base.css link to infer the correct path
        const baseLink = document.querySelector('link[href*="base.css"]');
        if (baseLink) {
            return baseLink.getAttribute('href').replace('base.css', '');
        }
        return isInSubdir ? '../assets/css/' : 'assets/css/';
    }

    /**
     * Apply a theme by updating the theme stylesheet <link> href.
     */
    function applyTheme(themeName) {
        if (!THEMES.includes(themeName)) themeName = DEFAULT_THEME;

        const link = document.getElementById('themeStylesheet');
        if (!link) return;

        const basePath = getBasePath();
        const newHref = basePath + 'theme-' + themeName + '.css';

        if (link.getAttribute('href') !== newHref) {
            link.setAttribute('href', newHref);
        }

        // Update the dropdown if present
        const select = document.getElementById('themeSwitcher');
        if (select && select.value !== themeName) {
            select.value = themeName;
        }

        // Persist
        try { localStorage.setItem(STORAGE_KEY, themeName); } catch (e) { /* no-op */ }
    }

    /**
     * Load the saved theme from localStorage or fall back to default.
     */
    function loadSavedTheme() {
        let saved = DEFAULT_THEME;
        try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; } catch (e) { /* no-op */ }
        applyTheme(saved);
    }

    /**
     * Bind the <select> change event.
     */
    function bindSwitcher() {
        const select = document.getElementById('themeSwitcher');
        if (!select) return;
        select.addEventListener('change', function () {
            applyTheme(this.value);
        });
    }

    // Initialise on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            loadSavedTheme();
            bindSwitcher();
        });
    } else {
        loadSavedTheme();
        bindSwitcher();
    }
})();
