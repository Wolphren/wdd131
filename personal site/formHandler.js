class FormHandler {
    constructor() {
        this.form = document.querySelector('form');
        if (!this.form) return;
        
        this.feedbackElement = document.getElementById('feedback');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        
        this.formFields = {
            name: this.form.querySelector('#name'),
            email: this.form.querySelector('#mail'),
            message: this.form.querySelector('#msg')
        };
        
        this.setupValidation();
        this.setupSubmitHandler();
    }
    
    setupValidation() {
        const style = document.createElement('style');
        style.textContent = `
            .error {
                border: 2px solid #ff3860 !important;
            }
            
            .success {
                border: 2px solid #09c372 !important;
            }
            
            .error-message {
                color: #ff3860;
                font-size: 12px;
                margin-top: 5px;
            }
            
            .form-group {
                margin-bottom: 15px;
                position: relative;
            }
        `;
        document.head.appendChild(style);

        if (this.form) {
            const listItems = this.form.querySelectorAll('li:not(.button)');
            listItems.forEach(item => {
                item.className = 'form-group';
                
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                item.appendChild(errorSpan);
            });
            
            Object.values(this.formFields).forEach(field => {
                if (field) {
                    field.addEventListener('input', () => this.validateField(field));
                    field.addEventListener('blur', () => this.validateField(field));
                }
            });
        }
    }
    
    validateField(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';
        
        field.classList.remove('error', 'success');
        
        if (!field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.id === 'mail') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.id === 'msg' && field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
        
        if (isValid) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    validateForm() {
        let isFormValid = true;
        
        Object.values(this.formFields).forEach(field => {
            if (field) {
                const fieldValid = this.validateField(field);
                isFormValid = isFormValid && fieldValid;
            }
        });
        
        return isFormValid;
    }
    
    setupSubmitHandler() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const isValid = this.validateForm();
                
                if (isValid) {
                    this.showFeedback(true);
                    
                    setTimeout(() => {
                        this.form.reset();
                        Object.values(this.formFields).forEach(field => {
                            if (field) field.classList.remove('success');
                        });
                    }, 3000);
                }
            });
        }
    }
    
    showFeedback(success) {
        if (this.feedbackElement) {
            const userName = this.formFields.name ? this.formFields.name.value : 'User';
            
            if (success) {
                this.feedbackElement.innerHTML = `Hello ${userName}! Thank you for your message. We will get back with you as soon as possible!`;
                this.feedbackElement.style.backgroundColor = '#4BB543';
            } else {
                this.feedbackElement.innerHTML = 'Please correct the errors in the form.';
                this.feedbackElement.style.backgroundColor = '#FF3860';
            }
            
            this.feedbackElement.style.display = 'block';
            document.body.classList.add('moveDown');
            
            setTimeout(() => {
                this.feedbackElement.style.display = 'none';
                document.body.classList.remove('moveDown');
            }, 5000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});

export { FormHandler };