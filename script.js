document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    // 1. Check for saved user preference in local storage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Apply the saved theme immediately
        rootElement.setAttribute('data-theme', savedTheme);
    } else {
        // 2. If no saved theme, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            rootElement.setAttribute('data-theme', 'dark');
        }
    }

    // 3. Handle toggle button click
    themeToggleBtn.addEventListener('click', () => {
        // Determine the current theme
        let currentTheme = rootElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply the new theme
        rootElement.setAttribute('data-theme', newTheme);
        
        // Save the new preference to local storage
        localStorage.setItem('theme', newTheme);
    });

    // 4. Listen for system theme changes and apply them IF the user hasn't set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            rootElement.setAttribute('data-theme', newTheme);
        }
    });
});
