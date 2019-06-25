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
  destino.addEventListener("keypress", function (event) {
    tabla.thing.destinos = event.target.value;
    console.log(tabla.thing.destinos);
  })
  let estadia = document.querySelector(".estadiaInput");
  estadia.addEventListener("keypress", function (event) {
    tabla.thing.estadia = event.target.value;
  })
  let servicio = document.querySelector(".servicioInput");
  servicio.addEventListener("keypress", function (event) {
    tabla.thing.servicios = event.target.value;
  })
  let pago = document.querySelector(".pagoInput");
  pago.addEventListener("keypress", function (event) {
    tabla.thing.pago = event.target.value;
  })




  let btnEnviar = document.querySelector(".btnEnviar");
  btnEnviar.addEventListener("click", agregar);
  async function agregar () {
    let url = "http://web-unicen.herokuapp.com/api/groups/grupo66/tablaviaje";
    try{
      let r = await fetch(url, {
        "method": "POST",
        'headers': {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify(tabla)
      });
      let json = await r.json();
      cargatabla();
    }
    catch(e){
      
    }

  }


  
  async function cargatabla(){
    let url = "http://web-unicen.herokuapp.com/api/groups/grupo66/tablaviaje";
    try {
      let r= await fetch(url);
      let json= await r.json();
      if (json.tablaviaje.length>0) {
        console.log("skere");
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
  tCell0.innerHTML = tablaviaje.thing.destinos; 
  tCell1.innerHTML = tablaviaje.thing.estadia; 
  tCell2.innerHTML = tablaviaje.thing.servicios;
  tCell3.innerHTML = tablaviaje.thing.pago;
}
let btnagrega3 = document.querySelector(".btn-agrega3");
btnagrega3.addEventListener("click" , function(){
  for(let i=0; i<3; i++) {
    agregar();
  }
})
});






// let btnVaciar = document.querySelector(".btn-vaciar");
//  btnVaciar.addEventListener("click", vaciarTabla);
// insertarTabla(tabla);
// let btnAgregar = document.querySelector(".btn-agrega3");

// function insertarTabla(tabla) {
//   tabla.destinos = destino;
//   tabla.estadia = estadia;
//   tabla.servicios = servicio;
//   tabla.pago = pago;
//   mostrarTabla();
// }





function vaciarTabla(tabla) {
  let tblBody = document.querySelector(".tebodi")
  let cantTabla = Object.keys(tabla).length; // Object.keys devuelve un arreglo con las prop del objeto. de eso, hacemos length
  while (tblBody.rows.length) {
    tblBody.deleteRow(-1);
  }
}