export async function GET() {
    const response = await fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/base-joconde-extrait/records?limit=20");
    const data = await response.json();

    return Response.json(data);
}