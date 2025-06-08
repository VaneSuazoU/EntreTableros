// Al cargar la página, inicializamos los usuarios testers si no existen
document.addEventListener('DOMContentLoaded', function() {
    inicializarUsuariosTest();

    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');

    switch (view) {
        case 'login':
            mostrarLogin();
            break;
        case 'register':
            mostrarRegistro();
            break;
        case 'profile':
            mostrarPerfil();
            break;
        case 'recover':
            mostrarRecuperar();
            break;
        default:
            mostrarLogin(); // por defecto mostramos login
            break;
    }
});

// -------------------------------------
// FUNCION PARA INICIALIZAR USUARIOS TESTERS
// -------------------------------------

function inicializarUsuariosTest() {
    if (!localStorage.getItem('users')) {
        const usuariosTest = [
            {
                nombre: 'Administrador',
                username: 'admin',
                email: 'admin@entretableros.cl',
                dob: '1980-01-01',
                password: 'Admin123',
                direccion: 'Oficina Central'
            },
            {
                nombre: 'Usuario Demo',
                username: 'user',
                email: 'user@entretableros.cl',
                dob: '1995-05-15',
                password: 'User1234',
                direccion: 'Calle Demo 456'
            }
        ];
        localStorage.setItem('users', JSON.stringify(usuariosTest));
        console.log('Usuarios testers inicializados:', usuariosTest);
    } else {
        console.log('Usuarios existentes en localStorage:', JSON.parse(localStorage.getItem('users')));
    }
}

// -------------------------------------
// MOSTRAR LOGIN
// -------------------------------------

function mostrarLogin() {
    document.getElementById('titulo-user').textContent = 'Iniciar Sesión';
    document.getElementById('contenedor-user').innerHTML = `
        <form id="loginForm" class="row g-3 needs-validation" novalidate>
            <div class="col-12">
                <label class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control" id="loginUsername" required />
            </div>
            <div class="col-12">
                <label class="form-label">Contraseña</label>
                <div class="input-group">
                    <input type="password" class="form-control" id="loginPassword" required />
                    <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('loginPassword')">👁️</button>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Ingresar</button>
                <a href="user.html?view=recover" class="btn btn-link">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="col-12">
                <div id="loginError" class="text-danger mt-2" style="display: none;"></div>
            </div>
        </form>
    `;

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('loginUsername');
        const password = document.getElementById('loginPassword');
        const loginError = document.getElementById('loginError');

        let valid = true;

        if (!validarCampoVacio(username)) valid = false;
        if (!validarCampoVacio(password)) valid = false;

        if (valid) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(u => u.username === username.value && u.password === password.value);

            if (foundUser) {
                localStorage.setItem('loggedUser', foundUser.username);
                console.log(`Usuario logueado: ${foundUser.username}`);
                window.location.href = 'user.html?view=profile';
            } else {
                loginError.style.display = 'block';
                loginError.innerHTML = `
                    Usuario o contraseña inválidos. 
                    ¿No tienes cuenta? <a href="user.html?view=register">Regístrate aquí</a>.
                `;
                console.log('Login fallido: usuario o contraseña incorrectos');
            }
        } else {
            loginError.style.display = 'none';
        }
    });
}

// -------------------------------------
// FUNCION PARA MOSTRAR/OCULTAR CONTRASEÑAS
// -------------------------------------

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    } else {
        input.type = "password";
        button.textContent = "👁️";
    }
}
// -------------------------------------
// MOSTRAR REGISTRO
// -------------------------------------

