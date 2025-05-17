

export async function getGlobalData(token: string) {
    const apiUrl = process.env.API_URL;
    const res = await fetch(`${apiUrl}/api/global?populate[favicon][fields][0]=url&populate[logo][fields][0]=url`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 }, // ISR / кеш
    });

    if (!res.ok) {
        throw new Error("Failed to fetch global data");
    }

    return await res.json();
}