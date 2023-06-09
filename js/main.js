/* Llamado de contenedores y declaracion de variables */
const contenedor = document.querySelector('#principal');
const buttonCategorias = document.querySelector(".dropdown-menu");
const contenedorCarrito= document.querySelector('#grid-container-carrito')
const buscar= document.querySelector('#boton_buscar');
const inputBusqueda= document.querySelector('#campo');
const boton=document.querySelector(".btn");
let pelis=[];/* Array que se llena con peliculas del ls */
/* Se crea un array de categorias */
localStorage.clear();
let listaCarrito=[];
const listaCategorias = [
  "Todas las Categorias",
  "Accion",
  "Aventura",
  "Comedia",
  "Guerra",
  "Infantil",
  "Terror",
];
/* Pantalla de espera */
/* Llamamos a la funcion consumir json y guardar en el localStorage */
consumirPeliculas();


function botonesComprar(){
  const arrayBotones = document.querySelectorAll(".btn_comprar");
  console.log("botones categoria escogida:");
  console.log(arrayBotones);
  console.log(arrayBotones.length);
  arrayBotones.forEach((btn) => {
    btn.addEventListener("click", () => {
      pelis.push(peliculaDesdeLS("peliculasLS"));
      let pel = pelis.filter((el) => el.id == btn.id);
      console.log(pel);
      /* console.log("Añadiste al carrito la pelicula: "+ pel[0].nombre); */
      Toastify({ //Alerta de pelicula seleccionada
        text: `Añadiste la pelicula: ${pel[0].nombre}`,
        position: "bottom-left",
        className: "mi-toastify",
        offset: {
          x: -30, // Ajusta el desplazamiento horizontal
          y: 20, // Ajusta el desplazamiento vertical
        },
        duration: 1000,   
        }).showToast();
        contenedorCarrito.appendChild(crearItemCompra(pel[0]));
        listaCarrito.push(pel[0]);
        console.log("Lista carrito total:");
        console.log(listaCarrito);
       /*  botonesComprar(); */
        console.log(listaCarrito.length);

       
    });
  });
  return listaCarrito;
  
}


for (const cate of listaCategorias) {
  /*Se recorre la lista para generar los li de categorias */
  const item = document.createElement("li");
  const categoria = document.createElement("a");
  categoria.textContent = cate; //Cada opcion del select toma el nombre de cada categoria
  categoria.classList.add("dropdown-item"); //Se le agrega una clase a la etiqueta a
  item.appendChild(categoria);
  buttonCategorias.appendChild(item);
  //Evento onclick para cada opcion del SELECT categoria
  categoria.onclick = () => {
    contenedor.innerHTML = "";//Se vacia el contenedor de peliculas
    const image = imagenCarga();
    contenedor.appendChild(image);
    boton.innerText = cate; //Se reemplaza nombre del SELECT por categoria escogida
    let peliculasFiltradasCategoria = [];
    for (const peli of buscaCategoria(peliculaDesdeLS("peliculasLS"), cate)) {
      /* Aqui va el friltrado por genero */
      peliculasFiltradasCategoria.push(peli);
    }
    console.log("Array objetos categoria seleccionada");
    console.log(peliculasFiltradasCategoria);
    carga(true, peliculasFiltradasCategoria, image);
   
    switch (boton.innerText) {
      case "Comedia":
        contenedor.removeChild(image);
        contenedor.innerHTML = `<h3>lo sentimos, no hay peliculas de esta Categoria</h3>`;
        break;
      case "Todas las Categorias":
        contenedor.removeChild(image);
        peliculaDesdeLS("peliculasLS").forEach((peli) => {
          contenedor.appendChild(crearContenedor(peli));
        });
        botonesComprar();
       break;
        
    }
  };
 
}
/* Se traen las peliculas parseadas desde el LS */
/* peliculaDesdeLS('peliculasLS').forEach(peli => { 
  contenedor.appendChild(crearContenedor(peli));
}); */


/* Funcion que retorna objetos que coinciden con la busqueda */
let busca=function filtrarPorCampo(arr, filtro) {
  const filtrado = arr.filter((el) => {
    return el.nombre.includes(filtro);
  });
  return filtrado;
}






/* EJECUCION DEL PROGRAMA */

/* Evento click para busqueda de pelicula  por nombre*/
buscar.onclick= (e)=>{

  e.preventDefault();
  contenedor.innerHTML="";/* Se eliminan los cards del contenedor para emular la recarga de la pagina por busqueda */


  for(pel of busca(peliculaDesdeLS('peliculasLS'), inputBusqueda.value)){/* Se los objetos filtrados para agregarlos como hijos del div principal */
  /* contenedor.appendChild(crearContenedor(pel)); */
  /* carga(true,pel, imagenCarga()); */
  contenedor.appendChild(crearContenedor(pel));

  
}

  /* Para agregar y mostrar toastify */
  botonesComprar(); 
  /* Condición para determinar si hay películas como resultado de la búsqueda */
  contenedor.innerHTML==""?contenedor.innerHTML=`<h3>lo sentimos, no hay peliculas</h3>`: console.log("con peliculas");   
 


}


/*  */
/* EJECUCIÓN DEL CÓDIGO */

/* botonesComprar();
if (contenedorCarrito!=""){
  const btnEliminarItem= document.querySelectorAll(".carrito-eliminar");
  console.log(btnEliminarItem.id );
  btnEliminarItem.forEach((btn)=>{
    btn.addEventListener("click", () => {
      
      console.log("tomaaa");
  
  });
  });
}; */