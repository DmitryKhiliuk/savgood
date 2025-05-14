'use client'
import {BurgerButton} from "@/components/header/burgerButton";
import * as React from "react";
import {useState} from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link";

type MenuMobilePropsType = {
    data: { [key: string]: string }[]
}

export const MenuMobile = ({data}: MenuMobilePropsType) => {
    const [open, setOpen] = useState(false);


    return (
        <div className={'xl:hidden'}>
            <Drawer open={open} onOpenChange={setOpen} direction="left">
                <DrawerTrigger asChild>
                    <div>
                        <BurgerButton open={open} setOpen={setOpen}/>
                    </div>
                </DrawerTrigger>

                <DrawerContent className="!h-screen !mt-0 !w-screen">
                    <DrawerHeader>
                        <div className={'flex justify-between'}>
                            <div>
                                <DrawerTitle>Меню</DrawerTitle>
                                <DrawerDescription>Выберите раздел</DrawerDescription>
                            </div>
                            <BurgerButton open={open} setOpen={setOpen}/>
                        </div>
                    </DrawerHeader>

                    <div className="p-4">
                        <div className="space-y-2">
                            {data.map((el) => {
                                return <li key={el.id} className="p-2 hover:bg-gray-100" onClick={() => setOpen(false)}>
                                    <Link
                                        href={el.slug}
                                    >
                                        {el.title}
                                    </Link>
                                </li>
                            })}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

