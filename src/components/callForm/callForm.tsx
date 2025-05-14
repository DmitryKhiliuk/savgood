'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Cookies from "universal-cookie";

// Схема валидации формы
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phone: z.string().min(7, {
        message: "Phone must be at least 7 characters.",
    }),
})

export function CallForm() {

    const cookies = new Cookies(null, {path: '/'})
     const token = cookies.get('sgt')
        console.log(cookies)

    // 1. Определение формы
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
        },
    })

    // 2. Обработчик отправки
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const apiUrl = process.env.API_URL;
        const url = `http://localhost:1337/api/calls`;

        const response = await fetch(url, {
            cache: "no-cache",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: values}),
            method: "POST",
        });

        return response.json();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Ваше имя</FormLabel>
                            <FormControl>
                                <Input placeholder="Имя" {...field} />
                            </FormControl>
                            <FormDescription>
                                Укажите в поле ваше имя.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Ваш телефон</FormLabel>
                            <FormControl>
                                <Input placeholder="Телефон" {...field} />
                            </FormControl>
                            <FormDescription>
                                Укажите как с Вами связаться.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit">Отправить</Button>
            </form>
        </Form>
    )
}

