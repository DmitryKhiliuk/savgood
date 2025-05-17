import React from 'react';
import {cookies} from "next/headers";
import {ProductCard} from "@/components/productCard";

type ProductListPropsType = {
    slug: string
}

async function getProducts(slug: string) {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/api/products?populate[char][populate]=*&populate[image][fields]=url&filters[type][$eq]=${slug}`;
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
export const ProductList = async ({slug}: ProductListPropsType) => {

    const data = await getProducts(slug)

    console.log(typeof data)

    return (
        <div>
            {data.data.map((el: any) => {
                return <ProductCard key={el.id} data={el}/>
            })}
        </div>
    );
};

