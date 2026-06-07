import Image from "next/image";

export default async function Page() {
  const res = await fetch(
    "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/base-joconde-extrait/records?limit=20"
  );
  const data = await res.json();

  console.log(data);

  return (
    <>
      <h1>Hello Next.js !</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}