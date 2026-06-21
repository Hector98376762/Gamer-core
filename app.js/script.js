
const btnMenu = document.getElementById('btn-menu')

const navMenu =
document.querySelector(".nav");

btnMenu.addEventListener('click' , () => {
    navMenu.classList.toggle('active');
});



const navLinks = document.querySelectorAll(".nav a");

// 3. NUEVO: Le decimos a cada enlace que, al ser tocado, quite la clase 'active'
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});



let carrito = [];


function agregarAlCarrito(nombre, precio, imagen) {
    const existe = carrito.find(p => p.nombre === nombre);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    actualizarCarrito();
    mostrarAviso("Producto agregado");
}


function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("total");
    const contador = document.getElementById("cons");
    const btnWhatsapp = document.getElementById("btnWhatsapp"); 

    if (!lista || !totalElemento || !contador) return;

    let htmlTemporal = "";
    let totalFinal = 0;
    let cantidadTotal = 0;
    let textoPedido = "¡Hola! Quiero realizar este pedido:\n\n";

    carrito.forEach((p, index) => {
        totalFinal += p.precio * p.cantidad;
        cantidadTotal += p.cantidad;
        
       
        textoPedido += `• ${p.nombre} (x${p.cantidad}) - $${(p.precio * p.cantidad).toFixed(2)}\n`;

       htmlTemporal += `
            <div class="carrito-item">
                <img src="img/${p.imagen}" alt="${p.nombre}" style="width:50px;">
                <div>
                    <h4>${p.nombre}</h4>
                    <p>$${p.precio} x ${p.cantidad}</p>
                </div>
                <button onclick="eliminar(${index})">✖</button>
            </div>
        `;
    });

   
    lista.innerHTML = htmlTemporal;
    totalElemento.textContent = totalFinal.toFixed(2);
    contador.textContent = cantidadTotal;

   
    if (btnWhatsapp) {
        if (carrito.length > 0) {
            textoPedido += `\n*Total a pagar: $${totalFinal.toFixed(2)}*`;
            const numero = "8299870515";
            btnWhatsapp.href = `https://wa.me/${numero}?text=${encodeURIComponent(textoPedido)}`;
            btnWhatsapp.target = "_blank";
        } else {
            btnWhatsapp.href = "#";
            btnWhatsapp.addEventListener('click', (e) => {
                if(carrito.length === 0) {
                    e.preventDefault();
                    alert("El carrito está vacío");
                }
            });
        }
    }
}


function eliminar(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}


function abrirCarrito() {
    document.getElementById("carritoSidebar").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function cerrarCarrito() {
    document.getElementById("carritoSidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}


function mostrarAviso(mensaje) {
    const aviso = document.createElement("div");
    aviso.className = "aviso-carrito";
    aviso.textContent = mensaje;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 1000);
}


document.addEventListener("DOMContentLoaded", () => {
    const icono = document.getElementById("carrito");
    const capa = document.getElementById("overlay");

    if (icono) icono.addEventListener("click", abrirCarrito);
    if (capa) capa.addEventListener("click", cerrarCarrito);
});