import React from 'react';
import {Button} from "@/components/ui/button";

type ProductCard = {
    data: any
}

export const ProductCard = ({data}: ProductCard) => {

    const chars = data.char.length ? Object.values(data.char[0]).filter((el) => typeof el === 'object') : []
    const apiUrl = process.env.API_URL

    return (
        <div
            className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Изображение товара */}
            <div className="relative pb-[75%] overflow-hidden">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    src={apiUrl + data.image.url}
                    alt="camera"
                />
            </div>

            {/* Контент карточки */}
            <div className="p-5 text-center">
                {/* Название и цена */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
                </div>

                {/* Описание */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {data.description}
                </p>

                <Button className={'w-full'}>Learn More</Button>

                <div className={'w-full h-[1px] bg-gray-300 my-[10px]'}/>

                <div className={'text-center'}>
                    {chars.map((el: any) => <div key={el.id} className={'flex flex-col items-center'}>
                        <div>{el.value}</div>
                        <div className={'text-gray-400 text-sm'}>{el.name}</div>
                        <div className={'w-[150px] h-[1px] bg-gray-300 my-[10px]'}/>
                    </div>)}
                </div>
            </div>
        </div>
    );
}


