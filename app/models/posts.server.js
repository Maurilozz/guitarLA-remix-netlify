export async function getPosts() {
    const consulta = await fetch(
        `${process.env.API_URL}/posts?populate=imagen`
    );
    const resultado = await consulta.json();

    return await resultado;
}

export async function getPost(post) {
    const consulta = await fetch(
        `${process.env.API_URL}/posts?filters[url]=${post}&populate=imagen`)
    const resultado = await consulta.json();

    return await resultado;
}