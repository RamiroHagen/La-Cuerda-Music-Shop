
const productos = [
  { id: 1, nombre: "Guitarra Eléctrica", precio: 250, imagen: "img/guitarra.jpg" },
  { id: 2, nombre: "Piano Digital", precio: 800, imagen: "img/piano.jpg" },
  { id: 3, nombre: "Batería", precio: 500, imagen: "img/bateria.jpg" },
  { id: 4, nombre: "Micrófono", precio: 150, imagen: "img/microfono.jpg" }
];

let carrito = obtenerCarritoDeStorage() || [];
const productosContainer = document.getElementById("productos-container");
const carritoLista = document.getElementById("carrito-lista");
const totalSn = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar-carrito");

function renderizarProductos() {
  productosContainer.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
                      <div class="card" style="width: 18rem;">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                          <h5 class="card-title">${producto.nombre}</h5>
                          <p class="card-text">${producto.precio}</p>
                          <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary"> Agregar al carrito </button>
                        </div>
                      </div> 
                    `;
    productosContainer.appendChild(div);
  });
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (producto) {
    carrito.push(producto);
    guardarCarritoEnStorage();
    actualizarCarritoUI();
  }
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarritoEnStorage();
  actualizarCarritoUI();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarritoEnStorage();
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  carritoLista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
                    ${producto.nombre} - $${producto.precio}
                    <button onclick="eliminarProducto(${index})">❌</button>
                   `;
    carritoLista.appendChild(li);
    total += producto.precio;
  });

  totalSn.textContent = total;
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerCarritoDeStorage() {
  return JSON.parse(localStorage.getItem("carrito"));
}

botonVaciar.addEventListener("click", vaciarCarrito);




renderizarProductos();
actualizarCarritoUI();