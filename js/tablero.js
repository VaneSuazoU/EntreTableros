document.addEventListener('DOMContentLoaded', async function () {
    const loggedUsername = localStorage.getItem('loggedUser');
    if (!loggedUsername || loggedUsername.trim() === '') {
        alert('Debe iniciar sesión para acceder al Tablero Social.');
        window.location.href = 'user.html?view=login';
        return;
    }

    console.log(`✅ Usuario logueado: ${loggedUsername}`);

    await cargarPostsDesdeJSON();

    mostrarPosts();
});

async function cargarPostsDesdeJSON() {
    try {
        const response = await fetch('tablero_social.json');
        if (response.ok) {
            const jsonPosts = await response.json();
            console.log('✅ Posts del JSON:', jsonPosts);

            const existingPosts = obtenerPosts();
            console.log('📦 Posts existentes en localStorage:', existingPosts);

            const existingHashes = new Set(existingPosts.map(post => post.username + post.date + post.content));

            const newPosts = jsonPosts.filter(post => {
                const hash = post.username + post.date + post.content;
                return !existingHashes.has(hash);
            });

            console.log('➕ Nuevos posts a agregar:', newPosts);

            const allPosts = existingPosts.concat(newPosts);

            guardarPosts(allPosts);

            console.log('✅ Posts combinados guardados en localStorage:', allPosts);
        } else {
            console.error('❌ Error al cargar el JSON:', response.status);
        }
    } catch (error) {
        console.error('❌ Error al cargar el JSON:', error);
    }
}

function obtenerPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    return posts;
}

function guardarPosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
    console.log("💾 Posts guardados en localStorage:", posts);
}

function mostrarPosts() {
    const postsContainer = document.getElementById('postsContainer');
    const posts = obtenerPosts();

    postsContainer.innerHTML = '';
    console.log("🧾 Mostrando publicaciones:", posts);

    // Ordenar por fecha (más reciente primero)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Mostrar contador de publicaciones
    document.getElementById('contadorPublicaciones').textContent = `Total publicaciones: ${posts.length}`;

    // Obtener info de usuario actual y rol
    const loggedUsername = localStorage.getItem('loggedUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.username === loggedUsername);
    const isAdmin = currentUser?.rol === 'Admin';

    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'post';

        postCard.innerHTML = `
            <div class="post-header">
                <strong>${post.username}</strong> 
                <span class="post-date">${new Date(post.date).toLocaleString()}</span>
            </div>
            <div class="post-message">
                ${post.content}
            </div>
            <div class="post-footer">
                <button class="like-button" onclick="darLike(${index})">👍</button>
                <span class="like-count">${post.likes}👍</span>
                ${(isAdmin || post.username === loggedUsername) ? `
                    <button class="delete-button" onclick="eliminarPost(${index})">🗑️</button>
                ` : ''}
            </div>
        `;

        postsContainer.appendChild(postCard);
    });
}

document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const postContent = document.getElementById('postContent');
    const postFormAlert = document.getElementById('postFormAlert');

    if (postContent.value.trim() === '') {
        postContent.classList.add('is-invalid');
        postFormAlert.classList.remove('d-none');
        postFormAlert.textContent = 'El mensaje no puede estar vacío.';
        return;
    } else {
        postContent.classList.remove('is-invalid');
        postFormAlert.classList.add('d-none');
    }

    const loggedUsername = localStorage.getItem('loggedUser');
    if (!loggedUsername || loggedUsername.trim() === '') {
        alert('Debe iniciar sesión para publicar.');
        window.location.href = 'user.html?view=login';
        return;
    }

    const newPost = {
        username: loggedUsername,
        date: new Date().toISOString(),
        content: postContent.value.trim(),
        likes: 0
    };

    const posts = obtenerPosts();
    posts.push(newPost);
    guardarPosts(posts);

    sumarPuntoUsuario(loggedUsername);

    postContent.value = '';
    console.log("📝 Nuevo post creado:", newPost);

    mostrarPosts();
});

function darLike(indexInReverse) {
    const posts = obtenerPosts();
    const index = posts.length - 1 - indexInReverse;
    posts[index].likes += 1;
    console.log(`👍 Like dado a publicación #${index}:`, posts[index]);
    guardarPosts(posts);
    mostrarPosts();
}

function eliminarPost(indexInReverse) {
    const posts = obtenerPosts();
    const index = posts.length - 1 - indexInReverse;

    const postEliminado = posts[index];
    if (confirm(`¿Estás segura que quieres eliminar este post de "${postEliminado.username}"?`)) {
        posts.splice(index, 1); // eliminar el post
        guardarPosts(posts);
        console.log(`🗑️ Post eliminado:`, postEliminado);
        mostrarPosts();
    }
}

function sumarPuntoUsuario(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    if (user) {
        if (!user.puntos) {
            user.puntos = 0;
        }
        user.puntos += 1;

        localStorage.setItem('users', JSON.stringify(users));
        console.log(`⭐ Punto sumado a ${user.username}. Total puntos: ${user.puntos}`);
    }
}
