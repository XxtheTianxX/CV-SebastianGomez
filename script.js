// Alternar visibilidad del menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});

// Inicializar animaciones AOS
AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle-dark");
  const html = document.documentElement;

  // Aplicar tema guardado al cargar
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
    toggle.innerText = "☀️"; // modo claro
  } else {
    toggle.innerText = "🌙"; // modo oscuro
  }

  toggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");

    // Cambiar icono
    toggle.innerText = isDark ? "☀️" : "🌙";

    // Guardar en localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});


// Esperar a que el DOM esté cargado
window.addEventListener("DOMContentLoaded", () => {
  // Inicializar cubing.js si está disponible (aunque ahora no sirve porque está caído)
  if (window.cubing && cubing.defineCustomElements) {
    cubing.defineCustomElements();
  } else {
    console.warn("Cubing.js no cargó correctamente o está temporalmente fuera de línea.");
  }

  // === Cubo Rubik con Three.js ===
  const container = document.getElementById("rubik-cube");
  if (!container) {
    console.warn("Elemento #rubik-cube no encontrado.");
    return;
  }

  // Escena
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Iluminación
  const light = new THREE.AmbientLight(0xffffff); // luz blanca
  scene.add(light);

  // Crear cubo Rubik como una agrupación de 27 cubitos
  const cubeGroup = new THREE.Group();
  const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffffff, 0xffa500]; // rojo, verde, azul, amarillo, blanco, naranja

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const materials = [
          new THREE.MeshBasicMaterial({ color: colors[0] }),
          new THREE.MeshBasicMaterial({ color: colors[1] }),
          new THREE.MeshBasicMaterial({ color: colors[2] }),
          new THREE.MeshBasicMaterial({ color: colors[3] }),
          new THREE.MeshBasicMaterial({ color: colors[4] }),
          new THREE.MeshBasicMaterial({ color: colors[5] }),
        ];
        const cube = new THREE.Mesh(geometry, materials);
        cube.position.set(x, y, z);
        cubeGroup.add(cube);
      }
    }
  }

  scene.add(cubeGroup);
  camera.position.z = 5;

  // Animación
  function animate() {
    requestAnimationFrame(animate);
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
});
