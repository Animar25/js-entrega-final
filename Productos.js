const contenidoCarrito = document.getElementById("contenidoCarrito");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  
  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio} $</p>
    `;
    contenidoCarrito.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "Agregar al Carrito";
    comprar.className = "button";
  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
      Toastify({
        text: "Se ha agregado un producto al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #10b6c2, #faf7f7)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      const repeat= carrito.some((repeatProduct) => repeatProduct.id === product.id);
      if(repeat){
        carrito.map((prod) => {
          if(prod.id === product.id){
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          image: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
          });
      }
  
      
  console.log(carrito);
  carritoCounter();
  saveLocal();
      });
  });
};

getProducts();



const saveLocal = () =>{
localStorage.setItem("carrito", JSON.stringify(carrito));
};