function mostrarRegistro() {
    document.getElementById('titulo-user').textContent = 'Registro de Usuario';
    document.getElementById('contenedor-user').innerHTML = `
        <form id="registroForm" class="row g-3 needs-validation" novalidate>
            <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="nombre" required />
            </div>
            <div class="col-md-6">
                <label for="usuario" class="form-label">Nombre de usuario</label>
                <input type="text" class="form-control" id="usuario" required />
            </div>
            <div class="col-md-6">
                <label for="correo" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="correo" required />
            </div>
            <div class="col-md-6">
                <label for="fecha" class="form-label">Fecha de nacimiento</label>
                <input type="date" class="form-control" id="fecha" required />
            </div>
            <div class="col-md-6">
                <label for="password" class="form-label">Contraseña</label>
                <div class="input-group">
                    <input type="password" class="form-control" id="password" required />
                    <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('password')">👁️</button>
                </div>
            </div>
            <div class="col-md-6">
                <label for="password2" class="form-label">Repetir contraseña</label>
                <div class="input-group">
                    <input type="password" class="form-control" id="password2" required />
                    <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('password2')">👁️</button>
                </div>
            </div>
            <div class="col-12">
                <label for="direccion" class="form-label">Dirección de despacho (opcional)</label>
                <input type="text" class="form-control" id="direccion" />
            </div>
            <div class="col-12 d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Registrar</button>
                <button type="reset" class="btn btn-secondary">Limpiar</button>
            </div>
        </form>
    `;

    document.getElementById('registroForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre');
        const usuario = document.getElementById('usuario');
        const correo = document.getElementById('correo');
        const fecha = document.getElementById('fecha');
        const password = document.getElementById('password');
        const password2 = document.getElementById('password2');
        const direccion = document.getElementById('direccion');

        let valid = true;

        if (!validarCampoVacio(nombre)) valid = false;
        if (!validarCampoVacio(usuario)) valid = false;
        if (!validarEmail(correo)) valid = false;
        if (!validarEdad(fecha)) valid = false;
        if (!validarPassword(password)) valid = false;
        if (!validarPasswordIgual(password, password2)) valid = false;

        if (valid) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({
                nombre: nombre.value,
                username: usuario.value,
                email: correo.value,
                dob: fecha.value,
                password: password.value,
                direccion: direccion.value
            });

            localStorage.setItem('users', JSON.stringify(users));
            console.log('Nuevo usuario registrado:', usuario.value);
            alert(`¡Bienvenido/a ${nombre.value}! Tu cuenta se ha registrado con éxito. Ahora puedes iniciar sesión.`);
            window.location.href = 'user.html?view=login';
        }
    });
}

// -------------------------------------
// MOSTRAR PERFIL
// -------------------------------------

function mostrarPerfil() {
    const loggedUsername = localStorage.getItem('loggedUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === loggedUsername);

    if (!user) {
        alert('No hay usuario logueado. Por favor inicie sesión.');
        window.location.href = 'user.html?view=login';
        return;
    }

    console.log('Perfil mostrado para usuario:', user.username);

    document.getElementById('titulo-user').innerHTML = `
        Perfil de Usuario 
        <button id="editProfileBtn" class="btn btn-sm btn-outline-secondary ms-2" title="Editar perfil">
            ✏️
        </button>
    `;

    document.getElementById('contenedor-user').innerHTML = `
        <form id="profileForm" class="row g-3 needs-validation" novalidate>
            <div class="col-md-6">
                <label class="form-label">Nombre completo</label>
                <input type="text" class="form-control" id="profileNombre" value="${user.nombre}" readonly>
            </div>
            <div class="col-md-6">
                <label class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="profileEmail" value="${user.email}" readonly>
            </div>
            <div class="col-md-6">
                <label class="form-label">Fecha de nacimiento</label>
                <input type="date" class="form-control" id="profileDob" value="${user.dob}" readonly>
            </div>
            <div class="col-md-6">
                <label class="form-label">Dirección de despacho</label>
                <input type="text" class="form-control" id="profileDireccion" value="${user.direccion}" readonly>
            </div>
            <div class="col-12 d-none" id="profileSaveSection">
                <button type="submit" class="btn btn-primary me-2">Guardar cambios</button>
                <button type="button" class="btn btn-secondary" id="cancelEditBtn">Cancelar</button>
            </div>
            <div class="col-12 mt-3">
                <button id="logoutBtn" type="button" class="btn btn-danger">Cerrar sesión</button>
            </div>
        </form>
    `;

    // Habilitar edición
    document.getElementById('editProfileBtn').addEventListener('click', function() {
        document.getElementById('profileNombre').removeAttribute('readonly');
        document.getElementById('profileEmail').removeAttribute('readonly');
        document.getElementById('profileDob').removeAttribute('readonly');
        document.getElementById('profileDireccion').removeAttribute('readonly');
        document.getElementById('profileSaveSection').classList.remove('d-none');
    });

    // Cancelar edición
    document.getElementById('cancelEditBtn').addEventListener('click', function() {
        mostrarPerfil();
    });

    // Guardar cambios
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('profileNombre');
        const email = document.getElementById('profileEmail');
        const dob = document.getElementById('profileDob');
        const direccion = document.getElementById('profileDireccion');

        let valid = true;

        if (!validarCampoVacio(nombre)) valid = false;
        if (!validarEmail(email)) valid = false;
        if (!validarEdad(dob)) valid = false;

        if (valid) {
            user.nombre = nombre.value;
            user.email = email.value;
            user.dob = dob.value;
            user.direccion = direccion.value;

            localStorage.setItem('users', JSON.stringify(users));

            console.log('Perfil actualizado:', user.username);
            alert('Perfil actualizado exitosamente.');
            mostrarPerfil();
        }
    });

    // Cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedUser');
        console.log('Sesión cerrada');
        window.location.href = 'user.html?view=login';
    });
}
// -------------------------------------
// MOSTRAR RECUPERAR CONTRASEÑA
// -------------------------------------

