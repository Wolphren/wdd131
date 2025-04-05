class ThemeManager {
    constructor() {
        this.darkMode = localStorage.getItem('darkMode') === 'enabled';
        this.themeColors = {
            light: {
                primaryColor: '#2e1a08',
                secondaryColor: '#14d300',
                accent1Color: '#8a4111',
                accent2Color: 'white',
                textColor: 'white',
                backgroundColor: '#8a4111'
            },
            dark: {
                primaryColor: '#121212',
                secondaryColor: '#1DB954',
                accent1Color: '#333333',
                accent2Color: '#e0e0e0',
                textColor: '#e0e0e0',
                backgroundColor: '#1e1e1e'
            }
        };
        
        this.createToggleButton();
        this.initializeTheme();
    }
    
    createToggleButton() {
        if (document.getElementById('theme-toggle')) return;
        
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.textContent = this.darkMode ? 'Light Mode' : 'Dark Mode';
        themeToggle.classList.add('theme-toggle-btn');
        
        header.insertBefore(themeToggle, nav);
        
        themeToggle.addEventListener('click', () => this.toggleTheme());
        
        if (!document.getElementById('theme-toggle-styles')) {
            const style = document.createElement('style');
            style.id = 'theme-toggle-styles';
            style.textContent = `
                .theme-toggle-btn {
                    padding: 8px 12px;
                    background-color: transparent;
                    color: white;
                    border: 2px solid white;
                    border-radius: 20px;
                    cursor: pointer;
                    font-family: var(--paragraph-font);
                    font-size: 16px;
                    transition: all 0.3s ease;
                    justify-self: end;
                    margin-right: 20px;
                }
                
                .theme-toggle-btn:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
                
                @media screen and (max-width: 900px) {
                    .theme-toggle-btn {
                        margin: 10px auto;
                        grid-column: 1 / 3;
                    }
                }
            `;
            
            document.head.appendChild(style);
        }
    }
    
    initializeTheme() {
        if (this.darkMode) {
            this.enableDarkMode();
        }
    }
    
    toggleTheme() {
        if (this.darkMode) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }
    
    enableDarkMode() {
        this.updateThemeColors(this.themeColors.dark);
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        this.darkMode = true;
        document.getElementById('theme-toggle').textContent = 'Light Mode';
    }
    
    disableDarkMode() {
        this.updateThemeColors(this.themeColors.light);
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
        this.darkMode = false;
        document.getElementById('theme-toggle').textContent = 'Dark Mode';
    }
    
    updateThemeColors(colors) {
        document.documentElement.style.setProperty('--primary-color', colors.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', colors.secondaryColor);
        document.documentElement.style.setProperty('--accent1-color', colors.accent1Color);
        document.documentElement.style.setProperty('--accent2-color', colors.accent2Color);
        
        document.body.style.backgroundColor = colors.backgroundColor;
        document.body.style.color = colors.textColor;
        
        const style = document.createElement('style');
        style.textContent = `
            body, header, footer, div {
                transition: background-color 0.3s ease, color 0.3s ease;
            }
            
            .dark-mode .projects,
            .dark-mode .project-box, 
            .dark-mode [class^="project-box-"],
            .dark-mode .professional-summary,
            .dark-mode .skills,
            .dark-mode .skills-2,
            .dark-mode .education,
            .dark-mode .computing-team,
            .dark-mode .professional-experience,
            .dark-mode .personal-experience,
            .dark-mode .intro {
                background-color: var(--accent1-color);
                border-color: var(--accent2-color);
            }
            
            .dark-mode header,
            .dark-mode footer,
            .dark-mode nav a:hover {
                background-color: var(--primary-color);
            }
        `;
        
        const existingStyle = document.getElementById('theme-transition-style');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.id = 'theme-transition-style';
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

export { ThemeManager };