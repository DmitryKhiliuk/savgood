import React from 'react';
import {cookies} from "next/headers";
import {ProductCard} from "@/components/productCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination"

type ProductListPropsType = {
    slug: string
    currentPage: number
}

async function getProducts(slug: string, page: number) {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/api/products?populate[char][populate]=*&populate[image][fields]=url&filters[type][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=8`;
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

export const ProductList = async ({slug, currentPage}: ProductListPropsType) => {
    const data = await getProducts(slug, currentPage);
    const totalPages = data.meta.pagination.pageCount;
    // Функция для генерации массива страниц для пагинации
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Максимальное количество видимых номеров страниц

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="space-y-6">
            <div className="w-full grid grid-cols-auto-fit gap-4" style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
                {data.data.map((el: any) => (
                    <ProductCard key={el.id} data={el}/>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={`?page=${Math.max(1, currentPage - 1)}`}
                                aria-disabled={currentPage <= 1}
                            />
                        </PaginationItem>

                        {/* Первая страница */}
                        {!pageNumbers.includes(1) && (
                            <>
                                <PaginationItem>
                                    <PaginationLink href={`?page=1`} isActive={currentPage === 1}>
                                        1
                                    </PaginationLink>
                                </PaginationItem>
                                {currentPage > 3 && <PaginationEllipsis/>}
                            </>
                        )}

                        {/* Основные страницы */}
                        {pageNumbers.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href={`?page=${page}`}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Последняя страница */}
                        {!pageNumbers.includes(totalPages) && (
                            <>
                                {currentPage < totalPages - 2 && <PaginationEllipsis/>}
                                <PaginationItem>
                                    <PaginationLink
                                        href={`?page=${totalPages}`}
                                        isActive={currentPage === totalPages}
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                                aria-disabled={currentPage >= totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

