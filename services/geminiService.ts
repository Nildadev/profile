import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private getModel() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is not defined.");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async summarizePost(title: string, content: string): Promise<string> {
    try {
      const model = this.getModel();
      const prompt = `Hãy tóm tắt bài viết sau đây một cách súc tích và hấp dẫn cho người đọc bằng tiếng Việt: 
        Tiêu đề: ${title}
        Nội dung: ${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error("Gemini Detailed Error:", error);
      return "Lỗi khi kết nối với AI để tóm tắt bài viết.";
    }
  }

  async getInsights(category: string, tags: string[]): Promise<string> {
    try {
      const model = this.getModel();
      const prompt = `Dựa trên chuyên mục "${category}" và các thẻ từ khóa [${tags.join(', ')}], hãy đưa ra 1 lời khuyên ngắn gọn hoặc xu hướng mới nhất trong lĩnh vực này bằng tiếng Việt.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error("Gemini Insights Error:", error);
      return "Sáng tạo là không giới hạn.";
    }
  }
}

export const gemini = new GeminiService();
