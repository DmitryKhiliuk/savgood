import {cookies} from "next/headers";
import {ProductList} from "@/components/productList";

async function getDataPage(slug: string) {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/api/pages?filters[slug][$eq]=${slug}`;
    const cookie = await cookies()

    const token = cookie.get('sgt');

    const response = await fetch(url, {
        cache: "no-cache",
        headers: {
            Authorization: `Bearer ${token?.value}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    return response.json();
}

export default async function Page(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const params = await props.params;
    const data = await getDataPage(params.slug);

    return (
        <>
            <div>{data ? data.data[0].title : '404'}</div>
            <ProductList slug={params.slug}/>
        </>
    );
}
