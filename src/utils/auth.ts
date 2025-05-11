export async function loginToStrapi() {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    const apiUrl = process.env.API_URL;

    if (!username || !password || !apiUrl) {
        throw new Error("Missing API credentials");
    }

    const res = await fetch(`${apiUrl}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({identifier: username, password}),
    });

    if (!res.ok) {
        throw new Error(`Failed to login: ${res.statusText}`);
    }

    const data = await res.json();
    console.log('jwt', data.jwt)
    return data.jwt;
}