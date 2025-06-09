function cerrarSesion() {
    localStorage.removeItem('loggedUser');
    alert('Has cerrado sesión correctamente.');
    console.log('Sesión cerrada desde menú');
    window.location.href = 'index.html';
}
