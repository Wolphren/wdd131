document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.createElement('button');
    menuButton.textContent = 'Menu';
    menuButton.classList.add('menu-button');
    
    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(menuButton, nav);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuButton.classList.toggle('active');
    });
});