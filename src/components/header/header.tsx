import {Menu} from "@/components/header/menu";
import {cookies} from "next/headers";
import {Button} from "@/components/ui/button";
import {MenuMobile} from "@/components/header/menuMobile";
import {Logo} from "@/components/logo/logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {CallForm} from "@/components/callForm";

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


    return (
        <div
            className={'w-full h-[80px] flex justify-between items-center border-[1px] px-[10px] rounded-[10px] shadow-md sticky top-0 bg-white dark:bg-gray-800 z-50'}>
            <Logo logo={logo}/>
            <Menu data={data.data}/>
            <Dialog>
                <DialogTrigger asChild><Button className={'cursor-pointer'}>Заказать звонок</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Заказать звонок</DialogTitle>
                        <DialogDescription>
                           Оставьте свои данные и мы обязательно с вами свяжемся.
                        </DialogDescription>
                    </DialogHeader>
                    <CallForm />
                </DialogContent>
            </Dialog>
            <MenuMobile data={data.data}/>
        </div>
    );
};
