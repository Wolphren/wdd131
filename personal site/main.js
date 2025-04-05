import { projectsData } from './projects.js';
import { ProjectManager } from './projectsManager.js';
import { ThemeManager } from './themeManager.js';
import { ModalManager } from './modalManager.js';
import { FormHandler } from './formHandler.js';

class App {
    constructor() {
        this.initPage();
    }
    
    initPage() {
        const currentPage = this.getCurrentPage();
        
        new ThemeManager();
        new ModalManager();
        
        switch (currentPage) {
            case 'projects':
                new ProjectManager(projectsData);
                break;
            case 'contact-me':
                new FormHandler();
                break;
            case 'resume':
                this.initResume();
                break;
            case 'index':
            default:
                this.initHome();
                break;
        }
        
        this.updateCopyright();
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('projects.html')) return 'projects';
        if (path.includes('contact-me.html')) return 'contact-me';
        if (path.includes('resume.html')) return 'resume';
        return 'index';
    }
    
    updateCopyright() {
        const copyrightElement = document.getElementById('copyright');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = `Copyright ${currentYear}`;
        }
    }
    
    initHome() {
        console.log('Home page initialized');
    }
    
    initResume() {
        console.log('Resume page initialized');
        this.enhanceSkillsList();
    }
    
    enhanceSkillsList() {
        const skillsList = document.querySelector('.skills-2 ul');
        if (!skillsList) return;
        
        const skillLevels = {
            'Python': 85,
            'JavaScript': 75,
            'HTML': 90,
            'CSS': 80,
            'R': 60,
            'Japanese (Limited Working)': 50,
            'Painting': 70,
            'Roofing': 65,
            'Plumbing': 60,
            'Educational Leadership': 80,
            'Building Maintenance': 75,
            'Infrastructure Development': 70,
            'Report Writing Abilities': 85
        };
        
        const style = document.createElement('style');
        style.textContent = `
            .skill-item {
                margin-bottom: 15px;
            }
            
            .skill-name {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            
            .skill-bar {
                height: 10px;
                background-color: #ddd;
                border-radius: 5px;
                overflow: hidden;
            }
            
            .skill-level {
                height: 100%;
                background-color: var(--secondary-color);
                border-radius: 5px;
                transition: width 1s ease-in-out;
            }
        `;
        document.head.appendChild(style);
        
        const skills = Array.from(skillsList.querySelectorAll('li'));
        
        skillsList.innerHTML = '';
        
        skills.forEach(skill => {
            const skillName = skill.textContent;
            const level = skillLevels[skillName] || 50;
            
            const skillItem = document.createElement('li');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-name">
                    <span>${skillName}</span>
                    <span>${level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-level" style="width: 0%"></div>
                </div>
            `;
            
            skillsList.appendChild(skillItem);
            
            setTimeout(() => {
                const skillLevel = skillItem.querySelector('.skill-level');
                skillLevel.style.width = `${level}%`;
            }, 300);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});