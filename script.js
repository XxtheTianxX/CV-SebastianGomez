// Inicializar animaciones AOS
AOS.init();

// Alternar modo oscuro
const toggle = document.getElementById("toggle-dark");
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

window.addEventListener("DOMContentLoaded", () => {
  if (window.cubing && cubing.defineCustomElements) {
    cubing.defineCustomElements();
  } else {
    console.error("Cubing.js no cargó correctamente.");
  }
});
