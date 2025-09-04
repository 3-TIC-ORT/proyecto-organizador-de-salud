/* Navegación con animación tipo “despliegue”.
   Funciona en Chrome/Edge modernos; si no, hace navegación normal. */
   (() => {
    const supports = typeof document.startViewTransition === "function" &&
                     !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    function go(url, dir) {
      if (!supports) { window.location.href = url; return; }
      document.documentElement.dataset.vtdir = dir || "forward";
      // Inicia la transición y navega
      document.startViewTransition(() => { window.location.href = url; });
    }
  
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a.vt-link");
      if (!a) return;
      if (a.origin !== location.origin) return; // solo mismo origen
      e.preventDefault();
      go(a.href, a.dataset.dir);
    });
  })();
  