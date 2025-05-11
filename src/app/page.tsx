import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {loginToStrapi} from "@/utils/auth";

export default async function Home() {
    redirect('/api/auth')
}
