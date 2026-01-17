
import { GoogleGenAI } from "@google/genai";

export const generateDescription = async (productName: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنت خبير تسويق محترف لشركة MoazStore. اكتب وصفاً تسويقياً جذاباً ومختصراً باللغة العربية لمنتج اسمه: ${productName}. المنتج يخص مجال تقوية شبكات الموبايل أو الأقفال الذكية. اجعل الوصف يحفز العميل على الشراء.`,
    });
    return response.text || "وصف رائع لمنتج مميز من معاذ ستور.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "منتج عالي الجودة من معاذ ستور، يوفر لك الأمان والاتصال القوي.";
  }
};
