const Personajes = [
    {
        nombre: "David Choak",
        tipo: "vivo",
        residencia: "Galachos de Juslibol",
        fechaDescarga: "",
        culpabilidad: "delincuente",
        imagen: "https://www.postavy.cz/foto/david-choak-foto.jpg",
        comentarios: "Malo malisimo"
    }
]

function cargarListado() {
  borrarContenidoDiv("divContenido");
  const divContenido = document.getElementById("divContenido");

  // Si no hemos guardado nada todavía en el localStorage, se pushea el array inicial que tenemos en el js al localStorage
  const sujetoLocalStorage = JSON.parse(localStorage.getItem("sujetos")) || [];

  if (sujetoLocalStorage.length === 0) {
    localStorage.setItem("sujetos", JSON.stringify(Personajes));
  }

  // Obtener los sujetos de localStorage
  const sujetos = JSON.parse(localStorage.getItem("sujetos")) || [];

  // Se recorren todos los objetos almacenados y se imprimen en pantalla
  sujetos.forEach((sujeto, index) => {
    const element = document.createElement("div");
    element.classList.add("sujeto");

    // Configuracion de borde
    if (sujeto.tipo === "cargado") {
      element.style.border = "2px solid green";
    } else if (sujeto.tipo === "vivo") {
      element.style.border = "2px solid red";
    }

    // Configuracion de nombre
    if (sujeto.culpabilidad === "posible cooperador") {
      element.style.color = "green";
    } else if (sujeto.culpabilidad === "cooperador") {
      element.style.color = "orange";
    } else if (sujeto.culpabilidad === "delincuente") {
      element.style.color = "red";
    }

    // Imagen
    const imagen = document.createElement("img");
    imagen.src = sujeto.imagen;
    element.appendChild(imagen);

    // Nombre
    const nombre = document.createElement("p");
    nombre.textContent = sujeto.nombre;
    element.appendChild(nombre);
    divContenido.appendChild(element);

    element.addEventListener("click", function () {
      editarSujeto(index); // Pasa el índice en lugar del objeto sujeto
    });
  });
}
function editarSujeto(index) {
  borrarContenidoDiv("divContenido");
  var divContenido = document.getElementById("divContenido");

  // Obtener los sujetos almacenados en localStorage
  var sujetosGuardados = JSON.parse(localStorage.getItem("sujetos")) || [];

  // Verificar si el índice proporcionado es válido
  if (index >= 0 && index < sujetosGuardados.length) {
    // Obtener el sujeto a editar
    var sujetoEditar = sujetosGuardados[index];

    // Crear formulario
    var formulario = document.createElement("form");
    formulario.id = "divContenido";

    // Campo Nombre
    var labelNombre = document.createElement("label");
    labelNombre.textContent = "Nombre:";
    var inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.name = "nombre";
    inputNombre.value = sujetoEditar.nombre; 
    formulario.appendChild(labelNombre);
    formulario.appendChild(inputNombre);
    formulario.appendChild(document.createElement("br"));

    
  // Campo Tipo (cargado o vivo)
  var labelTipo = document.createElement("label");
  labelTipo.textContent = "Tipo:";
  var selectTipo = document.createElement("select");
  selectTipo.name = "tipo";
  var optionVivo = document.createElement("option");
  optionVivo.value = "vivo";
  optionVivo.textContent = "Vivo";
  var optionCargado = document.createElement("option");
  optionCargado.value = "cargado";
  optionCargado.textContent = "Cargado";
  
  selectTipo.appendChild(optionVivo);
  selectTipo.appendChild(optionCargado);
  selectTipo.value=sujetoEditar.tipo;
  formulario.appendChild(labelTipo);
  formulario.appendChild(selectTipo);
  formulario.appendChild(document.createElement("br"));

  // Campo Residencia
  var labelResidencia = document.createElement("label");
  labelResidencia.textContent = "Residencia:";
  var inputResidencia = document.createElement("input");
  inputResidencia.type = "text";
  inputResidencia.name = "residencia";
  inputResidencia.value = sujetoEditar.residencia;
  formulario.appendChild(labelResidencia);
  formulario.appendChild(inputResidencia);
  formulario.appendChild(document.createElement("br"));

  // Campo Desde cuando fue descargado (solo disponible si tipo es "descargado")
  var labelDescargado = document.createElement("label");
  labelDescargado.textContent = "Desde cuando fue descargado:";
  var inputDescargado = document.createElement("input");
  inputDescargado.type = "text";
  inputDescargado.name = "descargado";
  inputDescargado.disabled = true;
  inputDescargado.required = false;
  
  selectTipo.addEventListener("change", function() {
    if (selectTipo.value === "cargado") {
      inputDescargado.disabled = false;
      inputDescargado.required = true;
    } else {
      inputDescargado.disabled = true;
      inputDescargado.required = false;
    }
  });
inputDescargado.value = sujetoEditar.descargado;
formulario.appendChild(labelDescargado);
formulario.appendChild(inputDescargado);
formulario.appendChild(document.createElement("br"));

  // Campo Culpabilidad
  var labelCulpabilidad = document.createElement("label");
  labelCulpabilidad.textContent = "Culpabilidad:";
  var selectCulpabilidad = document.createElement("select");
  selectCulpabilidad.name = "culpabilidad";
  var optionPosibleCooperador = document.createElement("option");
  optionPosibleCooperador.value = "posible cooperador";
  optionPosibleCooperador.textContent = "Posible Cooperador";
  var optionCooperador = document.createElement("option");
  optionCooperador.value = "cooperador";
  optionCooperador.textContent = "Cooperador";
  var optionDelincuente = document.createElement("option");
  optionDelincuente.value = "delincuente";
  optionDelincuente.textContent = "Delincuente";
  selectCulpabilidad.value = sujetoEditar.culpabilidad;
  selectCulpabilidad.appendChild(optionPosibleCooperador);
  selectCulpabilidad.appendChild(optionCooperador);
  selectCulpabilidad.appendChild(optionDelincuente);
  formulario.appendChild(labelCulpabilidad);
  formulario.appendChild(selectCulpabilidad);
  formulario.appendChild(document.createElement("br"));

  // Campo URL del sujeto
  var labelUrl = document.createElement("label");
  labelUrl.textContent = "URL del sujeto:";
  var inputUrl = document.createElement("input");
  inputUrl.type = "url";
  inputUrl.name = "url";
  var defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/240px-Icon-round-Question_mark.svg.png"; 
  inputUrl.addEventListener("blur", function() {
    if (!isValidUrl(inputUrl.value)) {
      inputUrl.value = defaultImageUrl;
    }
  });
  inputUrl.value = sujetoEditar.imagen;
  formulario.appendChild(labelUrl);
  formulario.appendChild(inputUrl);
  formulario.appendChild(document.createElement("br"));

  // Campo Comentarios
  var labelComentarios = document.createElement("label");
  labelComentarios.textContent = "Comentarios:";
  var textareaComentarios = document.createElement("textarea");
  textareaComentarios.name = "comentarios";
  textareaComentarios.value = sujetoEditar.comentarios;
  formulario.appendChild(labelComentarios);
  formulario.appendChild(textareaComentarios);

  var guardarButton = document.createElement("button");
  guardarButton.type = "button"; // Puedes cambiarlo a "submit" si prefieres
  guardarButton.textContent = "Guardar Cambios";
  guardarButton.addEventListener("click", function () {
    // Validaciones de campos
    if (inputDescargado.required && (inputDescargado.value.trim() === "" || inputDescargado.value === "undefined")) {
      alert("Por favor, complete el campo 'Desde cuando fue descargado'.");
      return;
    }
  
    if(inputNombre.value === "" || selectTipo.value === "" || selectCulpabilidad.value === "" ){
      alert("Por favor, complete todos los campos");
      return;
    } 

    // Confirmación antes de guardar cambios
    var confirmacion = confirm(
      "¿Está seguro de que los datos del sujeto son correctos?"
    );

    if (confirmacion) {
      // Al confirmar se actualizan los datos 
      sujetoEditar.nombre = inputNombre.value;
      sujetoEditar.tipo = selectTipo.value;
      sujetoEditar.residencia = inputResidencia.value;
      sujetoEditar.descargado = inputDescargado.value;
      sujetoEditar.culpabilidad = selectCulpabilidad.value;
      sujetoEditar.imagen = inputUrl.value;
      sujetoEditar.comentarios = textareaComentarios.value;

      localStorage.setItem(
        "sujetos",
        JSON.stringify(sujetosGuardados)
      );

      alert("Cambios guardados correctamente.");
      cargarListado();
    } else {
      alert("Por favor, revise los datos antes de guardar los cambios.");
    }
  });

  formulario.appendChild(guardarButton);

  divContenido.appendChild(formulario);
}
}



