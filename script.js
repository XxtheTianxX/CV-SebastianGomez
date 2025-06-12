document.addEventListener("DOMContentLoaded", () => {
  // === Menú hamburguesa ===
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // === Tema oscuro / claro ===
  const toggle = document.getElementById("toggle-dark");
  const html = document.documentElement;

  if (toggle) {
    // Aplicar tema guardado al cargar
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      toggle.innerText = "☀️"; // modo claro
    } else {
      toggle.innerText = "🌙"; // modo oscuro
    }

    toggle.addEventListener("click", () => {
      const isDark = html.classList.toggle("dark");
      toggle.innerText = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // === Inicializar animaciones AOS ===
  AOS.init();

  // === Cubo Rubik (Three.js) ===
  const container = document.getElementById("rubik-cube");
  if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    const cubeGroup = new THREE.Group();
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffffff, 0xffa500];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
          const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
          const cube = new THREE.Mesh(geometry, materials);
          cube.position.set(x, y, z);
          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      cubeGroup.rotation.x += 0.01;
      cubeGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  } else {
    console.warn("Elemento #rubik-cube no encontrado.");
  }
});
