
import { GoogleGenAI } from "@google/genai";

export const getSpiritualInsight = async (userName: string, qazaCount: number) => {
  try {
    // Always initialize GoogleGenAI inside the function to ensure the correct API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      أنت مرشد روحي ذو معرفة بالمذهب الجعفري. 
      المستخدم اسمه ${userName}.
      لديه ${qazaCount} صلاة قضاء إجمالاً.
      قدم له نصيحة قصيرة (سطرين) مشجعة من أحاديث أهل البيت (ع) حول الصلاة أو فضل قضاء ما فات، بأسلوب حنون ومحفز.
      اجعل الرد باللغة العربية الفصحى وبدون تنسيق ماركداون معقد.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "إن الصلاة كانت على المؤمنين كتاباً موقوتاً. استمر في سعيك المبارك.";
  } catch (error) {
    console.error("Error fetching spiritual insight:", error);
    return "واصل سعيك الإيماني، فكل خطوة تقربك من الله عز وجل.";
  }
};
