import { NextApiRequest, NextApiResponse } from 'next'

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
    const { messages } = req.body
    const url = 'https://api.openai.com/v1/chat/completions'

    const body = JSON.stringify({
        messages,
        model: 'gpt-3.5-turbo',
        temperature: 0.7
    })

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body
        })

        const data = await response.json()
        res.status(200).json({ data })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}