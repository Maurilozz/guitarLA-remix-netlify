export async function getGuitarras() {
    const consulta = await fetch(
        `${process.env.API_URL}/guitarras?populate=imagen` // VARIABLE DE ENTORNO
    );
    const resultado = await consulta.json();

    return await resultado;
}

export async function getGuitarra(guitarra) {
    const consulta = await fetch(
        `${process.env.API_URL}/guitarras?filters[url]=${guitarra}&populate=imagen`)
    const resultado = await consulta.json();

    return await resultado;
}