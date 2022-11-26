export async function getCurso() {
    const consulta = await fetch(`${process.env.API_URL}/curso?populate=imagen`)
    return await consulta.json()
}