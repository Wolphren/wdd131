class ModalManager {
    constructor() {
        this.modalTriggers = document.querySelectorAll('#profile, #family');
        
        this.ensureModalExists();
        
        this.setupEventListeners();
    }
    
    ensureModalExists() {
        let modal = document.getElementById('myModal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'myModal';
            modal.className = 'modal';
            
            modal.innerHTML = `
                <span class="close">&times;</span>
                <img class="modal-content" id="img01">
                <div id="caption"></div>
            `;
            
            document.body.appendChild(modal);
        }
        
        this.modal = modal;
        this.modalImg = document.getElementById('img01');
        this.captionText = document.getElementById('caption');
        this.closeBtn = document.querySelector('.close');
    }
    
    setupEventListeners() {
        this.modalTriggers.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => this.openModal(img));
        });
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openModal(imgElement) {
        this.modal.style.display = 'block';
        this.modalImg.src = imgElement.src;
        this.captionText.innerHTML = imgElement.alt;
        
        this.modalImg.style.maxHeight = '80vh';
        
        this.modalImg.classList.add('zoom-in');
        
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.add('fade-out');
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modal.classList.remove('fade-out');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
});

export { ModalManager };