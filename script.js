// Inicializar mapa
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.4326, lng: -99.1332 }, // Ejemplo: CDMX
        zoom: 12
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
    
    const descripcion = document.getElementById('descripcion').value;
    const esAnonimo = document.getElementById('anonimo').checked;
    
    // Obtener ubicación actual (simulada para el prototipo)
    const ubicacion = {
        lat: map.getCenter().lat() + (Math.random() - 0.5) * 0.01,
        lng: map.getCenter().lng() + (Math.random() - 0.5) * 0.01
    };

    // Crear marcador
    const marker = new google.maps.Marker({
        position: ubicacion,
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