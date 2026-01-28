
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Removed global ai instance to follow the recommendation of instantiating right before use

  async summarizePost(title: string, content: string): Promise<string> {
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure latest API key usage
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash-preview',
        contents: `Hãy tóm tắt bài viết sau đây một cách súc tích và hấp dẫn cho người đọc: 
        Tiêu đề: ${title}
        Nội dung: ${content}`,
        config: {
          temperature: 0.7,
        }
      });
      // Directly access the .text property from GenerateContentResponse
      return response.text || "Không thể tạo tóm tắt vào lúc này.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Lỗi khi kết nối với AI để tóm tắt bài viết.";
    }
  }

  async getInsights(category: string, tags: string[]): Promise<string> {
    try {
      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `Dựa trên chuyên mục "${category}" và các thẻ từ khóa [${tags.join(', ')}], hãy đưa ra 1 lời khuyên ngắn gọn hoặc xu hướng mới nhất trong lĩnh vực này.`,
      });
      // Directly access the .text property from GenerateContentResponse
      return response.text || "Tiếp tục sáng tạo nhé!";
    } catch (error) {
      return "Sáng tạo là không giới hạn.";
    }
  }
}

export const gemini = new GeminiService();
