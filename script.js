const inputBusqueda = document.querySelector("#input-post");
const btnBuscar = document.querySelector("#btn-buscar");
const contenedor = document.querySelector("#contenedor-master");

let postsArray = [];

async function getPosts() {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        postsArray = data;

        renderPosts(postsArray);

    }catch(error){
        console.error(error);
        contenedor.innerHTML = "<h2>Error al cargar el post</h2>"
    }
}

function renderPosts(posts){
    contenedor.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body.slice(0,100)}</p>
        `;

        contenedor.appendChild(card);
    })

}

inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value;

    const postsFiltrados = postsArray.filter(post => {
        return post.title.toLowerCase().includes(texto.toLowerCase());

    });

    renderPosts(postsFiltrados);
});

getPosts();