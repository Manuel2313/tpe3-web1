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

  let btnEnviar = document.querySelector(".btnEnviar");
  btnEnviar.addEventListener("click", agregar);
  async function agregar () {
    let url = "http://web-unicen.herokuapp.com/api/groups/grupo66/tablaviaje";
    tabla.thing.destinos = destino.value;
    tabla.thing.estadia = estadia.value;
    tabla.thing.servicios = servicio.value;
    tabla.thing.pago = pago.value;
    try{
      let response = await fetch(url, {
        "method": "POST",
        'headers': {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify(tabla)
      });
      let json = await response.json();
      cargatabla();
    }
    catch(e){
      console.log(e);
    }
  }
  async function cargatabla(){
    let url = "http://web-unicen.herokuapp.com/api/groups/grupo66/tablaviaje";
    try {
      let response = await fetch(url);
      let json = await response.json();
      if (json.tablaviaje.length>0) {
        let tbody = document.querySelector(".tebodi");
        tbody.innerHTML= " ";
        for (let i=0; i<json.tablaviaje.length; i++){
          mostrarTabla(json.tablaviaje[i]);
        }
      }
  }
  catch(e) {
    console.log("fallo la carga");
  }
}
function mostrarTabla(tablaviaje) {
  let tblBody = document.querySelector(".tebodi")
  let tRow = tblBody.insertRow(); // aca insertamos una fila a tbody
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
  btnborrar.id = "btnborrar";
  btnborrar.classList += "btn btn-info btn-sm";
  btnborrar.innerHTML = "Borrar";
  tCell4.appendChild(btnborrar);
  let btneditar = document.createElement('button');
  btneditar.id = "btnedit";
  btneditar.classList += "btn btn-info btn-sm";
  tCell5.appendChild(btneditar);
  btneditar.innerHTML = "Editar";

}
let btnagrega3 = document.querySelector(".btn-agrega3");
btnagrega3.addEventListener("click" , function(){
  for(let i=0; i<3; i++) {
    agregar();
  }
})
function vaciarTabla(tabla) {
  let tblBody = document.querySelector(".tebodi")
  let cantTabla = Object.keys(tabla).length; // Object.keys devuelve un arreglo con las prop del objeto. de eso, hacemos length
  while (tblBody.rows.length) {
    tblBody.deleteRow(-1);
  }
}
});
