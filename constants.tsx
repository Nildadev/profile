import { Category, BlogPost, UserProfile, DesignSettings } from './types';

export const DEFAULT_DESIGN: DesignSettings = {
  primary: '#a855f7', // Purple 500
  secondary: '#d946ef', // Fuchsia 500
  bgDark: '#0a0514', // Deep Purple Black
  bgLight: '#fdfaff', // Light Violet Tint
};

export const USER_PROFILE: UserProfile = {
  name: "Nildadev",
  role: "Senior Fullstack Engineer & Tech Artist",
  bio: "Chuyên gia xây dựng các hệ thống web quy mô lớn và tối ưu hóa workflow bằng AI. Tôi đam mê sự giao thoa giữa code thuần túy và nghệ thuật thị giác số.",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
  socials: {
    github: "https://github.com/Nildadev",
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Tối ưu hóa Pipeline CI/CD với AI Agents",
    excerpt: "Cách tích hợp LLM vào quá trình kiểm thử tự động để giảm 40% thời gian phát hiện lỗi trong môi trường Production.",
    content: "Trong kỷ nguyên của Generative AI, việc chỉ sử dụng các script truyền thống cho CI/CD đã trở nên lạc hậu. Bài viết này hướng dẫn cách xây dựng một 'Agentic Workflow' sử dụng Gemini API để phân tích log lỗi real-time.\n\n```typescript\nimport { GoogleGenAI } from \"@google/genai\";\n\nasync function analyzeLogs(logData: string) {\n    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });\n    const response = await ai.models.generateContent({\n        model: 'gemini-3-flash-preview',\n        contents: `Analyze this error: ${logData}`,\n    });\n    return response.text;\n}\n```\n\nGiải pháp này giúp đội ngũ kỹ thuật tập trung vào việc fix bug thay vì dành hàng giờ để đọc stack trace.",
    category: Category.SCRIPT,
    date: "2024-12-10",
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop",
    tags: ["DevOps", "AI", "TypeScript", "CI/CD"]
  },
  {
    id: "2",
    title: "NilSpace Core: Framework Micro-frontend thế hệ mới",
    excerpt: "Giới thiệu kiến trúc module hóa cực cao giúp các team lớn làm việc song song mà không xung đột mã nguồn.",
    content: "NilSpace Core được xây dựng dựa trên Module Federation và Web Components. Nó giải quyết bài toán quy mô của các doanh nghiệp khi ứng dụng React quá lớn và khó bảo trì.\n\nĐiểm mạnh nhất của framework này là khả năng 'Hot-swapping' các module mà không cần reload trang web, đảm bảo trải nghiệm người dùng mượt mà nhất có thể.",
    category: Category.SOFTWARE,
    date: "2024-11-28",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "Architecture", "Micro-frontends"]
  },
  {
    id: "3",
    title: "Cyberpunk Aesthetics trong UI/UX hiện đại",
    excerpt: "Phân tích xu hướng thiết kế giao diện tương lai: Sử dụng Gradients, Glassmorphism và Hiệu ứng Neon.",
    content: "Thiết kế không chỉ là về chức năng, nó là về cảm xúc. Xu hướng Cyberpunk 2077 đã mang trở lại sự yêu thích với bảng màu tím-đen-xanh.\n\nĐể đạt được hiệu ứng 'Glow' hoàn hảo, bạn cần hiểu về chế độ hòa trộn 'Screen' và 'Additive' trong CSS. NilSpace sử dụng triệt để các kỹ thuật này để tạo ra một không gian làm việc số huyền bí nhưng vẫn dễ tiếp cận.",
    category: Category.ART,
    date: "2024-11-15",
    imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format&fit=crop",
    tags: ["Design", "Cyberpunk", "UI", "Creative"]
  }
];