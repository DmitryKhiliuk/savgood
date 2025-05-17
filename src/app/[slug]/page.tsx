import {cookies} from "next/headers";
import {ProductList} from "@/components/productList";
import Image from "next/image";

async function getDataPage(slug: string) {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/api/pages?filters[slug][$eq]=${slug}&populate[image][fields]=url`;
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
        params: Promise<{ slug: string }>,
        searchParams: Promise<{ page: string }>
    }
) {
    const apiUrl = process.env.API_URL
    const params = await props.params;
    const searchParams = await props.searchParams
    const data = await getDataPage(params.slug);
    console.log(`${apiUrl}${data.data[0].image.url}`)
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center my-5">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{data.data[0].title}</h2>
                    <p className="text-gray-600">{data.data[0].description}</p>
                </div>
                <div className="relative aspect-video">
                    <Image
                        src={`${apiUrl}${data.data[0].image.url}`}
                        fill
                        alt={data.data[0].title}
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            </div>
            <ProductList slug={params.slug} currentPage={searchParams.page ? +searchParams.page : 1}/>
        </>
    );
}
