'use client'
import Image from "next/image";
import cn from "classnames";

type LogoPropsType = {
    logo: string
}

export const Logo = ({logo}: LogoPropsType) => {

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
        <div className={'flex flex-col'}>
            {img}
            <div className={cn('text-[10px]', window.innerWidth < 1200 ? 'hidden' : '')}>SAVGOOD.RU Официальный
                представитель
            </div>
        </div>
    );
};

