import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/header";
import {getGlobalData} from "@/utils/globalApi";
import {cookies} from "next/headers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata() {
    const cookie = await cookies();
    const token = cookie.get("sgt")?.value;

    if (!token) {
        throw new Error("No token found in cookies");
    }

    const data = await getGlobalData(token); // <-- передаём токен
    const apiUrl = process.env.API_URL;

    return {
        title: data.data.siteName,
        description: data.data.siteDescription,
        icons: {
            icon: `${apiUrl}${data.data.favicon?.url}`,
        },
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookie = await cookies();
    const token = cookie.get("sgt")?.value;

    if (!token) {
        throw new Error("Missing token");
    }

    const data = await getGlobalData(token);
    const apiUrl = process.env.API_URL;
    const logoUrl = `${apiUrl}${data.data?.logo?.url}`;

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header logo={logoUrl} />
                {children}
            </body>
        </html>
    );
}
