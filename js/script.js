// Selecciona todos los botones de menú y sus navegaciones correspondientes por clase
const menuToggles = document.querySelectorAll('.js-menu-toggle');

menuToggles.forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
        // Busca el elemento nav hermano dentro del mismo contenedor del header
        const navMenu = toggleBtn.parentElement.querySelector('.js-nav');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
});

// Cierra el menú al presionar cualquier enlace
const navLinks = document.querySelectorAll('.js-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const parentNav = link.closest('.js-nav');
        if (parentNav) {
            parentNav.classList.remove('active');
        }
    });
});