function nuevoRegistro() {
  borrarContenidoDiv("divContenido");
  var divContenido = document.getElementById("divContenido");

  // Crear formulario
  var formulario = document.createElement("form");
  formulario.id = "divContendio";

  // Campo nombre
  var labelNombre = document.createElement("label");
  labelNombre.textContent = "Nombre:";
  var inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.name = "nombre";
  formulario.appendChild(labelNombre);
  formulario.appendChild(inputNombre);
  formulario.appendChild(document.createElement("br"));


  // Campo tipo 
  var labelTipo = document.createElement("label");
  labelTipo.textContent = "Tipo:";
  var selectTipo = document.createElement("select");
  selectTipo.name = "tipo";
  var optionVivo = document.createElement("option");
  optionVivo.value = "vivo";
  optionVivo.textContent = "Vivo";
  var optionCargado = document.createElement("option");
  optionCargado.value = "cargado";
  optionCargado.textContent = "Cargado";
  selectTipo.appendChild(optionVivo);
  selectTipo.appendChild(optionCargado);
  
  formulario.appendChild(labelTipo);
  formulario.appendChild(selectTipo);
  formulario.appendChild(document.createElement("br"));

  // Campo residencia
  var labelResidencia = document.createElement("label");
  labelResidencia.textContent = "Residencia:";
  var inputResidencia = document.createElement("input");
  inputResidencia.type = "text";
  inputResidencia.name = "residencia";
  formulario.appendChild(labelResidencia);
  formulario.appendChild(inputResidencia);
  formulario.appendChild(document.createElement("br"));

  // Campo desde cuando fue descargado (si hemos seleccionado que es un cargado)
  var labelDescargado = document.createElement("label");
  labelDescargado.textContent = "Desde cuando fue descargado:";
  var inputDescargado = document.createElement("input");
  inputDescargado.type = "text";
  inputDescargado.name = "descargado";
  inputDescargado.disabled = true;
  inputDescargado.required = false;
  
  selectTipo.addEventListener("change", function() {
    if (selectTipo.value === "cargado") {
      inputDescargado.disabled = false;
      inputDescargado.required = true;
    } else {
      inputDescargado.disabled = true;
      inputDescargado.required = false;
    }
  });
formulario.appendChild(labelDescargado);
formulario.appendChild(inputDescargado);
formulario.appendChild(document.createElement("br"));

  // Campo Culpabilidad
  var labelCulpabilidad = document.createElement("label");
  labelCulpabilidad.textContent = "Culpabilidad:";
  var selectCulpabilidad = document.createElement("select");
  selectCulpabilidad.name = "culpabilidad";
  var optionPosibleCooperador = document.createElement("option");
  optionPosibleCooperador.value = "posible cooperador";
  optionPosibleCooperador.textContent = "Posible Cooperador";
  var optionCooperador = document.createElement("option");
  optionCooperador.value = "cooperador";
  optionCooperador.textContent = "Cooperador";
  var optionDelincuente = document.createElement("option");
  optionDelincuente.value = "delincuente";
  optionDelincuente.textContent = "Delincuente";
  selectCulpabilidad.appendChild(optionPosibleCooperador);
  selectCulpabilidad.appendChild(optionCooperador);
  selectCulpabilidad.appendChild(optionDelincuente);
  formulario.appendChild(labelCulpabilidad);
  formulario.appendChild(selectCulpabilidad);
  formulario.appendChild(document.createElement("br"));

  // Campo URL del sujeto
  var labelUrl = document.createElement("label");
  labelUrl.textContent = "URL del sujeto:";
  var inputUrl = document.createElement("input");
  inputUrl.type = "url";
  inputUrl.name = "url";
  var defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/240px-Icon-round-Question_mark.svg.png"; 
  inputUrl.addEventListener("blur", function() {

    if (!isValidUrl(inputUrl.value)) {
      inputUrl.value = defaultImageUrl;
    }
  });
  formulario.appendChild(labelUrl);
  formulario.appendChild(inputUrl);
  formulario.appendChild(document.createElement("br"));

  // Campo Comentarios
  var labelComentarios = document.createElement("label");
  labelComentarios.textContent = "Comentarios:";
  var textareaComentarios = document.createElement("textarea");
  textareaComentarios.name = "comentarios";
  formulario.appendChild(labelComentarios);
  formulario.appendChild(textareaComentarios);
  
  var submitButton = document.createElement("button");
submitButton.type = "button"; 
submitButton.textContent = "Guardar";
submitButton.addEventListener("click", function() {

  if (inputDescargado.required && inputDescargado.value.trim() === "") {
    alert("Por favor, complete el campo 'Desde cuando fue descargado'.");
    return;
  }

  if(inputNombre.value === "" || selectTipo.value === "" || selectCulpabilidad.value === "" || inputUrl.value === "") {
    alert("Por favor, complete todos los campos");
    return;
  }
  
  var confirmacion = confirm("¿Está seguro de que los datos del sujeto son correctos?");

  if (confirmacion) {
    // Obtener valores del formulario
    var nombre = inputNombre.value;
    var tipo = selectTipo.value;
    var residencia = inputResidencia.value;
    var fechaDescarga = inputDescargado.value; 
    var culpabilidad = selectCulpabilidad.value;
    var imagen = inputUrl.value ;
    var comentarios = textareaComentarios.value;

    var sujetosGuardados = JSON.parse(localStorage.getItem("sujetos")) || [];

// Pushea un nuevo sujeto al array
var sujeto = {
  nombre: nombre,
  tipo: tipo,
  residencia: residencia,
  fechaDescarga: fechaDescarga,
  culpabilidad: culpabilidad,
  imagen: imagen,
  comentarios: comentarios
};

sujetosGuardados.push(sujeto);

localStorage.setItem("sujetos", JSON.stringify(sujetosGuardados));
    
    alert("Sujeto agregado correctamente.");
    cargarListado();
    limpiarFormulario();
  } else {

    alert("Por favor, revise los datos antes de agregar el sujeto.");
  }
});


formulario.appendChild(submitButton);

divContenido.appendChild(formulario);

  
}

