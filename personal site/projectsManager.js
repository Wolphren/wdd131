import { projectsData } from './projects.js';

class ProjectManager {
    constructor(data) {
        this.allProjects = data;
        this.filteredProjects = [...data];
        this.container = document.querySelector('.gridbox');
        this.categories = [...new Set(data.map(project => project.category))];
        this.statuses = [...new Set(data.map(project => project.status))];
        
        this.setupFilterControls();
        this.setupSortControls();
        this.renderProjects();
    }

    setupFilterControls() {
        const filtersDiv = document.createElement('div');
        filtersDiv.className = 'project-filters';
        
        const categoryFilter = document.createElement('select');
        categoryFilter.id = 'category-filter';
        categoryFilter.innerHTML = `
            <option value="all">All Categories</option>
            ${this.categories.map(category => 
                `<option value="${category}">${category}</option>`
            ).join('')}
        `;
        
        const statusFilter = document.createElement('select');
        statusFilter.id = 'status-filter';
        statusFilter.innerHTML = `
            <option value="all">All Statuses</option>
            ${this.statuses.map(status => 
                `<option value="${status}">${status}</option>`
            ).join('')}
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-projects';
        searchInput.placeholder = 'Search projects...';
        
        filtersDiv.innerHTML = `
            <label for="category-filter">Category:</label>
            <label for="status-filter">Status:</label>
            <label for="search-projects">Search:</label>
        `;
        
        filtersDiv.insertBefore(categoryFilter, filtersDiv.children[1]);
        filtersDiv.insertBefore(statusFilter, filtersDiv.children[3]);
        filtersDiv.insertBefore(searchInput, filtersDiv.children[5]);
        
        this.container.parentNode.insertBefore(filtersDiv, this.container);
        
        categoryFilter.addEventListener('change', () => this.filterProjects());
        statusFilter.addEventListener('change', () => this.filterProjects());
        searchInput.addEventListener('input', () => this.filterProjects());
    }
    
    setupSortControls() {
        const sortDiv = document.createElement('div');
        sortDiv.className = 'project-sort';
        
        const sortSelect = document.createElement('select');
        sortSelect.id = 'sort-projects';
        sortSelect.innerHTML = `
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="date-new">Date (Newest First)</option>
            <option value="date-old">Date (Oldest First)</option>
        `;
        
        sortDiv.innerHTML = '<label for="sort-projects">Sort by:</label>';
        sortDiv.appendChild(sortSelect);
        
        const filtersDiv = document.querySelector('.project-filters');
        filtersDiv.parentNode.insertBefore(sortDiv, filtersDiv.nextSibling);
        
        sortSelect.addEventListener('change', () => this.sortProjects());
    }
    
    filterProjects() {
        const categoryValue = document.getElementById('category-filter').value;
        const statusValue = document.getElementById('status-filter').value;
        const searchValue = document.getElementById('search-projects').value.toLowerCase();
        
        this.filteredProjects = this.allProjects.filter(project => {
            const matchesCategory = categoryValue === 'all' || project.category === categoryValue;
            const matchesStatus = statusValue === 'all' || project.status === statusValue;
            const matchesSearch = project.title.toLowerCase().includes(searchValue) || 
                                  project.description.toLowerCase().includes(searchValue);
            
            return matchesCategory && matchesStatus && matchesSearch;
        });
        
        this.sortProjects(false);
    }
    
    sortProjects(readSortValue = true) {
        const sortValue = readSortValue ? 
            document.getElementById('sort-projects').value : 
            document.getElementById('sort-projects').value;
        
        switch(sortValue) {
            case 'title-asc':
                this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                this.filteredProjects.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'date-new':
                this.filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date-old':
                this.filteredProjects.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
        }
        
        this.renderProjects();
    }
    
    renderProjects() {
        const headings = document.querySelectorAll('.heading-1, .heading-2, .heading-3, .heading-4');
        const projectBoxes = document.querySelectorAll('[class^="project-box"]');
        
        headings.forEach(heading => heading.remove());
        projectBoxes.forEach(box => box.remove());
        
        if (this.filteredProjects.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No projects found matching your criteria. Try adjusting your filters.';
            this.container.appendChild(noResults);
            return;
        }
        
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }
        
        this.filteredProjects.forEach((project, index) => {
            const projectBox = document.createElement('div');
            projectBox.className = `project-box-${index}`;
            projectBox.dataset.category = project.category;
            projectBox.dataset.status = project.status;
            
            projectBox.innerHTML = `
                <h4>${project.title}</h4>
                <a href="#"><img class="project-img" src="${project.image}" alt="${project.title}" width="300"></a>
                <p>${project.description}</p>
                <p class="project-meta">Category: ${project.category} | Status: ${project.status}</p>
            `;
            
            projectBox.style.gridColumn = (index % 4) + 2;
            projectBox.style.gridRow = Math.floor(index / 4) + 2;
            
            this.container.appendChild(projectBox);
        });
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     new ProjectManager(projectsData);
// });

export { ProjectManager };