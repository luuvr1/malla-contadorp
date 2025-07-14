const materias = [
  // AÑO 1
  { id: "intro_economia", nombre: "Introducción a la economía", cuatri: "1-1", anio: 1 },
  { id: "admin", nombre: "Principios de administración", cuatri: "1-1", anio: 1 },
  { id: "mat1", nombre: "Matemática 1", cuatri: "1-1", anio: 1, desbloquea: ["mat2"] },
  { id: "cont1", nombre: "Contabilidad 1", cuatri: "1-2", anio: 1 },
  { id: "hist1", nombre: "Historia Econ. y Soc. 1", cuatri: "1-2", anio: 1 },
  { id: "socio", nombre: "Sociología", cuatri: "1-2", anio: 1 },
  { id: "mat2", nombre: "Matemática 2", cuatri: "1-2", anio: 1 },

  // AÑO 2
  { id: "macro1", nombre: "Macroeconomía 1", cuatri: "2-1", anio: 2, requiere: ["intro_economia", "mat2"] },
  { id: "func_org", nombre: "Funciones organizacionales", cuatri: "2-1", anio: 2, requiere: ["admin"] },
  { id: "hist2", nombre: "Historia Econ. y Soc. 2", cuatri: "2-1", anio: 2, requiere: ["hist1"] },
  { id: "const", nombre: "Derecho Constitucional", cuatri: "2-1", anio: 2 },
  { id: "adm", nombre: "Derecho Administrativo", cuatri: "2-1", anio: 2 },
  { id: "cont2", nombre: "Contabilidad 2", cuatri: "2-2", anio: 2, requiere: ["cont1"] },
  { id: "micro1", nombre: "Microeconomía 1", cuatri: "2-2", anio: 2, requiere: ["intro_economia", "mat2"] },
  { id: "estad", nombre: "Estadística", cuatri: "2-2", anio: 2, requiere: ["mat2"] },

  // AÑO 3
  { id: "cont3", nombre: "Contabilidad 3", cuatri: "3-1", anio: 3, requiere: ["cont2"] },
  { id: "sistemas", nombre: "Sistemas de Información", cuatri: "3-1", anio: 3, requiere: ["cont1", "func_org"] },
  { id: "mat_fin", nombre: "Matemática Financiera", cuatri: "3-1", anio: 3, requiere: ["estad"] },
  { id: "privado", nombre: "Derecho Privado", cuatri: "3-1", anio: 3, requiere: ["const", "adm"] },
  { id: "costos", nombre: "Costos", cuatri: "3-2", anio: 3, requiere: ["cont2"] },
  { id: "eco_pub", nombre: "Economía y Org. del Sector Público", cuatri: "3-2", anio: 3, requiere: ["const", "macro1"] },
  { id: "sociedades", nombre: "Sociedades", cuatri: "3-2", anio: 3, requiere: ["privado"] },
  { id: "metodologia", nombre: "Metodología de las Ciencias Sociales", cuatri: "3-2", anio: 3, requiere: ["estad"] },

  // AÑO 4
  { id: "analisis", nombre: "Análisis Econ. y Financiero", cuatri: "4-1", anio: 4, requiere: ["func_org", "macro1", "cont3", "mat_fin", "costos"] },
  { id: "impuestos1", nombre: "Impuestos 1", cuatri: "4-1", anio: 4, requiere: ["adm", "cont3", "eco_pub"] },
  { id: "laboral", nombre: "Derecho del trabajo y seg. social", cuatri: "4-1", anio: 4, requiere: ["adm", "privado"] },
  { id: "personal", nombre: "Adm. de Personal", cuatri: "4-2", anio: 4, requiere: ["func_org"] },
  { id: "comercializacion", nombre: "Adm. Comercialización", cuatri: "4-2", anio: 4, requiere: ["func_org", "macro1", "estad"] },
  { id: "auditoria", nombre: "Auditoría", cuatri: "4-2", anio: 4, requiere: ["cont3", "costos", "sistemas", "sociedades"] },
  { id: "etica", nombre: "Ética y Resp. Social", cuatri: "4-2", anio: 4 },

  // AÑO 5
  { id: "impuestos2", nombre: "Impuestos 2", cuatri: "5-1", anio: 5, requiere: ["impuestos1"] },
  { id: "info_control", nombre: "Info para Control Gerencial", cuatri: "5-1", anio: 5, requiere: ["sistemas", "analisis"] },
  { id: "emp_crisis", nombre: "Empresas en crisis", cuatri: "5-1", anio: 5, requiere: ["info_control", "analisis", "laboral", "auditoria"] },
  { id: "practica", nombre: "Práctica Profesional", cuatri: "5-2", anio: 5, requiere: ["auditoria", "emp_crisis", "impuestos2"] },
  { id: "electiva", nombre: "Electiva", cuatri: "5-2", anio: 5 },
  { id: "optativas", nombre: "Optativas", cuatri: "5-2", anio: 5 },
  { id: "normas", nombre: "Normas Contables Comparadas", cuatri: "5-2", anio: 5, requiere: ["impuestos2", "auditoria"] },
  { id: "estado", nombre: "Org. y Adm. del Estado", cuatri: "5-2", anio: 5, requiere: ["eco_pub", "impuestos1"] },
  { id: "contratos", nombre: "Contratos Especiales", cuatri: "5-2", anio: 5 },
  { id: "creacion", nombre: "Creación de Empresas", cuatri: "5-2", anio: 5, requiere: ["analisis", "laboral", "emp_crisis", "comercializacion"] },
  { id: "proyectos", nombre: "Análisis y Eval. de Proyectos", cuatri: "5-2", anio: 5, requiere: ["analisis"] },
];

const estado = JSON.parse(localStorage.getItem("materias_aprobadas") || "{}");

function crearMalla() {
  const contenedor = document.getElementById("malla");
  const agrupadas = {};

  materias.forEach(m => {
    if (!agrupadas[m.cuatri]) agrupadas[m.cuatri] = [];
    agrupadas[m.cuatri].push(m);
  });

  Object.keys(agrupadas).sort().forEach(cuatri => {
    const bloque = document.createElement("div");
    bloque.className = `bloque año${agrupadas[cuatri][0].anio}`;
    const titulo = document.createElement("h2");
    titulo.textContent = `${agrupadas[cuatri][0].anio}° Año - ${cuatri.endsWith("1") ? "1º" : "2º"} Cuatrimestre`;
    const materiasDiv = document.createElement("div");
    materiasDiv.className = "materias";

    agrupadas[cuatri].forEach(m => {
      const btn = document.createElement("div");
      btn.className = "materia";
      btn.id = m.id;
      btn.textContent = m.nombre;
      if (estado[m.id]) btn.classList.add("aprobada");
      else if (m.requiere && !m.requiere.every(r => estado[r])) btn.classList.add("bloqueada");

      btn.addEventListener("click", () => {
        if (btn.classList.contains("bloqueada")) return;
        btn.classList.toggle("aprobada");
        estado[m.id] = btn.classList.contains("aprobada");
        localStorage.setItem("materias_aprobadas", JSON.stringify(estado));
        location.reload(); // actualizar correlativas
      });

      materiasDiv.appendChild(btn);
    });

    bloque.appendChild(titulo);
    bloque.appendChild(materiasDiv);
    contenedor.appendChild(bloque);
  });
}

crearMalla();
