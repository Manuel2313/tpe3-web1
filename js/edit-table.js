 "use strict"
document.addEventListener("DOMContentLoaded", function () {
  let tabla = {
    "thing": {
      "destinos": "",
      "estadia": "",
      "servicios": "",
      "pago": ""
    }
  };
  let destino = document.querySelector(".destinoInput");
  let estadia = document.querySelector(".estadiaInput");
  let servicio = document.querySelector(".servicioInput");
  let pago = document.querySelector(".pagoInput");
  let div = document.querySelector(".div");
  let result = document.querySelector(".result");
  let btnEnviar = document.querySelector(".btnEnviar");
  let formEdit = document.querySelector(".modeEdit");
  let url = "http://web-unicen.herokuapp.com/api/groups/grupo66/tablaviaje/";
  btnEnviar.addEventListener("click", agregar);
  async function agregar() {
    tabla.thing.destinos = destino.value;
    tabla.thing.estadia = estadia.value;
    tabla.thing.servicios = servicio.value;
    tabla.thing.pago = pago.value;
    try {
      div.innerHTML = "Guardando..";
      let response = await fetch(url, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(tabla)
      });
      let json = await response.json();
      cargaTabla();
      div.innerHTML = "se cargo con exito";
    } catch (e) {
      console.log(e);
    }
  }
  cargaTabla();
  async function cargaTabla() {
    try {
      div.innerHTML = "Cargando..";
      let response = await fetch(url);
      let json = await response.json();
      if (json.tablaviaje.length > 0) {
        let tbody = document.querySelector(".tebodi");
        tbody.innerHTML = " ";
        for (let i = 0; i < json.tablaviaje.length; i++) {
          mostrarTabla(json.tablaviaje[i]);
        }
        div.innerHTML = "Cargado con exito";
      } else {
        div.innerHTML = "No se encontraron datos";
      }
    } catch (e) {
      div.innerHTML = "fallo la carga";
      console.log(e);
    }
  }

  function mostrarTabla(tablaviaje) {
    let tblBody = document.querySelector(".tebodi");
    let tRow = tblBody.insertRow(); // aca insertamos una fila a tbody
    tRow.id = tablaviaje._id;
    let tCell0 = tRow.insertCell(0);
    let tCell1 = tRow.insertCell(1);
    let tCell2 = tRow.insertCell(2);
    let tCell3 = tRow.insertCell(3);
    let tCell4 = tRow.insertCell(4);
    let tCell5 = tRow.insertCell(5);
    tCell0.innerHTML = tablaviaje.thing.destinos;
    tCell1.innerHTML = tablaviaje.thing.estadia;
    tCell2.innerHTML = tablaviaje.thing.servicios;
    tCell3.innerHTML = tablaviaje.thing.pago;
    let btnBorrar = document.createElement('button');
    btnBorrar.classList += "btn btn-info btn-sm";
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.dataset.id = tablaviaje._id;
    btnBorrar.addEventListener("click", async function () {
      try {
        div.innerHTML = "Borrando..";
        let idBorrar = btnBorrar.dataset.id;
        let urlBorrar = url + idBorrar;
        let r = await fetch(urlBorrar, {
          "method": "DELETE"
        })
        let filaBorrar = document.getElementById(idBorrar);
        filaBorrar.parentElement.removeChild(filaBorrar);
        div.innerHTML = "Borrado con exito";
      } catch (e) {
        div.innerHTML = "Fallo el borrado";
        console.log(e);
      }
    }) // fin evento borrar
    tCell4.appendChild(btnBorrar);

    let btnEditar = document.createElement('button');
    btnEditar.classList += "btn btn-info btn-sm";
    btnEditar.innerHTML = "Editar";
    btnEditar.dataset.id = tablaviaje._id;
    btnEditar.addEventListener("click", ()=>{
      formEdit.classList.remove("editHidden");
      formEdit.dataset.id = btnEditar.dataset.id;
    }); // fin evento editar
    tCell5.appendChild(btnEditar);
  } // fin mostrarTabla

  let btnPut = document.querySelector(".btnEditar");
  btnPut.addEventListener("click", async function (){
    try{
      div.innerHTML = "Enviando los cambios...";
      tabla.thing.destinos = document.querySelector(".destinoEdit").value;
      tabla.thing.estadia = document.querySelector(".estadiaEdit").value;
      tabla.thing.servicios = document.querySelector(".servicioEdit").value;
      tabla.thing.pago = document.querySelector(".pagoEdit").value;
      let editId = formEdit.dataset.id;
      let urlEdicion = url+editId;
      let response = await fetch(urlEdicion, { // aca enviar lo tomado en los input
        "method": "PUT",
        'headers': {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify(tabla)
      });
      let json = await response.json();
      cargaTabla();
      formEdit.classList.add("editHidden");
      div.innerHTML = "Enviado con éxito";
    } catch (e){
      div.innerHTML = "Falló la edición"
      console.log(e);
    }
  });

  let btnagrega3 = document.querySelector(".btn-agrega3");
  btnagrega3.addEventListener("click", function () {
    for (let i = 0; i < 3; i++) {
      agregar();
    }
  })

  let btnfiltro = document.getElementById("btn-filtrado");
  btnfiltro.addEventListener("click", async function () {
    try {
      result.innerHTML = "buscando...";
      document.querySelector(".tebodi").innerHTML = "";
      let r = await fetch(url);
      let json = await r.json();
      let filtroingresado = document.querySelector("#filtrado").value;
      if (json.tablaviaje.length > 0) {
        for (let i = 0; i < json.tablaviaje.length; i++) {
          if (filtroingresado == json.tablaviaje[i].thing.destinos || filtroingresado == json.tablaviaje[i].thing.estadia || filtroingresado == json.tablaviaje[i].thing.servicios || filtroingresado == json.tablaviaje[i].thing.pago) {
            mostrarTabla(json.tablaviaje[i]);
            result.innerHTML =  "Busqueda completada";
          }
          else {
            result.innerHTML = "No se encontraron resultados"
          }
        } // fin for
      } //fin if
       else {
        result.innerHTML = "No hay resultados";
      }
    }
    catch(e) {
      result.innerHTML = "Fallo la busqueda";
    }
  })

  let btnvaciar = document.querySelector(".btn-vaciar");
  btnvaciar.addEventListener("click", async ()=>{
    div.innerHTML = "Vaciando..."
    let response = await fetch(url);
    let json = await response.json();
    let tblBody = document.querySelector(".tebodi");
    if (json.tablaviaje.length > 0){
      for(let i=0; i<json.tablaviaje.length;i++){
        try {
          let urlParcial = url+json.tablaviaje[i]._id;
          let r = await fetch(urlParcial, {
            "method": "DELETE"
          })
          tblBody.deleteRow(-1);
        } catch (e) {
          console.log(e);
        }
      } // fin for
      cargaTabla();
      div.innerHTML = "Vaciado con éxito"
    }
  }); // fin vaciar
});

   //let cantTabla = Object.keys(tabla).length; // Object.keys devuelve un arreglo con las prop del objeto. de eso, hacemos length
   /*if (tabla.length > 0){
     for (let i=0;i<tabla.length;i++){
      tabla.splice (-1,1);
     }
   }*/
