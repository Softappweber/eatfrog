/* === FROG FIRST - MAIN APPLICATION LOGIC === */
/* Handles: Local Storage, Theme Toggle, Chapter Completion */

// Wait for the DOM to fully load before running any script
document.addEventListener('DOMContentLoaded', function() {

    // === 1. THEME TOGGLE (Light/Dark Mode) ===
    const themeToggle = document.getElementById('themeToggle');
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('frogTheme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('frogTheme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // === 2. AUTO-SAVE TEXTAREA CONTENT TO LOCAL STORAGE ===
    // This loops through all textareas on the page and saves their content
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(function(textarea) {
        const textareaId = textarea.id;
        
        // If we already have saved content, load it into the textarea
        const savedContent = localStorage.getItem('frog_' + textareaId);
        if (savedContent !== null) {
            textarea.value = savedContent;
        }
        
        // Save the content whenever the user types
        textarea.addEventListener('input', function() {
            localStorage.setItem('frog_' + textareaId, textarea.value);
        });
    });

    // === 3. MARK CHAPTER AS COMPLETE ===
    // This looks for any button with the class 'btn-complete'
    const completeButtons = document.querySelectorAll('.btn-complete');
    
    completeButtons.forEach(function(button) {
        const buttonId = button.id;
        
        // Check if this chapter is already marked complete
        const isComplete = localStorage.getItem('frog_' + buttonId);
        if (isComplete === 'true') {
            button.textContent = '✓ Chapter Completed';
            button.classList.add('completed');
        }
        
        button.addEventListener('click', function() {
            // Toggle the completed state
            const currentlyComplete = localStorage.getItem('frog_' + buttonId) === 'true';
            
            if (currentlyComplete) {
                // Unmark it
                localStorage.setItem('frog_' + buttonId, 'false');
                button.textContent = 'Mark Chapter as Complete';
                button.classList.remove('completed');
            } else {
                // Mark it complete
                localStorage.setItem('frog_' + buttonId, 'true');
                button.textContent = '✓ Chapter Completed';
                button.classList.add('completed');
            }
        });
    });

});
