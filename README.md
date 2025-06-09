
# 🌌 EntreTableros - Tienda de Juegos de Mesa

**EntreTableros** es una tienda ficticia de juegos de mesa con un diseño galáctico, moderno y amigable. Este proyecto fue desarrollado como parte de la asignatura *Desarrollo Full Stack II* para practicar estructura HTML, diseño CSS, responsividad, manipulación del DOM con JavaScript, y gestión de sesiones y roles.

---

## 🎯 Objetivo

Ofrecer una experiencia visual atractiva e interactiva para que los usuarios puedan:

- Explorar juegos de mesa por categorías
- Registrarse e iniciar sesión como usuarios frecuentes
- Participar en un **Tablero Social** (foro)
- Acumular puntos por participación
- Desbloquear niveles y descuentos
- Gestionar su perfil

---

## 🧹 Funcionalidades

- Carga dinámica de juegos desde `games.json` en una sola página (`category.html`)
- Navegación por categoría a través de parámetros en la URL (`?cat=...`)
- Registro, inicio de sesión, recuperación de contraseña
- Gestión de perfil editable
- Sistema de roles **Admin / Cliente**
- Validación de formularios en todas las vistas
- Persistencia de usuarios y publicaciones en `localStorage`
- **Tablero Social**:
  - Publicar mensajes
  - Dar "Like" a publicaciones
  - Eliminar publicaciones (Admin → todas, Cliente → propias)
  - Acumulación de puntos por participación
  - Niveles de usuario (Básico, Bronce, Plata, Oro)
  - Contador de publicaciones
  - Validación de sesión: no permite ir a login/registro si ya hay sesión activa
  - Cierre de sesión desde menú y perfil
- Diseño responsivo con Bootstrap
- Estructura modular y ordenada

---

## 🎨 Proceso Creativo

El diseño se ideó en Figma y se documentó en la carpeta `/prototipo`, incluyendo:

- Paleta de colores principal
- Prototipo de página de inicio y tarjetas por categoría

---

### 📷 Vista del prototipo

#### 🎨 Paleta de colores
![Paleta de colores y elección de marca](prototipo/paletaymarca.PNG)

#### 🏠 Página de inicio
![Página de inicio](prototipo/home.PNG)

#### 🗂️ Tarjetas por categoría
![Tarjetas por categoría](prototipo/categorias.png)

---

## 🖼️ Diseño

- Colores galácticos: violeta, turquesa, blanco
- Tipografías: `Orbitron` (logo), `Inter` (contenido)
- Efectos translúcidos con fondo galáctico
- Responsividad mediante Bootstrap y Flexbox

---

## 📂 Estructura del Proyecto

```
EntreTableros/
├── index.html
├── category.html
├── user.html
├── tablero_social.html
├── games.json
├── tablero_social.json
├── styles.css
├── js/
│   ├── category.js
│   ├── common.js
│   ├── user.js
│   └── tablero.js
├── images/
│   ├── buscar.png
│   ├── carrito.png
│   ├── foto_perfil_default.png
│   └── ...iconos por categoría
├── games/
│   └── ...imagenes de juegos
└── prototipo/
    ├── paletaymarca.PNG
    ├── home.PNG
    └── categorias.png
```

## 📝 Validaciones

### Formulario de registro (`register.html`)

- Todos los campos obligatorios excepto dirección
- Correo válido
- Contraseñas iguales, con al menos una mayúscula, un número y longitud entre 6-18 caracteres
- Edad mínima: 13 años
- Validación visual con Bootstrap

### Formularios del foro

- Publicar mensaje: validación visual si el campo está vacío
- No permite publicar vacío
- Comentarios y likes funcionales

---

## 👥 Gestión de Sesiones y Roles

- Sistema de login / logout con persistencia en `localStorage`
- Validación en todas las vistas:
  - No permite acceder a login/registro con sesión activa
  - Redirige a perfil
- Menú con opción **Cerrar sesión**
- Roles:
  - **Admin**: eliminar todas las publicaciones, gestionar todo
  - **Cliente**: eliminar solo sus propias publicaciones

---

## 🏅 Niveles y Puntos

- Cada participación en el foro suma puntos
- Los puntos se reflejan en el perfil del usuario
- Niveles:
  - 0-9 pts → Nivel Básico (sin descuento)
  - 10-19 pts → Nivel Bronce (5%)
  - 20-49 pts → Nivel Plata (10%)
  - 50+ pts → Nivel Oro (20%)

---

## 💻 Tecnologías Usadas

- HTML5 + CSS3
- Bootstrap 5.3
- JavaScript (DOM, validaciones, `localStorage`)

---

## ✅ Pendientes / Posibles Extensiones

- Página de “Ofertas” con productos destacados
- Carrito funcional
- Recomendador de juegos basado en puntos / preferencias
- Panel de administración más completo
- Mejoras visuales en la experiencia del Tablero Social (animaciones)

---

## 👩‍💻 Desarrollado por

**Vanessa Suazo**Proyecto académico – *Desarrollo Full Stack II* – 2025

---

