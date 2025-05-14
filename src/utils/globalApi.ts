import {cookies} from "next/headers";

export async function getGlobalData() {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/api/global?populate[favicon][fields][0]=url&populate[logo][fields][0]=url`;
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
    return await response.json();
}