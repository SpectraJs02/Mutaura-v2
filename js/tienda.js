
document.addEventListener("DOMContentLoaded", () => {

    const products = window.MUTAURA_PRODUCTS || [];

    const productGrid = document.getElementById("storeProductGrid");
    const filtersContainer = document.getElementById("storeFilters");
    const searchInput = document.getElementById("storeSearch");
    const resultsCount = document.getElementById("storeResultsCount");
    const emptyMessage = document.getElementById("storeEmpty");
    const zoomModal = document.getElementById("productZoomModal");
    const zoomImage = document.getElementById("zoomProductImage");
    const zoomClose = document.getElementById("zoomClose");
    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");
    const zoomReset = document.getElementById("zoomReset");
    let zoomLevel = 1;

    function updateZoom() {
        zoomImage.style.transform = `scale(${zoomLevel})`;
        zoomReset.textContent = `${Math.round(zoomLevel * 100)}%`;
    }

    function openZoom(image, alt) {
        zoomImage.src = image;
        zoomImage.alt = alt;
        zoomLevel = 1;
        updateZoom();
        zoomModal.classList.add("is-open");
        zoomModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("zoom-open");
        zoomClose.focus();
    }

    function closeZoom() {
        zoomModal.classList.remove("is-open");
        zoomModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("zoom-open");
        zoomImage.src = "";
    }

    zoomClose.addEventListener("click", closeZoom);
    zoomIn.addEventListener("click", () => { zoomLevel = Math.min(zoomLevel + .25, 3); updateZoom(); });
    zoomOut.addEventListener("click", () => { zoomLevel = Math.max(zoomLevel - .25, 1); updateZoom(); });
    zoomReset.addEventListener("click", () => { zoomLevel = 1; updateZoom(); });
    zoomModal.addEventListener("click", event => { if (event.target === zoomModal) closeZoom(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && zoomModal.classList.contains("is-open")) closeZoom(); });
    zoomModal.addEventListener("wheel", event => {
        if (!zoomModal.classList.contains("is-open")) return;
        event.preventDefault();
        zoomLevel = Math.min(3, Math.max(1, zoomLevel + (event.deltaY < 0 ? .15 : -.15)));
        updateZoom();
    }, { passive: false });

    // CATEGORÍAS
    const categories = [
        "Todos",
        ...new Set(products.map(product => product.cat))
    ];

    let activeCategory = "Todos";
    let searchTerm = "";

    // FILTROS
    function renderFilters() {

        filtersContainer.innerHTML = categories.map(category => `
            <button
                type="button"
                class="store-filter ${category === activeCategory ? "active" : ""}"
                data-category="${category}"
            >
                ${category}
            </button>
        `).join("");

        filtersContainer.querySelectorAll(".store-filter").forEach(button => {

            button.addEventListener("click", () => {

                activeCategory = button.dataset.category;

                renderFilters();
                renderProducts();

            });

        });

    }

    // PRODUCTOS
    function renderProducts() {

        const filteredProducts = products.filter(product => {

            const matchesCategory =
                activeCategory === "Todos" ||
                product.cat === activeCategory;

            const content = [
                product.name,
                product.cat,
                product.desc,
                product.tagline
            ].join(" ").toLowerCase();

            return matchesCategory && content.includes(searchTerm);

        });

        resultsCount.textContent =
            `${filteredProducts.length} productos encontrados`;

        if (filteredProducts.length === 0) {

            productGrid.innerHTML = "";
            emptyMessage.hidden = false;
            return;

        }

        emptyMessage.hidden = true;

        productGrid.innerHTML = filteredProducts.map(product => {

            return `
                <article class="store-product-card" tabindex="0" role="button" aria-label="Ampliar imagen de ${product.name}">

                    <div class="store-product-image">
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                        >
                    </div>

                    <div class="store-product-content">

                        <small>${product.cat}</small>

                        <h3>${product.name}</h3>

                        <p>${product.desc || product.tagline || ""}</p>

                    </div>

                </article>
            `;

        }).join("");

        productGrid.querySelectorAll(".store-product-card").forEach(card => {
            const image = card.querySelector(".store-product-image img");
            const show = () => openZoom(image.src, image.alt);
            card.addEventListener("click", show);
            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); show(); }
            });
        });

    }

    // BUSCADOR
    searchInput.addEventListener("input", () => {

        searchTerm = searchInput.value.trim().toLowerCase();

        renderProducts();

    });

    // INICIAR
    renderFilters();
    renderProducts();

});
