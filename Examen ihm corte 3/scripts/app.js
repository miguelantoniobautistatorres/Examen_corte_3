(function () {
  "use strict";

  var URL_BASE = "https://www.dnd5eapi.co/api/monsters/";

  var lista = document.getElementById("lista-monstruos");
  var ficha = document.getElementById("ficha-monstruo");

  var respaldo = {
    "aboleth": {
      nombre: "Aboleth",
      tipo: "Large aberration, lawful evil",
      ca: 17,
      pv: 135,
      cr: 10
    },
    "adult-red-dragon": {
      nombre: "Adult Red Dragon",
      tipo: "Huge dragon, chaotic evil",
      ca: 19,
      pv: 256,
      cr: 17
    },
    "goblin": {
      nombre: "Goblin",
      tipo: "Small humanoid, neutral evil",
      ca: 15,
      pv: 7,
      cr: 0.25
    },
    "owlbear": {
      nombre: "Owlbear",
      tipo: "Large monstrosity, unaligned",
      ca: 13,
      pv: 59,
      cr: 3
    }
  };

  function crearDato(etiqueta, valor) {
    return '<div class="dato">' +
             '<span class="dato__etiqueta">' + etiqueta + '</span>' +
             '<span class="dato__valor">' + valor + '</span>' +
           '</div>';
  }

  function pintarFicha(info) {
    ficha.innerHTML =
      "<h3>" + info.nombre + "</h3>" +
      '<p class="ficha__tipo">' + info.tipo + "</p>" +
      '<div class="ficha__datos">' +
        crearDato("Armor Class", info.ca) +
        crearDato("Hit Points", info.pv) +
        crearDato("CR", info.cr) +
      "</div>";
  }

  function convertir(datos) {
    var ca = datos.armor_class;
    if (Array.isArray(ca)) {
      ca = ca[0].value;
    }

    return {
      nombre: datos.name,
      tipo: datos.size + " " + datos.type + ", " + datos.alignment,
      ca: ca,
      pv: datos.hit_points,
      cr: datos.challenge_rating
    };
  }

  function cargar(clave) {
    fetch(URL_BASE + clave)
      .then(function (respuesta) {
        if (!respuesta.ok) {
          throw new Error("HTTP " + respuesta.status);
        }
        return respuesta.json();
      })
      .then(function (datos) {
        pintarFicha(convertir(datos));
      })
      .catch(function () {
        pintarFicha(respaldo[clave]);
      });
  }

  lista.addEventListener("change", function () {
    cargar(lista.value);
  });

  cargar(lista.value);

})();
