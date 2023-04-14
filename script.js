const form = document.getElementById("form");
const nombresDiv = document.getElementById("nombres");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombreInput = document.getElementById("nombre");
  const nombre = nombreInput.value;
  if (nombre.trim() !== "") {
    const nombreDiv = document.createElement("div");
    nombreDiv.classList.add("nombre");
    const nombreH2 = document.createElement("h2");
    nombreH2.textContent = nombre;
    const tareasUl = document.createElement("ul");
    tareasUl.classList.add("tareas");
    const tareaInput = document.createElement("input");
    tareaInput.type = "text";
    tareaInput.placeholder = "Agregar tarea";
    const tareaBtn = document.createElement("button");
    tareaBtn.textContent = "Agregar";
    tareaBtn.addEventListener("click", () => {
      const tarea = tareaInput.value;
      if (tarea.trim() !== "") {
        const tareaLi = document.createElement("li");
        tareaLi.textContent = tarea;
        const tareaCheckbox = document.createElement("input");
        tareaCheckbox.type = "checkbox";
        tareaCheckbox.addEventListener("change", () => {
          tareaLi.classList.toggle("tachado");
          guardarNombres();
        });
        tareaLi.insertBefore(tareaCheckbox, tareaLi.firstChild);
        tareasUl.appendChild(tareaLi);
        tareaInput.value = "";
        guardarNombres();
      }
    });
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar Mozo";
    eliminarBtn.addEventListener("click", () => {
      nombresDiv.removeChild(nombreDiv);
      guardarNombres();
    });
    nombreDiv.appendChild(nombreH2);
    nombreDiv.appendChild(eliminarBtn);
    nombreDiv.appendChild(tareasUl);
    nombreDiv.appendChild(tareaInput);
    nombreDiv.appendChild(tareaBtn);
    nombresDiv.appendChild(nombreDiv);
    nombreInput.value = "";
    guardarNombres();
  }
});

function cargarNombres() {
  const nombres = JSON.parse(localStorage.getItem("nombres"));
  if (nombres !== null) {
    nombres.forEach((nombre) => {
      const nombreDiv = document.createElement("div");
      nombreDiv.classList.add("nombre");
      const nombreH2 = document.createElement("h2");
      nombreH2.textContent = nombre.nombre;
      const eliminarBtn = document.createElement("button");
      eliminarBtn.classList.add("eliminar-btn");
      eliminarBtn.textContent = "Eliminar Mozo";
      eliminarBtn.addEventListener("click", () => {
        nombres.splice(nombres.indexOf(nombre), 1);
        guardarNombres();
        nombresDiv.removeChild(nombreDiv);
      });
      const tareasUl = document.createElement("ul");
      tareasUl.classList.add("tareas");
      nombre.tareas.forEach((tarea) => {
        const tareaLi = document.createElement("li");
        tareaLi.textContent = tarea.texto;
        if (tarea.completada) {
          tareaLi.classList.add("tachado");
          const tareaCheckbox = document.createElement("input");
          tareaCheckbox.type = "checkbox";
          tareaCheckbox.checked = true;
          tareaLi.insertBefore(tareaCheckbox, tareaLi.firstChild);
        } else {
          const tareaCheckbox = document.createElement("input");
          tareaCheckbox.type = "checkbox";
          tareaLi.insertBefore(tareaCheckbox, tareaLi.firstChild);
          tareaCheckbox.addEventListener("change", () => {
            tareaLi.classList.toggle("tachado");
            guardarNombres();
          });
        }
        tareasUl.appendChild(tareaLi);
      });
      const tareaInput = document.createElement("input");
      tareaInput.type = "text";
      tareaInput.placeholder = "Agregar tarea";
      const tareaBtn = document.createElement("button");
      tareaBtn.textContent = "Agregar";
      tareaBtn.addEventListener("click", () => {
        const tarea = tareaInput.value;
        if (tarea.trim() !== "") {
          const tareaLi = document.createElement("li");
          tareaLi.textContent = tarea;
          const tareaCheckbox = document.createElement("input");
          tareaCheckbox.type = "checkbox";
          tareaCheckbox.addEventListener("change", () => {
            tareaLi.classList.toggle("tachado");
            guardarNombres();
          });
          tareaLi.insertBefore(tareaCheckbox, tareaLi.firstChild);
          tareasUl.appendChild(tareaLi);
          tareaInput.value = "";
          guardarNombres();
        }
      });
      nombreDiv.appendChild(nombreH2);
      nombreDiv.appendChild(eliminarBtn);
      nombreDiv.appendChild(tareasUl);
      nombreDiv.appendChild(tareaInput);
      nombreDiv.appendChild(tareaBtn);
      nombresDiv.appendChild(nombreDiv);
    });
  }
}


function guardarNombres() {
const nombres = [];
const nombreDivs = document.querySelectorAll(".nombre");
nombreDivs.forEach((nombreDiv) => {
const nombre = nombreDiv.querySelector("h2").textContent;
const tareas = [];
const tareaLis = nombreDiv.querySelectorAll(".tareas li");
tareaLis.forEach((tareaLi) => {
const tarea = tareaLi.textContent;
const completada = tareaLi.classList.contains("tachado");
tareas.push({ texto: tarea, completada: completada });
});
nombres.push({ nombre: nombre, tareas: tareas });
});
localStorage.setItem("nombres", JSON.stringify(nombres));
}

cargarNombres();

