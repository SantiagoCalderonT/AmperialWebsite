document.addEventListener("DOMContentLoaded", () => {
    // --- Lógica del Menú Hamburguesa ---
    const menuToggles = document.querySelectorAll('.js-menu-toggle');

    menuToggles.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', () => {
            const navMenu = toggleBtn.parentElement.querySelector('.js-nav');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    });

    // Cierra el menú al presionar cualquier enlace (excepto el buscador)
    const navLinks = document.querySelectorAll('.js-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const parentNav = link.closest('.js-nav');
            if (parentNav) {
                parentNav.classList.remove('active');
            }
        });
    });

    // --- Lógica del Botón de Búsqueda Animado ---
    const searchToggle = document.getElementById("search-toggle");
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("global-search");
    const searchResults = document.getElementById("search-results-dropdown");

    if (searchToggle && searchContainer) {
        // Mostrar u ocultar con animación al hacer clic en la lupa
        searchToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            searchContainer.classList.toggle("active");
            if (searchContainer.classList.contains("active") && searchInput) {
                searchInput.focus(); // Enfoca automáticamente el input
            }
        });

        // Evitar que los clics dentro del buscador lo cierren inmediatamente
        searchContainer.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Cerrar el buscador si se hace clic fuera de él
        document.addEventListener("click", () => {
            searchContainer.classList.remove("active");
        });
    }

    // --- Lógica del Buscador Global de Productos ---
    if (searchInput && searchResults && typeof amperialProducts !== "undefined") {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length === 0) {
                searchResults.innerHTML = "";
                searchResults.style.display = "none";
                return;
            }

            // Filtrar por SKU (clave), nombre o descripción
            const matches = amperialProducts.filter(item => 
                item.sku.toLowerCase().includes(query) ||
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );

            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(item => `
                    <a href="${item.url}" class="search-result-item">
                        <img src="${item.image}" alt="${item.name}" class="search-thumb">
                        <div class="search-info">
                            <strong>${item.sku}</strong>
                            <span>${item.name} - <small>${item.category}</small></span>
                        </div>
                    </a>
                `).join("");
                searchResults.style.display = "block";
            } else {
                searchResults.innerHTML = `<div class="no-results">No se encontraron productos</div>`;
                searchResults.style.display = "block";
            }
        });
    }
});
