const products=window.MUTAURA_PRODUCTS||[];
let active="Todos",cart=[],selectedProduct=null;
const categories=["Todos",...new Set(products.map(p=>p.cat))];
const filters=document.getElementById("filters"),grid=document.getElementById("productGrid"),search=document.getElementById("search");
const $=id=>document.getElementById(id);
function renderFilters(){filters.innerHTML=categories.map(c=>`<button class="filter ${c===active?'active':''}" data-cat="${c}">${c}</button>`).join("");filters.querySelectorAll("button").forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderFilters();renderProducts()})}
function renderProducts(){const q=search.value.trim().toLowerCase();const list=products.filter(p=>(active==="Todos"||p.cat===active)&&(p.name+" "+p.desc+" "+p.cat+" "+(p.tagline||"")).toLowerCase().includes(q));grid.innerHTML=list.length?list.map(p=>`<article class="product-card" data-name="${p.name}"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/page-01.jpg'"></div><div class="product-meta"><small>${p.cat}</small><h3>${p.name}</h3><span class="quick">VER DETALLES ↗</span></div></article>`).join(""):`<p class="no-results">No encontramos productos con esa búsqueda.</p>`;grid.querySelectorAll(".product-card").forEach(card=>card.onclick=()=>openProduct(card.dataset.name))}
function listItems(id,items){$(id).innerHTML=(items||[]).map(x=>`<li>${x}</li>`).join("")}
function openProduct(name){selectedProduct=products.find(p=>p.name===name);if(!selectedProduct)return;const p=selectedProduct;
$("modalImage").src=p.image;$("modalImage").alt=p.name;$("modalCategory").textContent=p.cat;$("modalName").textContent=p.name;$("modalTagline").textContent=p.tagline||"Un detalle para acompañar tus momentos."; $("modalDesc").textContent=p.desc||"Conoce más sobre este producto de MUTAURA.";
$("modalUses").innerHTML=(p.uses||[]).map(x=>`<span>${x}</span>`).join("");$("usesBlock").style.display=p.uses&&p.uses.length?"block":"none";
$("ingredientsBlock").style.display=p.ingredients&&p.ingredients.length?"block":"none";listItems("modalIngredients",p.ingredients);listItems("modalBenefits",p.benefits&&p.benefits.length?p.benefits:[p.desc||"Consulta más detalles por WhatsApp."]);
$("modalPresentation").textContent=p.presentation||"Consultar";$("productModal").classList.add("open");$("productModal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open")}
function closeProduct(){$("productModal").classList.remove("open");$("productModal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
function updateCart(){$("cartCount").textContent=cart.length;$("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-line"><div><b>${p.name}</b><div><small>${p.cat}</small></div></div><button data-remove="${i}" aria-label="Quitar ${p.name}">Quitar</button></div>`).join(""):'<p class="empty">Tu bolsa está esperando nuevos favoritos.</p>';$("cartItems").querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);updateCart()})}
function openDrawer(){$("cartDrawer").classList.add("open");$("overlay").classList.add("show");document.body.classList.add("drawer-open")}
function closeDrawer(){$("cartDrawer").classList.remove("open");$("overlay").classList.remove("show");document.body.classList.remove("drawer-open")}
$("addToCart").onclick=()=>{if(selectedProduct){cart.push(selectedProduct);updateCart();closeProduct();openDrawer()}};
$("modalClose").onclick=closeProduct;$("modalBackdrop").onclick=closeProduct;
$("openCart").onclick=openDrawer;$("closeCart").onclick=closeDrawer;$("overlay").onclick=closeDrawer;
$("checkout").onclick=()=>{if(!cart.length){alert("Agrega al menos un producto a tu bolsa.");return}const counts={};cart.forEach(p=>counts[p.name]=(counts[p.name]||0)+1);const lines=Object.entries(counts).map(([n,c])=>`• ${n} x${c}`).join("\n");const msg=`Hola MUTAURA, quisiera consultar por este pedido:\n\n${lines}\n\n¿Me podrían confirmar precios y disponibilidad?`;window.open("https://wa.me/51938215673?text="+encodeURIComponent(msg),"_blank","noopener")};
search.addEventListener("input",renderProducts);
$("menuToggle").onclick=()=> $("nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>$("nav").classList.remove("open")));
document.querySelectorAll("[data-jump]").forEach(a=>a.addEventListener("click",()=>{active=a.dataset.jump;renderFilters();renderProducts()}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeProduct();closeDrawer()}});
renderFilters();renderProducts();updateCart();
