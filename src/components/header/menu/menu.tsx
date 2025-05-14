'use client';
import * as React from 'react';
import {useRef} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import cn from 'classnames';

type MenuPropsType = {
    data: { [key: string]: string }[]
}

export const Menu = ({data}: MenuPropsType) => {
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement | null>(null);
    return (
        <div className="relative" ref={ref}>


            {/* Main Menu */}
            <ol className="flex justify-between gap-7">
                {data ? data.map((el) => {
                    return <li key={el.id} className="flex items-center gap-5">
                        <Link
                            href={el.slug}
                            className={cn('relative py-1.5 hover:text-[#27528c] after:transition-transform after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-[#27528c] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left', pathname === `${'/' + el.slug}` ? 'text-[#27528c]' : '')}
                        >
                            {el.title}
                        </Link>
                    </li>
                }) : '404'}


            </ol>
        </div>
    );
};