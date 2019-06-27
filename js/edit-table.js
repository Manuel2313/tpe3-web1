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
  let btnEnviar = document.querySelector(".btnEnviar");
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
        'headers': {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify(tabla)
      });
      let json = await response.json();
      cargatabla();
      div.innerHTML = "se cargo con exito";
    } catch (e) {
      console.log(e);
    }
  }
  cargatabla();
  async function cargatabla() {
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
    }
  }

  function mostrarTabla(tablaviaje) {
    let tblBody = document.querySelector(".tebodi")
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
    let btnborrar = document.createElement('button');
    btnborrar.classList += "btn btn-info btn-sm";
    btnborrar.innerHTML = "Borrar";
    btnborrar.dataset.id = tablaviaje._id;
    btnborrar.addEventListener("click", async function () {
      try {
        div.innerHTML = "Borrando..";
        let idborrar = btnborrar.dataset.id;
        let urlborrar = url + idborrar;
        let r = await fetch(urlborrar, {
          "method": "DELETE"
        })
        let filaborrar = document.getElementById(idborrar);
        filaborrar.parentElement.removeChild(filaborrar);
        div.innerHTML = "Borrado con exito";
      } catch (e) {
        div.innerHTML = "Fallo el borrado";
      }
    })
    tCell4.appendChild(btnborrar);
    let btneditar = document.createElement('button');
    btneditar.id = "btnedit";
    btneditar.classList += "btn btn-info btn-sm";
    tCell5.appendChild(btneditar);
    btneditar.innerHTML = "Editar";

  }
  let btnagrega3 = document.querySelector(".btn-agrega3");
  btnagrega3.addEventListener("click", function () {
    for (let i = 0; i < 3; i++) {
      agregar();
    }
  })
  let btnvaciar = document.querySelector(".btn-vaciar");
  btnvaciar.addEventListener("click", vaciarTabla(tabla));

  function vaciarTabla(tabla) {
    let tblBody = document.querySelector(".tebodi")
    let cantTabla = Object.keys(tabla).length; // Object.keys devuelve un arreglo con las prop del objeto. de eso, hacemos length
    while (tblBody.rows.length) {
      tblBody.deleteRow(-1);
    }
  }








});