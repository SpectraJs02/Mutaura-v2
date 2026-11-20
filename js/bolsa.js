
document.addEventListener("DOMContentLoaded", () => {

    const productsContainer = document.getElementById("bagProducts");
    const emptyMessage = document.getElementById("bagEmpty");
    const summary = document.getElementById("bagSummary");

    const itemsCount = document.getElementById("bagItemsCount");
    const subtotalElement = document.getElementById("bagSubtotal");
    const totalElement = document.getElementById("bagTotal");
    const bagCount = document.getElementById("bagCount");
    const checkoutButton = document.getElementById("checkoutWhatsApp");

    const WHATSAPP_NUMBER = "51938215673";

    let cart = JSON.parse(localStorage.getItem("mutauraCart") || "[]");


    // FORMATO DE PRECIOS
    function formatPrice(price) {
        return "S/ " + Number(price).toFixed(2);
    }


    // GUARDAR BOLSA
    function saveCart() {
        localStorage.setItem("mutauraCart", JSON.stringify(cart));
    }


    // ACTUALIZAR CONTADOR DEL ENCABEZADO
    function updateBagCount() {

        const totalItems = cart.reduce((sum, product) => {
            return sum + product.quantity;
        }, 0);

        bagCount.textContent = totalItems;
    }


    // MOSTRAR PRODUCTOS
    function renderCart() {

        updateBagCount();

        const totalItems = cart.reduce((sum, product) => {
            return sum + product.quantity;
        }, 0);

        itemsCount.textContent =
            totalItems === 1 ? "1 producto" : `${totalItems} productos`;


        // BOLSA VACÍA
        if (cart.length === 0) {

            productsContainer.innerHTML = "";
            emptyMessage.hidden = false;
            summary.hidden = true;

            subtotalElement.textContent = formatPrice(0);
            totalElement.textContent = formatPrice(0);

            return;
        }


        emptyMessage.hidden = true;
        summary.hidden = false;


        // GENERAR TARJETAS
        productsContainer.innerHTML = cart.map((product, index) => {

            return `
                <article class="bag-product">

                    <div class="bag-product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>

                    <div class="bag-product-info">

                        <h3>${product.name}</h3>

                        <p>${product.desc || ""}</p>

                        <strong>${formatPrice(product.price)}</strong>

                        <div class="bag-product-actions">

                            <div class="bag-quantity">

                                <button
                                    type="button"
                                    data-action="decrease"
                                    data-index="${index}">
                                    −
                                </button>

                                <span>${product.quantity}</span>

                                <button
                                    type="button"
                                    data-action="increase"
                                    data-index="${index}">
                                    +
                                </button>

                            </div>

                            <button
                                type="button"
                                class="bag-remove"
                                data-action="remove"
                                data-index="${index}">
                                Eliminar
                            </button>

                        </div>

                    </div>

                    <div class="bag-product-total">
                        ${formatPrice(product.price * product.quantity)}
                    </div>

                </article>
            `;

        }).join("");


        // CALCULAR SUBTOTAL
        const subtotal = cart.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0);


        subtotalElement.textContent = formatPrice(subtotal);
        totalElement.textContent = formatPrice(subtotal);

    }


    // MODIFICAR CANTIDADES Y ELIMINAR PRODUCTOS
    productsContainer.addEventListener("click", (event) => {

        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const index = Number(button.dataset.index);
        const action = button.dataset.action;

        if (!cart[index]) return;


        if (action === "increase") {
            cart[index].quantity += 1;
        }

        if (action === "decrease") {

            cart[index].quantity -= 1;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

        }

        if (action === "remove") {
            cart.splice(index, 1);
        }


        saveCart();
        renderCart();

    });


    // RESERVAR POR WHATSAPP
    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) return;


        let message = "Hola, quisiera adquirir estos productos:\n\n";

        cart.forEach(product => {

            message +=
                `• ${product.name} x${product.quantity} - ${formatPrice(product.price * product.quantity)}\n`;

        });


        const subtotal = cart.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0);


        message += `\nTotal de productos: ${formatPrice(subtotal)}`;

        message +=
            "\n\n¿Podrían indicarme los canales de pago y las opciones de entrega, por favor?";


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");

    });


    // INICIAR
    renderCart();

});
