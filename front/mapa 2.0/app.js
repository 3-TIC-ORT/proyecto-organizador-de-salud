// Datos de ejemplo (pueden ampliarse o conectarse dinámicamente)
const centros = [
    { nombre: "Hospital Álvarez (Flores)", lat: -34.6065, lng: -58.453 },
    { nombre: "Hospital de Clínicas (Recoleta)", lat: -34.587, lng: -58.395 },
    { nombre: "CeSAC 38 (Almagro)", lat: -34.619, lng: -58.416 },
    { nombre: "Hospital Muñiz (Parque Patricios)", lat: -34.620, lng: -58.395 },
    { nombre: "Hospital Vélez Sarsfield (Balvanera)", lat: -34.608, lng: -58.431 }
  ];
  
  // Inicializar mapa centrado en CABA
  const map = L.map('map').setView([-34.6037, -58.3816], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Agregar centros
  centros.forEach((centro) => {
    const marker = L.marker([centro.lat, centro.lng]).addTo(map)
      .bindPopup(`<b>${centro.nombre}</b>`);
  
    const li = document.createElement('li');
    li.textContent = centro.nombre;
    li.addEventListener('click', () => {
      map.setView([centro.lat, centro.lng], 15);
      marker.openPopup();
    });
    document.getElementById('location-list').appendChild(li);
  });
  