document.addEventListener("DOMContentLoaded", () => {
  const graph = document.getElementById("graph");
  const yearFilter = document.getElementById("filter-year");
  const semFilter = document.getElementById("filter-semester");

  const savedState = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");

  const years = [...new Set(materias.map(m => m.anio))];
  years.forEach(y => {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y + "° año";
    yearFilter.appendChild(opt);
  });

  [1, 2].forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s + "° cuatr.";
    semFilter.appendChild(opt);
  });

  function isUnlocked(materia) {
    return materia.correlativas.every(c => savedState[c]?.aprobada);
  }

  function render() {
    graph.innerHTML = "";
    const yearVal = yearFilter.value;
    const semVal = semFilter.value;

    materias.forEach(m => {
      if ((yearVal && m.anio != yearVal) || (semVal && m.cuatrimestre != semVal)) return;

      const node = document.createElement("div");
      node.className = "node";
      node.dataset.area = m.area;

      const estado = savedState[m.codigo] || {};
      const desbloqueada = isUnlocked(m);
      if (estado.aprobada) node.classList.add("aprobada");

      node.innerHTML = `
        <strong>${m.nombre}</strong><br>
        <em>${m.codigo}</em><br>
        Año: ${m.anio} - ${m.cuatrimestre}°<br>
        ${!desbloqueada ? "<b>🔒 Correlativas no cumplidas</b><br>" : ""}
        <label>Nota final: <input type="number" min="0" max="10" step="0.1" value="${estado.nota || ""}"/></label><br>
        <label><input type="checkbox" ${estado.aprobada ? "checked" : ""}/> Aprobada</label>
      `;

      const checkbox = node.querySelector("input[type='checkbox']");
      const notaInput = node.querySelector("input[type='number']");

      checkbox.disabled = !desbloqueada;
      notaInput.disabled = !desbloqueada;

      checkbox.addEventListener("change", () => {
        savedState[m.codigo] = savedState[m.codigo] || {};
        savedState[m.codigo].aprobada = checkbox.checked;
        localStorage.setItem("estadoMaterias", JSON.stringify(savedState));
        render();
      });

      notaInput.addEventListener("input", () => {
        savedState[m.codigo] = savedState[m.codigo] || {};
        savedState[m.codigo].nota = notaInput.value;
        localStorage.setItem("estadoMaterias", JSON.stringify(savedState));
      });

      graph.appendChild(node);
    });
  }

  yearFilter.addEventListener("change", render);
  semFilter.addEventListener("change", render);

  render();
});