function mostrarRecuperar() {
    document.getElementById('titulo-user').textContent = 'Recuperar Contraseña';
    document.getElementById('contenedor-user').innerHTML = `
        <form id="recoverForm" class="row g-3 needs-validation" novalidate>
            <div class="col-12">
                <label class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" id="recoverEmail" required />
            </div>
            <div class="col-12">
                <label class="form-label">Nueva contraseña</label>
                <div class="input-group">
                    <input type="password" class="form-control" id="recoverPassword" required />
                    <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('recoverPassword')">👁️</button>
                </div>
            </div>
            <div class="col-12">
                <label class="form-label">Repetir nueva contraseña</label>
                <div class="input-group">
                    <input type="password" class="form-control" id="recoverPassword2" required />
                    <button type="button" class="btn btn-outline-secondary" onclick="togglePasswordVisibility('recoverPassword2')">👁️</button>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Actualizar contraseña</button>
            </div>
        </form>
    `;

    document.getElementById('recoverForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('recoverEmail');
        const password = document.getElementById('recoverPassword');
        const password2 = document.getElementById('recoverPassword2');

        let valid = true;

        if (!validarEmail(email)) valid = false;
        if (!validarPassword(password)) valid = false;
        if (!validarPasswordIgual(password, password2)) valid = false;

        if (valid) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email.value);

            if (user) {
                user.password = password.value;
                localStorage.setItem('users', JSON.stringify(users));
                console.log('Contraseña actualizada para:', user.username);
                alert('Contraseña actualizada exitosamente. Ahora puede iniciar sesión.');
                window.location.href = 'user.html?view=login';
            } else {
                alert('No existe un usuario registrado con ese correo.');
                console.log('Recuperar contraseña fallido: correo no encontrado');
            }
        }
    });
}

// -------------------------------------
// FUNCIONES DE VALIDACIÓN REUTILIZABLES
// -------------------------------------

function mostrarErrorFeedback(input, mostrar, mensaje = '') {
    let feedback = input.nextElementSibling;
    
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.parentNode.insertBefore(feedback, input.nextSibling);
    }

    if (mostrar) {
        input.classList.add('is-invalid');
        feedback.textContent = mensaje;
        feedback.style.display = 'block';
    } else {
        input.classList.remove('is-invalid');
        feedback.textContent = '';
        feedback.style.display = 'none';
    }
}

function validarCampoVacio(input) {
    if (input.value.trim() === '') {
        mostrarErrorFeedback(input, true, 'Este campo es obligatorio.');
        return false;
    } else {
        mostrarErrorFeedback(input, false);
        return true;
    }
}

function validarEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value.trim())) {
        mostrarErrorFeedback(input, true, 'Ingrese un email válido.');
        return false;
    } else {
        mostrarErrorFeedback(input, false);
        return true;
    }
}

function validarEdad(input) {
    const birthDate = new Date(input.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    const isOldEnough = age > 13 || (age === 13 && (m > 0 || (m === 0 && today.getDate() >= birthDate.getDate())));

    if (!isOldEnough) {
        mostrarErrorFeedback(input, true, 'Debe tener al menos 13 años.');
        return false;
    } else {
        mostrarErrorFeedback(input, false);
        return true;
    }
}

function validarPassword(input) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    if (!passwordRegex.test(input.value)) {
        mostrarErrorFeedback(input, true, 'Contraseña entre 6-18 caracteres, con al menos una mayúscula y un número.');
        return false;
    } else {
        mostrarErrorFeedback(input, false);
        return true;
    }
}

function validarPasswordIgual(passwordInput, confirmPasswordInput) {
    if (passwordInput.value !== confirmPasswordInput.value) {
        mostrarErrorFeedback(confirmPasswordInput, true, 'Las contraseñas deben coincidir.');
        return false;
    } else {
        mostrarErrorFeedback(confirmPasswordInput, false);
        return true;
    }
}
