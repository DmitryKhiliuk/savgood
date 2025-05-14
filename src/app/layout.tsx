import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/header";
import {getGlobalData} from "@/utils/globalApi";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata() {
    const data = await getGlobalData();
    const apiUrl = process.env.API_URL;
    return {
        title: data.data.siteName,
        description: data.data.siteDescription,
        icons: {
            icon: `${apiUrl}${data.data.favicon?.url}`,
        },
    }
}

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const data = await getGlobalData();
    const apiUrl = process.env.API_URL;
    const logoUrl = `${apiUrl}${data.data?.logo?.url}`;
    console.log('logo', logoUrl)
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Header logo={logoUrl}/>
        {children}
        </body>
        </html>
    );
}
