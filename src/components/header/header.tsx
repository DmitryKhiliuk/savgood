import {Menu} from "@/components/header/menu";
import {cookies} from "next/headers";


async function getDataPage() {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/pages`;

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

export const Header = async () => {

    const data = await getDataPage()

    //console.log(data.data)

    return (
        <div >
           <Menu data={data.data}/>
        </div>
    );
};