function isValidUrl(url) {

  var patron = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  
  return patron.test(url);
}

  function borrarContenidoDiv(divContenido) {
    var div = document.getElementById(divContenido);
  
    div.innerHTML = "";
  }
  
function modoEmergencia() {
    // Este metodo esta hecho para que ocupe toda la pantalla con una imagen a modo de salvapantallas
    
    if (document.documentElement.requestFullscreen) {

      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari y Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // Internet Explorer
      document.documentElement.msRequestFullscreen();
    }

  
    document.body.innerHTML = '';
  
    
    var salvapantallasImg = document.createElement('img');
    salvapantallasImg.src = 'https://elfarodeceuta.es/wp-content/uploads/2020/06/escombros-vertedero-principe-descampado-2.jpg';
    salvapantallasImg.style.width = '100%';
    salvapantallasImg.style.height = '100%';
    salvapantallasImg.style.objectPosition = 'center';
  
    document.body.appendChild(salvapantallasImg);

    var botonRestaurar = document.createElement('button');
    botonRestaurar.innerText = 'Volver';
    botonRestaurar.style.position = 'fixed';
    botonRestaurar.style.bottom = '10px';
    botonRestaurar.style.left = '10px';
    botonRestaurar.style.backgroundColor = 'transparent';
    botonRestaurar.style.color = 'white';
    botonRestaurar.style.border = 'none';
    botonRestaurar.style.outline = 'none';
    botonRestaurar.style.cursor = 'pointer';
  
  
    botonRestaurar.addEventListener('click', function() {
     location.reload();
      // Salir del modo de pantalla completa
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari y Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // Internet Explorer
        document.msExitFullscreen();
      }
    });
  
    document.body.appendChild(botonRestaurar);
  }
