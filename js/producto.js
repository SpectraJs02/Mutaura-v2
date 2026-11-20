
document.addEventListener("DOMContentLoaded", () => {

    // Obtener el nombre del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");

    // Buscar el producto dentro del catálogo
    const products = window.MUTAURA_PRODUCTS || [];

    const product = products.find(item =>
        item.name.toLowerCase() === (productName || "").toLowerCase()
    );

    // Si no se encuentra el producto
    if (!product) {
        document.getElementById("productPage").innerHTML = `
            <div class="category-error">
                <h1>Producto no encontrado</h1>
                <p>No pudimos encontrar el producto que buscas.</p>
                <a href="bienestar.html" class="hero-button">
                    VOLVER A BIENESTAR
                </a>
            </div>
        `;
        document.title = "Producto no encontrado | MUTAURA";
        return;
    }

    // Función para mostrar textos o listas
    function formatContent(value) {
        if (!value) return "Información próximamente disponible.";

        if (Array.isArray(value)) {
            return value.join(", ");
        }

        return value;
    }

    // Información principal
    document.getElementById("productCategory").textContent =
        "MUTAURA · " + product.cat.toUpperCase();

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productTagline").textContent =
        product.tagline || "";

    document.getElementById("productDescription").textContent =
        product.desc || "";

    document.getElementById("productPresentation").textContent =
        product.presentation
            ? "Presentación: " + product.presentation
            : "";

    // Imagen
    const image = document.getElementById("productImage");

    image.src = product.image;
    image.alt = product.name;

    image.onerror = () => {
        image.style.display = "none";
    };

    // Información complementaria: listas legibles, no bloques de texto separados por comas.
    function renderList(elementId, items) {
        const target = document.getElementById(elementId);
        target.replaceChildren();
        const values = Array.isArray(items) ? items : (items ? [items] : []);
        const ul = document.createElement("ul");
        values.forEach(value => {
            const li = document.createElement("li");
            li.textContent = value;
            ul.appendChild(li);
        });
        target.appendChild(ul);
    }
    renderList("productBenefits", product.benefits);
    renderList("productIngredients", product.ingredients);
    renderList("productUses", product.uses);
    // Los precios y la bolsa permanecen ocultos temporalmente.

    // Actualizar título del navegador
    document.title = product.name + " | MUTAURA";

});
