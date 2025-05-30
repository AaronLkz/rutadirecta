const cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
  const cartList = document.getElementById("cart-list");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;
  cartList.innerHTML = "";
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.img}" alt="">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-row">
          <span class="cart-item-name" title="${item.name}">${item.name}</span>
          <span style="display:flex;align-items:center;gap:0.5rem;">
            <span class="cart-item-qty">x${item.qty}</span>
            <button class="remove-cart-item" data-idx="${idx}" title="Eliminar">&#128465;</button>
          </span>
        </div>
        <div class="cart-item-row">
          <span class="cart-item-price">$${item.price * item.qty}</span>
        </div>
      </div>
    `;
    cartList.appendChild(li);
  });
  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  cartTotal.textContent = total > 0 ? `Total: $${total}` : "";
  if (cart.length === 0) {
    cartList.innerHTML =
      '<li style="text-align:center;color:var(--gray);">Tu carrito está vacío</li>';
    cartTotal.textContent = "";
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, img) {
  const idx = cart.findIndex((item) => item.name === name);
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

document.addEventListener("DOMContentLoaded", () => {
  // Botón añadir al carrito
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".food-item-card");
      const name = card.getAttribute("data-name");
      const price = parseFloat(card.getAttribute("data-price"));
      const img = card.querySelector("img").src;
      addToCart(name, price, img);
      btn.classList.add("added");
      btn.innerHTML = '<i class="fa fa-check"></i> Añadido';
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = '<i class="fa fa-cart-plus"></i> Añadir al carrito';
      }, 1200);
    });
  });

  // Carrito flotante
  const cartFloat = document.getElementById("cart-float");
  const cartModalBg = document.getElementById("cart-modal-bg");
  const closeCart = document.getElementById("close-cart");
  const clearCart = document.getElementById("clear-cart");
  const checkoutCart = document.getElementById("checkout-cart");
  const checkoutForm = document.getElementById("checkout-form");
  const cartBtns = document.getElementById("cart-btns");

  cartFloat.addEventListener("click", () => {
    cartModalBg.style.display = "flex";
    updateCartUI();
    // Oculta formulario si estaba abierto
    checkoutForm.style.display = "none";
    cartBtns.style.display = "";
  });
  closeCart.addEventListener("click", () => {
    cartModalBg.style.display = "none";
    checkoutForm.style.display = "none";
    cartBtns.style.display = "";
  });
  cartModalBg.addEventListener("click", (e) => {
    if (e.target === cartModalBg) {
      cartModalBg.style.display = "none";
      checkoutForm.style.display = "none";
      cartBtns.style.display = "";
    }
  });
  clearCart.addEventListener("click", () => {
    cart.length = 0;
    updateCartUI();
  });

  // Mostrar formulario de datos al finalizar pedido
  checkoutCart.addEventListener("click", () => {
    if (cart.length === 0) return;
    checkoutForm.style.display = "block";
    cartBtns.style.display = "none";
  });

  // Cancelar formulario y volver a botones
  document.getElementById("cancel-checkout").addEventListener("click", () => {
    checkoutForm.style.display = "none";
    cartBtns.style.display = "";
  });

  // Enviar pedido por WhatsApp con datos del cliente
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("cliente-nombre").value.trim();
    const ubicacion = document.getElementById("cliente-ubicacion").value.trim();
    const notas = document.getElementById("cliente-notas").value.trim();

    let msg = `¡Hola! Quiero pedir:\n`;
    cart.forEach((item) => {
      msg += `- ${item.name} x${item.qty} ($${item.price * item.qty})\n`;
    });
    const cartTotal = document.getElementById("cart-total");
    msg += cartTotal.textContent ? `\n${cartTotal.textContent}` : "";
    msg += `\n\n🧑 Nombre: ${nombre}\n📍 Ubicación: ${ubicacion}`;
    if (notas) msg += `\n📝 Notas: ${notas}`;

    const url = `https://api.whatsapp.com/send?phone=+593991930724&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    // Limpiar y cerrar
    document.getElementById("cart-modal-bg").style.display = "none";
    checkoutForm.reset();
    checkoutForm.style.display = "none";
    cartBtns.style.display = "";
    cart.length = 0;
    updateCartUI();
  });

  // Eliminar producto del carrito
  document.getElementById("cart-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-cart-item")) {
      removeFromCart(Number(e.target.dataset.idx));
    }
  });

  updateCartUI();
});
