import {NextResponse} from 'next/server'

export async function POST(request: Request) {
    const {username, phone} = await request.json()
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID || '@dmitrykhiliuk'

    try {
        const text = `New form submission:\nUsername: ${username}\nPhone: ${phone}`
        const response = await fetch(
            `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
        )

        if (!response.ok) throw new Error('Telegram API error')
        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({error: 'Failed to send to Telegram'}, {status: 500})
    }
}