let map;
let markers = [];
let selectedLocation = null;

// Inicializar mapa
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.4326, lng: -99.1332 }, // Ejemplo: CDMX
        zoom: 12
    });

    // Escuchar clics en el mapa
    map.addListener('click', (event) => {
        if (selectedLocation) {
            selectedLocation.setMap(null); // Eliminar marcador anterior
        }
        selectedLocation = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: 'Ubicación del bache'
        });

        // Mostrar formulario
        document.getElementById('reportForm').style.display = 'block';
        document.getElementById('ubicacion').value = event.latLng.toString();
    });
}

// Manejar el formulario
document.getElementById('reportBtn').addEventListener('click', () => {
    document.getElementById('reportForm').style.display = 'block';
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('reportForm').style.display = 'none';
});

// Enviar reporte
document.getElementById('bacheForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const ubicacion = document.getElementById('ubicacion').value;
    const descripcion = document.getElementById('descripcion').value;
    const esAnonimo = document.getElementById('anonimo').checked;
    
    // Crear marcador
    const marker = new google.maps.Marker({
        position: JSON.parse(ubicacion.replace('(', '[').replace(')', ']')),
        map: map,
        title: `Bache reportado: ${descripcion}`
    });

    markers.push(marker);
    
    // Agregar a la lista
    const reporteHTML = `
        <div class="list-group-item">
            <h6>${descripcion}</h6>
            <small>${esAnonimo ? 'Anónimo' : 'Usuario'} - ${new Date().toLocaleDateString()}</small>
        </div>
    `;
    
    document.getElementById('reportes').insertAdjacentHTML('afterbegin', reporteHTML);
    
    // Resetear formulario
    document.getElementById('bacheForm').reset();
    document.getElementById('reportForm').style.display = 'none';
    
    // Mostrar confirmación
    alert('¡Reporte enviado exitosamente!');
});

// Cargar reportes guardados (ejemplo)
window.onload = () => {
    if (localStorage.getItem('reportes')) {
        document.getElementById('reportes').innerHTML = localStorage.getItem('reportes');
    }
};
