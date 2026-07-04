import { GoogleGenerativeAI, SchemaType, Schema } from '@google/generative-ai'

const GEMINI_PROMPT = `
You are an expert technical editor for a high-quality engineering and technology portfolio.
Your job is to assist the author in preparing their project submission. You will receive a partial project object.

CRITICAL INSTRUCTIONS:
1. If a field has content, DO NOT CHANGE THE MEANING OR TONE. You must strictly PRESERVE the original content. ONLY correct grammatical errors and typos in the description.
2. Do NOT hallucinate or add facts to existing content.
3. If a field is EMPTY, GENERATE it based on the context of the fields that are provided (e.g., generate a slug or tags if missing).
4. Determine an appropriate "category" if it is empty. It should be a single, broad open category like "Engineering", "AI", "VLSI", "Web Development", etc.
5. Generate a URL-friendly "slug" (e.g. "my-awesome-project") based on the title if it is empty.
6. Return a valid JSON matching the schema.
`

const responseSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        title: { type: SchemaType.STRING, description: "The title of the project" },
        slug: { type: SchemaType.STRING, description: "URL friendly slug" },
        description: { type: SchemaType.STRING, description: "A summary or description of the project" },
        category: { type: SchemaType.STRING, description: "The broad category this project belongs to" },
        tags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: "Specific technical tags" },
    },
    required: ["title", "slug", "description", "category", "tags"],
}

export interface PartialProject {
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    tags?: string[];
}

export async function generateProjectContent(partial: PartialProject): Promise<PartialProject> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    
    // Use the latest flash model available
    const FALLBACK_MODELS = [
        'gemini-2.5-flash',
        'gemini-1.5-flash',
    ];

    let prompt = GEMINI_PROMPT + `\n\nINPUT DATA:\n` + JSON.stringify(partial, null, 2);

    let lastError: Error | null = null;

    for (const modelName of FALLBACK_MODELS) {
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: {
                    responseMimeType: 'application/json',
                    responseSchema: responseSchema
                }
            });

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            
            return JSON.parse(text) as PartialProject;
        } catch (error: any) {
            console.error(`Gemini model ${modelName} failed:`, error);
            lastError = error;
        }
    }

    throw new Error(`All Gemini models failed. Last error: ${lastError?.message}`);
}
