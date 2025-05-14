import {Menu} from "@/components/header/menu";
import {cookies} from "next/headers";
import Image from "next/image";
import {Button} from "@/components/ui/button";

type HeaderPropsType = {
    logo: string
}


async function getDataPage() {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/api/pages`;

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

export const Header = async ({logo}: HeaderPropsType) => {

    const data = await getDataPage()

    const img = <div className={'w-[120px] h-[30px] relative'}>
        <Image
            src={logo}
            fill={true}
            alt="logo"
            className={'cover'}
            priority={true}
        />
    </div>

    return (
        <div className={'w-full h-[80px] flex justify-between items-center border-[1px] px-[10px] rounded-[10px] shadow-md sticky top-0 bg-white dark:bg-gray-800 z-50'}>
            <div className={'flex flex-col'}>
                {img}
                <div className={'text-[10px]'}>SAVGOOD.RU Официальный представитель</div>
            </div>
            <Menu data={data.data}/>
            <Button className={'cursor-pointer'}>Заказать звонок</Button>
        </div>
    );
};
