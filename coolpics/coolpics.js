
const menuButton = document.createElement('button');
menuButton.textContent = 'Menu';
menuButton.classList.add('menu-button');
    
const nav = document.querySelector('nav');
nav.parentNode.insertBefore(menuButton, nav);

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuButton.classList.toggle('active');
});

function handleResize() 
{
    const menu = document.querySelector(".menu-button");
    if (window.innerWidth > 1000)
    {
        menu.classList.remove('open');
    }else
    {
        menu.classList.add('open');
    }
}

handleResize();
window.addEventListener("resize", handleResize);

function viewHandler(event)
{
    const clickedElement = event.target;
    const source = clickedElement.src.split("-");
    const newSource = source[0] + "-full.jpeg"
    const template = `
        <div id="imageViewer" class="viewer">
        <button class="close-viewer">X</button>
        <img src="${newSource}" alt="alt description">
      </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", template);
    document.querySelector(".close-viewer").addEventListener("click", closeViewer)
}

function closeViewer() 
{
    document.getElementById("imageViewer").remove();
}

document.querySelector(".gallery").addEventListener("click", viewHandler);