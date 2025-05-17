import React from 'react';

type ProductCard = {
    data: any
}

export const ProductCard = ({data}: ProductCard) => {

    const chars = data.char.length ? Object.values(data.char[0]).filter((el) => typeof el === 'object') : []
     const apiUrl = process.env.API_URL
    console.log(data)
    console.log(chars)


    return (
        /*<div className={'w-[375px] border-[1px]'}>
            <div>{data.name}</div>
            <div>{data.description}</div>
        </div>*/



        <div
            className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Изображение товара */}
            <div className="relative pb-[75%] overflow-hidden">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    src={apiUrl + data.image.url}
                    alt="Смартфон"
                />
                {/* Бейдж скидки */}
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -20%
                </div>
            </div>

            {/* Контент карточки */}
            <div className="p-5">
                {/* Название и цена */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">Смартфон Premium X9</h3>
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-indigo-600">$799</span>
                        <span className="text-sm text-gray-400 line-through">$999</span>
                    </div>
                </div>

                {/* Описание */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Флагманский смартфон с AMOLED-экраном 6.7", процессором Snapdragon 8 Gen 2 и тройной камерой 108 Мп.
                </p>

                {/* Характеристики */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Snapdragon 8 Gen 2
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        256 ГБ Памяти
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                        </svg>
                        Тройная камера
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        2 года гарантии
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex space-x-3">
                    <button
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                        В корзину
                    </button>
                    <button
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}


