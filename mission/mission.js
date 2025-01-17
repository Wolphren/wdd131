const themeSelector = document.getElementById('themes')

function changeTheme(){
    const selectedTheme = themeSelector.value;
    const bodyElement = document.body;
    const logoElement = document.querySelector('footer img');

    if (selectedTheme === 'dark'){
        bodyElement.classList.add('dark')
        logoElement.src = 'images/byui-logo_white.png'
    }else{
        bodyElement.classList.remove('dark')
        logoElement.src = 'images/byui-logo_blue.webp'
    }
}

themeSelector.addEventListener('change', changeTheme)