// Array de productos
const productos = [
    { id: 1, nombre: "Guitarra Eléctrica", precio: 250, },
    { id: 2, nombre: "Piano Digital", precio: 800, },
    { id: 3, nombre: "Batería", precio: 500, },
    { id: 4, nombre: "Micrófono", precio: 150, }
  ];
  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  // Referencias al DOM
  const productosContainer = document.getElementById("productos-container");
  const carritoLista = document.getElementById("carrito-lista");
  const totalSpan = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciar-carrito");
  
  // Mostrar productos en la tienda
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h2>${producto.nombre}</h2>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
      <p>$${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(div);
  });
  
  // Evento para agregar productos al carrito
  productosContainer.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      carrito.push(producto);
      actualizarCarrito();
    }
  });
  
  // Evento para vaciar carrito
  btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
  });
  
  // Actualizar el carrito y guardar en LocalStorage
  function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;
  
    carrito.forEach((producto, index) => {
      const li = document.createElement("li");
      li.textContent = `${producto.nombre} - $${producto.precio}`;
      carritoLista.appendChild(li);
      total += producto.precio;
    });
  
    totalSpan.textContent = total;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  // Mostrar carrito inicial (si hay en LocalStorage)
  actualizarCarrito();
  