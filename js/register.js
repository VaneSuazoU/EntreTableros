document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre");
  const usuario = document.getElementById("usuario");
  const correo = document.getElementById("correo");
  const fecha = document.getElementById("fecha");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  let valido = true;

  function marcarError(campo, mensaje) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    if (!campo.nextElementSibling || !campo.nextElementSibling.classList.contains("invalid-feedback")) {
      const error = document.createElement("div");
      error.className = "invalid-feedback";
      error.innerText = mensaje;
      campo.parentNode.appendChild(error);
    } else {
      campo.nextElementSibling.innerText = mensaje;
    }
    valido = false;
  }

  function limpiarError(campo) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    if (campo.nextElementSibling && campo.nextElementSibling.classList.contains("invalid-feedback")) {
      campo.nextElementSibling.remove();
    }
  }

  // Validar nombre
  if (nombre.value.trim() === "") {
    marcarError(nombre, "Este campo es obligatorio.");
  } else {
    limpiarError(nombre);
  }

  // Validar usuario
  if (usuario.value.trim() === "") {
    marcarError(usuario, "Este campo es obligatorio.");
  } else {
    limpiarError(usuario);
  }

  // Validar correo
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo.value.trim())) {
    marcarError(correo, "Ingresa un correo válido.");
  } else {
    limpiarError(correo);
  }

  // Validar fecha y edad mínima de 13 años
  const hoy = new Date();
  const nacimiento = new Date(fecha.value);
  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  const dia = hoy.getDate() - nacimiento.getDate();
  const edadFinal = edad - (mes < 0 || (mes === 0 && dia < 0) ? 1 : 0);

  if (isNaN(nacimiento.getTime()) || edadFinal < 13) {
    marcarError(fecha, "Debes tener al menos 13 años.");
  } else {
    limpiarError(fecha);
  }

  // Validar contraseñas
  const pass = password.value.trim();
  const pass2 = password2.value.trim();
  const passRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;

  if (!passRegex.test(pass)) {
    marcarError(password, "Debe tener entre 6 y 18 caracteres, una mayúscula y un número.");
  } else {
    limpiarError(password);
  }

  if (pass !== pass2) {
    marcarError(password2, "Las contraseñas no coinciden.");
  } else if (pass2 !== "" && pass === pass2) {
    limpiarError(password2);
  }

  if (valido) {
    alert("¡Registro exitoso!");
    document.getElementById("registroForm").reset();

    // Limpiar visualmente después de enviar
    [nombre, usuario, correo, fecha, password, password2].forEach((campo) => {
      campo.classList.remove("is-valid");
    });
  }
});

// Limpieza visual adicional al presionar "Limpiar"
document.getElementById("registroForm").addEventListener("reset", () => {
  const campos = document.querySelectorAll(".form-control");
  campos.forEach((campo) => {
    campo.classList.remove("is-valid", "is-invalid");
    if (campo.nextElementSibling && campo.nextElementSibling.classList.contains("invalid-feedback")) {
      campo.nextElementSibling.remove();
    }
  });
});
