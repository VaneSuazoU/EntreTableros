const params = new URLSearchParams(window.location.search);
const categoria = params.get('cat');

if (!categoria) {
  window.location.href = 'index.html';
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

document.getElementById('titulo-categoria').textContent = capitalizar(categoria);

fetch('games.json')
  .then(response => response.json())
  .then(data => {
    const juegos = data[categoria];
    const contenedor = document.getElementById('contenedor-juegos');

    if (!juegos) {
      contenedor.innerHTML = `<p>No hay juegos disponibles en esta categoría.</p>`;
      return;
    }

    juegos.forEach(juego => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image">
          <img src="${juego.imagen}" alt="${juego.nombre}" />
        </div>
        <h3>${juego.nombre}</h3>
        <p class="price">$${juego.precio.toLocaleString('es-CL')}</p>
        <p class="description">${juego.descripcion}</p>
        <div class="tags">
          <span class="tag">${juego.edad}<br /><small>Edad</small></span>
          <span class="tag">${juego.duracion} min<br /><small>Min</small></span>
          <span class="tag">${juego.jugadores}<br /><small>Jugadores</small></span>
        </div>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error cargando juegos:", error);
    document.getElementById('contenedor-juegos').innerHTML = `<p>Error al cargar los juegos.</p>`;
  });
