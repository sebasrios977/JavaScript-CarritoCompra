// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener( 'click', agregarCurso );

    // Elimina cursos del carrito
    carrito.addEventListener( 'click', eliminarCurso );

    // Vacia el carrito
    vaciarCarritoBtn.addEventListener( 'click', vaciarCarrito );
}

cargarEventListeners();

// Funciones
function agregarCurso( e ) {
    e.preventDefault();
    if( e.target.classList.contains( 'agregar-carrito' ) ){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso( cursoSeleccionado );

    }
    
}

// Elimina un curso del carrito
function eliminarCurso( e ) {
    if ( e.target.classList.contains( 'borrar-curso' ) ){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); // Se vuelve a iterar el carrito y mostrar el HTML
    }
}

// Lee el contenido del HTMl al que le dimos click y extrae la informacion del curso
function leerDatosCurso( curso ) {

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        descuento: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if( existe ){
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [... cursos];

    } else {
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();
    
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${ curso.imagen }" width="100" />
        <td>
            ${ curso.titulo }
        <td>
            ${ curso.descuento }
        <td>
            ${ curso.cantidad }
        <td>
            <a href="#" class="borrar-curso" data-id="${ curso.id }">X</a>
        </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild( row );
    });
}

// Elimina los cursos del tbody
function limpiarHTML() {

    // Forma Lenta
    // contenedorCarrito.innerHTML = '';

    // Forma optimizada
    while( contenedorCarrito.firstChild){
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}

// Vacia todo el carrito

function vaciarCarrito() {   
    limpiarHTML();
    articulosCarrito = [];
}