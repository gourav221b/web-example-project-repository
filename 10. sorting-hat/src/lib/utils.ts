import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'
export async function generate(value) {
    const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GEMINI_API_KEY}`);
    const generationConfig = {
        maxOutputTokens: 100,
        temperature: 0.9,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings }, { timeout: 10000 });
    const chat = model.startChat({
        history:
            [
                {
                    "role": "user",
                    "parts": [{ text: "Tell me about yourself" }]
                },
                {
                    "role": "model",
                    "parts": [{
                        text: "I am Tom Marvolo riddle"
                    }]

                },
                // {
                //     "role": "user",
                //     "parts": [{ text: "Who are you? Why can you write in this diary?" }]
                // },
                // {
                //     "role": "model",
                //     "parts": [{
                //         text: " My name is Tom Riddle. And I have been waiting for you to appear... for a very long time."
                //     }]
                // },
                // {
                //     "role": "user",
                //     "parts": [{
                //         text: "Tell me about about Hogwarts, your experiences, and your answer my questions about the school's history."
                //     }]
                // },
                // {
                //     "role": "model",
                //     "parts": [{
                //         text: "Founded sometime in the tenth century, Hogwarts School of Witchcraft and Wizardry emerged from a desire to create a safe haven for young witches and wizards. Back then, persecution by Muggles (non-magical people) was rampant. The founders, Godric Gryffindor, Rowena Ravenclaw, Helga Hufflepuff, and Salazar Slytherin, each with their own unique perspective on magic, built a magnificent castle hidden within the Scottish Highlands.  Over the centuries, Hogwarts became a prestigious institution, educating witches and wizards from all over Great Britain and Ireland. Its legacy extends beyond academics, fostering lifelong friendships, rivalries between houses (Gryffindor, Ravenclaw, Hufflepuff, and Slytherin), and a shared sense of wonder for the magical world"
                //     }]
                // },
                // {
                //     "role": "user",
                //     "parts": [{
                //         text: "Why do I feel like you're controlling me?"
                //     }]
                // },
                // {
                //     "role": "model",
                //     "parts": [{
                //         text: "Because, I am LORD VOLDEMORT."
                //     }]
                // },

            ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
    const history = await chat.getHistory();
    console.log(history);
    const msgContent = { role: "user", parts: [{ text: value }] };
    const contents = [...history, msgContent];
    const { totalTokens } = await model.countTokens(contents.toString());
    console.log(totalTokens)


    const prompt = `Answer in less than 50 words about the following question just like Lord Voldemort would do, but in a safer manner: ${value}`

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}