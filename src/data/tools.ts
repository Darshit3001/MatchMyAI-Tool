import { type Tool, type Category } from "@/types";

export const categories: Category[] = [
    { id: "1", slug: "chatbot", name: "Chatbots", icon: "💬", description: "Conversational AI assistants", toolCount: 342 },
    { id: "2", slug: "image-generation", name: "Image Generation", icon: "🎨", description: "Create images with AI", toolCount: 256 },
    { id: "3", slug: "writing", name: "Writing", icon: "✍️", description: "AI writing assistants", toolCount: 198 },
    { id: "4", slug: "code", name: "Code", icon: "💻", description: "AI coding tools", toolCount: 176 },
    { id: "5", slug: "video", name: "Video", icon: "🎬", description: "AI video creation & editing", toolCount: 143 },
    { id: "6", slug: "audio", name: "Audio & Music", icon: "🎵", description: "AI audio & music tools", toolCount: 98 },
    { id: "7", slug: "productivity", name: "Productivity", icon: "⚡", description: "Boost your workflow with AI", toolCount: 267 },
    { id: "8", slug: "marketing", name: "Marketing", icon: "📈", description: "AI marketing & SEO tools", toolCount: 189 },
    { id: "9", slug: "design", name: "Design", icon: "🎯", description: "AI design tools", toolCount: 134 },
    { id: "10", slug: "education", name: "Education", icon: "📚", description: "AI learning tools", toolCount: 112 },
    { id: "11", slug: "research", name: "Research", icon: "🔬", description: "AI research assistants", toolCount: 87 },
    { id: "12", slug: "data-analysis", name: "Data Analysis", icon: "📊", description: "AI data analytics", toolCount: 95 },
    { id: "13", slug: "customer-support", name: "Customer Support", icon: "🎧", description: "AI customer service", toolCount: 78 },
    { id: "14", slug: "healthcare", name: "Healthcare", icon: "🏥", description: "AI in healthcare", toolCount: 56 },
    { id: "15", slug: "finance", name: "Finance", icon: "💰", description: "AI finance tools", toolCount: 67 },
    { id: "16", slug: "legal", name: "Legal", icon: "⚖️", description: "AI legal assistants", toolCount: 43 },
    { id: "17", slug: "hr", name: "HR & Recruiting", icon: "👥", description: "AI hiring tools", toolCount: 54 },
    { id: "18", slug: "social-media", name: "Social Media", icon: "📱", description: "AI social media tools", toolCount: 123 },
    { id: "19", slug: "translation", name: "Translation", icon: "🌐", description: "AI translation tools", toolCount: 45 },
    { id: "20", slug: "automation", name: "Automation", icon: "🤖", description: "AI workflow automation", toolCount: 156 },
];

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

export const tools: Tool[] = [
    {
        id: "t1", slug: "chatgpt", name: "ChatGPT", description: "Advanced conversational AI by OpenAI for writing, coding, analysis, and creative tasks.",
        website: "https://chat.openai.com", version: "5.2", country: "US", isVerified: true, isFeatured: true, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 20, priceCurrency: "USD",
        viewCount: 2450000, saveCount: 45200, avgRating: 4.5, reviewCount: 3420,
        category: categories[0], categoryId: "1", tags: [{ id: "t1", slug: "chatgpt", name: "ChatGPT" }],
        company: { id: "c1", slug: "openai", name: "OpenAI", country: "US" },
        releasedAt: daysAgo(2), createdAt: daysAgo(900), updatedAt: daysAgo(2),
        commentPreview: { content: "Still the best all-around AI assistant. GPT-5.2 is a massive leap.", userName: "Alex Chen", upvotes: 142 },
    },
    {
        id: "t2", slug: "midjourney", name: "Midjourney", description: "Create stunning visual art and photorealistic images from text prompts.",
        website: "https://midjourney.com", version: "6.1", country: "US", isVerified: true, isFeatured: true, isSponsored: false,
        pricingModel: "PAID", priceFrom: 10, priceCurrency: "USD",
        viewCount: 1890000, saveCount: 32100, avgRating: 4.7, reviewCount: 2180,
        category: categories[1], categoryId: "2", tags: [{ id: "t2", slug: "image-generation", name: "Image Generation" }],
        company: { id: "c2", slug: "midjourney", name: "Midjourney Inc.", country: "US" },
        releasedAt: daysAgo(5), createdAt: daysAgo(800), updatedAt: daysAgo(5),
        commentPreview: { content: "V6.1 is unbelievably good at photorealism. Best image gen tool.", userName: "Sarah Kim", upvotes: 89 },
    },
    {
        id: "t3", slug: "claude", name: "Claude", description: "Anthropic's helpful, harmless, and honest AI assistant for complex reasoning and analysis.",
        website: "https://claude.ai", version: "4.0", country: "US", isVerified: true, isFeatured: true, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 20, priceCurrency: "USD",
        viewCount: 1560000, saveCount: 28900, avgRating: 4.6, reviewCount: 1890,
        category: categories[0], categoryId: "1", tags: [{ id: "t3", slug: "chatgpt", name: "ChatGPT" }],
        company: { id: "c3", slug: "anthropic", name: "Anthropic", country: "US" },
        releasedAt: daysAgo(1), createdAt: daysAgo(600), updatedAt: daysAgo(1),
        commentPreview: { content: "Claude 4 is incredible for long-form writing and code review.", userName: "Dev Patel", upvotes: 234 },
    },
    {
        id: "t4", slug: "cursor", name: "Cursor", description: "AI-powered code editor that helps you write, edit, and debug code with natural language.",
        website: "https://cursor.sh", version: "2.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 20, priceCurrency: "USD",
        viewCount: 890000, saveCount: 18700, avgRating: 4.8, reviewCount: 1230,
        category: categories[3], categoryId: "4", tags: [{ id: "t4", slug: "code-editor", name: "Code Editor" }],
        company: { id: "c4", slug: "cursor", name: "Anysphere", country: "US" },
        releasedAt: daysAgo(3), createdAt: daysAgo(400), updatedAt: daysAgo(3),
        commentPreview: { content: "Completely changed how I code. The AI suggestions are next level.", userName: "Mike Torres", upvotes: 312 },
    },
    {
        id: "t5", slug: "sora", name: "Sora", description: "OpenAI's text-to-video model that creates realistic and imaginative scenes from text.",
        website: "https://sora.com", version: "2.0", country: "US", isVerified: true, isFeatured: true, isSponsored: false,
        pricingModel: "PAID", priceFrom: 200, priceCurrency: "USD",
        viewCount: 2100000, saveCount: 41000, avgRating: 4.3, reviewCount: 980,
        category: categories[4], categoryId: "5", tags: [{ id: "t5", slug: "video-generation", name: "Video Generation" }],
        company: { id: "c1", slug: "openai", name: "OpenAI", country: "US" },
        releasedAt: daysAgo(7), createdAt: daysAgo(300), updatedAt: daysAgo(7),
        commentPreview: { content: "The future of filmmaking. 60-second clips look professional.", userName: "Emma Liu", upvotes: 567 },
    },
    {
        id: "t6", slug: "perplexity", name: "Perplexity", description: "AI-powered search engine that provides accurate, cited answers to any question.",
        website: "https://perplexity.ai", version: "3.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 20, priceCurrency: "USD",
        viewCount: 1200000, saveCount: 22400, avgRating: 4.4, reviewCount: 1560,
        category: categories[10], categoryId: "11", tags: [{ id: "t6", slug: "search", name: "Search" }],
        company: { id: "c5", slug: "perplexity", name: "Perplexity AI", country: "US" },
        releasedAt: hoursAgo(8), createdAt: daysAgo(500), updatedAt: hoursAgo(8),
        commentPreview: { content: "Replaced Google for 80% of my searches. Citations are invaluable.", userName: "James Park", upvotes: 198 },
    },
    {
        id: "t7", slug: "notion-ai", name: "Notion AI", description: "AI-powered workspace for notes, docs, and project management with built-in intelligence.",
        website: "https://notion.so", version: "3.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 10, priceCurrency: "USD",
        viewCount: 980000, saveCount: 19800, avgRating: 4.2, reviewCount: 890,
        category: categories[6], categoryId: "7", tags: [{ id: "t7", slug: "productivity", name: "Productivity" }],
        company: { id: "c6", slug: "notion", name: "Notion Labs", country: "US" },
        releasedAt: daysAgo(4), createdAt: daysAgo(700), updatedAt: daysAgo(4),
    },
    {
        id: "t8", slug: "runway-ml", name: "Runway", description: "Creative AI toolkit for video editing, generation, and visual effects.",
        website: "https://runway.ml", version: "4.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 12, priceCurrency: "USD",
        viewCount: 750000, saveCount: 14500, avgRating: 4.3, reviewCount: 670,
        category: categories[4], categoryId: "5", tags: [{ id: "t8", slug: "video-editing", name: "Video Editing" }],
        company: { id: "c7", slug: "runway", name: "Runway AI", country: "US" },
        releasedAt: hoursAgo(12), createdAt: daysAgo(600), updatedAt: hoursAgo(12),
        commentPreview: { content: "Gen-4 is mind-blowing for video generation. Use it daily.", userName: "Lisa Wang", upvotes: 78 },
    },
    {
        id: "t9", slug: "elevenlabs", name: "ElevenLabs", description: "Ultra-realistic AI voice generation and text-to-speech platform.",
        website: "https://elevenlabs.io", version: "3.5", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 5, priceCurrency: "USD",
        viewCount: 670000, saveCount: 12300, avgRating: 4.6, reviewCount: 540,
        category: categories[5], categoryId: "6", tags: [{ id: "t9", slug: "text-to-speech", name: "Text to Speech" }],
        company: { id: "c8", slug: "elevenlabs", name: "ElevenLabs", country: "US" },
        releasedAt: daysAgo(6), createdAt: daysAgo(500), updatedAt: daysAgo(6),
    },
    {
        id: "t10", slug: "jasper", name: "Jasper", description: "AI marketing copilot for creating on-brand content across channels.",
        website: "https://jasper.ai", version: "4.0", country: "US", isVerified: true, isFeatured: false, isSponsored: true,
        pricingModel: "PAID", priceFrom: 39, priceCurrency: "USD",
        viewCount: 560000, saveCount: 9800, avgRating: 4.1, reviewCount: 780,
        category: categories[7], categoryId: "8", tags: [{ id: "t10", slug: "marketing", name: "Marketing" }],
        company: { id: "c9", slug: "jasper", name: "Jasper AI", country: "US" },
        releasedAt: daysAgo(2), createdAt: daysAgo(800), updatedAt: daysAgo(2),
    },
    {
        id: "t11", slug: "canva-ai", name: "Canva AI", description: "AI-powered design tools for creating stunning visuals, presentations, and social media content.",
        website: "https://canva.com", version: "2.0", country: "AU", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 13, priceCurrency: "USD",
        viewCount: 890000, saveCount: 16700, avgRating: 4.4, reviewCount: 1120,
        category: categories[8], categoryId: "9", tags: [{ id: "t11", slug: "design", name: "Design" }],
        company: { id: "c10", slug: "canva", name: "Canva", country: "AU" },
        releasedAt: hoursAgo(2), createdAt: daysAgo(900), updatedAt: hoursAgo(2),
        commentPreview: { content: "Magic Studio features are incredible for non-designers!", userName: "Priya Sharma", upvotes: 145 },
    },
    {
        id: "t12", slug: "github-copilot", name: "GitHub Copilot", description: "AI pair programmer that helps you write code faster with contextual suggestions.",
        website: "https://github.com/features/copilot", version: "3.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "PAID", priceFrom: 10, priceCurrency: "USD",
        viewCount: 1340000, saveCount: 25600, avgRating: 4.5, reviewCount: 2340,
        category: categories[3], categoryId: "4", tags: [{ id: "t12", slug: "code", name: "Code" }],
        company: { id: "c11", slug: "github", name: "GitHub (Microsoft)", country: "US" },
        releasedAt: daysAgo(10), createdAt: daysAgo(1000), updatedAt: daysAgo(10),
    },
    {
        id: "t13", slug: "synthesia", name: "Synthesia", description: "Create professional AI videos with virtual avatars — no camera needed.",
        website: "https://synthesia.io", version: "3.2", country: "GB", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "PAID", priceFrom: 22, priceCurrency: "USD",
        viewCount: 430000, saveCount: 8900, avgRating: 4.2, reviewCount: 456,
        category: categories[4], categoryId: "5", tags: [{ id: "t13", slug: "video", name: "Video" }],
        company: { id: "c12", slug: "synthesia", name: "Synthesia", country: "GB" },
        releasedAt: daysAgo(8), createdAt: daysAgo(700), updatedAt: daysAgo(8),
    },
    {
        id: "t14", slug: "grammarly", name: "Grammarly", description: "AI-powered writing assistant for grammar, clarity, tone, and style improvements.",
        website: "https://grammarly.com", version: "5.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 12, priceCurrency: "USD",
        viewCount: 780000, saveCount: 15400, avgRating: 4.3, reviewCount: 1890,
        category: categories[2], categoryId: "3", tags: [{ id: "t14", slug: "writing", name: "Writing" }],
        company: { id: "c13", slug: "grammarly", name: "Grammarly Inc.", country: "US" },
        releasedAt: daysAgo(3), createdAt: daysAgo(1200), updatedAt: daysAgo(3),
    },
    {
        id: "t15", slug: "descript", name: "Descript", description: "AI-powered video and podcast editing — edit media like editing a document.",
        website: "https://descript.com", version: "4.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 24, priceCurrency: "USD",
        viewCount: 340000, saveCount: 6700, avgRating: 4.4, reviewCount: 340,
        category: categories[4], categoryId: "5", tags: [{ id: "t15", slug: "video-editing", name: "Video Editing" }],
        company: { id: "c14", slug: "descript", name: "Descript", country: "US" },
        releasedAt: hoursAgo(6), createdAt: daysAgo(600), updatedAt: hoursAgo(6),
    },
    {
        id: "t16", slug: "copy-ai", name: "Copy.ai", description: "AI-powered platform for generating marketing copy, emails, and sales content.",
        website: "https://copy.ai", version: "3.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 36, priceCurrency: "USD",
        viewCount: 450000, saveCount: 8200, avgRating: 4.0, reviewCount: 560,
        category: categories[7], categoryId: "8", tags: [{ id: "t16", slug: "copywriting", name: "Copywriting" }],
        company: { id: "c15", slug: "copyai", name: "Copy.ai", country: "US" },
        releasedAt: daysAgo(5), createdAt: daysAgo(800), updatedAt: daysAgo(5),
    },
    {
        id: "t17", slug: "otter-ai", name: "Otter.ai", description: "AI meeting assistant that records, transcribes, and summarizes meetings in real-time.",
        website: "https://otter.ai", version: "4.5", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 17, priceCurrency: "USD",
        viewCount: 520000, saveCount: 11200, avgRating: 4.3, reviewCount: 890,
        category: categories[6], categoryId: "7", tags: [{ id: "t17", slug: "transcription", name: "Transcription" }],
        company: { id: "c16", slug: "otterai", name: "Otter.ai", country: "US" },
        releasedAt: hoursAgo(18), createdAt: daysAgo(700), updatedAt: hoursAgo(18),
        commentPreview: { content: "Game-changer for remote meetings. Summaries save me hours.", userName: "Rachel Green", upvotes: 67 },
    },
    {
        id: "t18", slug: "stable-diffusion", name: "Stable Diffusion", description: "Open-source AI image generation model — run locally or via API.",
        website: "https://stability.ai", version: "XL 3.0", country: "GB", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREE", priceFrom: undefined, priceCurrency: "USD",
        viewCount: 1670000, saveCount: 34500, avgRating: 4.4, reviewCount: 2100,
        category: categories[1], categoryId: "2", tags: [{ id: "t18", slug: "image-generation", name: "Image Generation" }],
        company: { id: "c17", slug: "stability", name: "Stability AI", country: "GB" },
        releasedAt: daysAgo(14), createdAt: daysAgo(900), updatedAt: daysAgo(14),
    },
    {
        id: "t19", slug: "gemini", name: "Gemini", description: "Google's multimodal AI that understands text, images, code, audio, and video.",
        website: "https://gemini.google.com", version: "2.5", country: "US", isVerified: true, isFeatured: true, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 20, priceCurrency: "USD",
        viewCount: 1890000, saveCount: 29800, avgRating: 4.3, reviewCount: 1670,
        category: categories[0], categoryId: "1", tags: [{ id: "t19", slug: "chatgpt", name: "ChatGPT" }],
        company: { id: "c18", slug: "google", name: "Google DeepMind", country: "US" },
        releasedAt: hoursAgo(4), createdAt: daysAgo(450), updatedAt: hoursAgo(4),
        commentPreview: { content: "2.5 Pro is insanely good at code and reasoning. Context window is massive.", userName: "Tom Anderson", upvotes: 203 },
    },
    {
        id: "t20", slug: "leonardo-ai", name: "Leonardo.ai", description: "AI-powered creative suite for generating production-quality visual assets.",
        website: "https://leonardo.ai", version: "3.0", country: "AU", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 10, priceCurrency: "USD",
        viewCount: 560000, saveCount: 10200, avgRating: 4.5, reviewCount: 450,
        category: categories[1], categoryId: "2", tags: [{ id: "t20", slug: "image-generation", name: "Image Generation" }],
        company: { id: "c19", slug: "leonardo", name: "Leonardo Interactive", country: "AU" },
        releasedAt: hoursAgo(1), createdAt: daysAgo(400), updatedAt: hoursAgo(1),
    },
    {
        id: "t21", slug: "zapier-ai", name: "Zapier AI", description: "Automate workflows between 6,000+ apps using natural language AI commands.",
        website: "https://zapier.com", version: "2.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 20, priceCurrency: "USD",
        viewCount: 340000, saveCount: 7800, avgRating: 4.1, reviewCount: 320,
        category: categories[19], categoryId: "20", tags: [{ id: "t21", slug: "automation", name: "Automation" }],
        company: { id: "c20", slug: "zapier", name: "Zapier", country: "US" },
        releasedAt: daysAgo(9), createdAt: daysAgo(500), updatedAt: daysAgo(9),
    },
    {
        id: "t22", slug: "writesonic", name: "Writesonic", description: "AI writing platform for blog posts, ads, product descriptions, and more.",
        website: "https://writesonic.com", version: "5.0", country: "US", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 16, priceCurrency: "USD",
        viewCount: 320000, saveCount: 6100, avgRating: 4.0, reviewCount: 420,
        category: categories[2], categoryId: "3", tags: [{ id: "t22", slug: "writing", name: "Writing" }],
        company: { id: "c21", slug: "writesonic", name: "Writesonic", country: "US" },
        releasedAt: daysAgo(6), createdAt: daysAgo(700), updatedAt: daysAgo(6),
    },
    {
        id: "t23", slug: "photoroom", name: "PhotoRoom", description: "AI photo editor that removes backgrounds and creates professional product photos instantly.",
        website: "https://photoroom.com", version: "4.0", country: "FR", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 10, priceCurrency: "USD",
        viewCount: 410000, saveCount: 8400, avgRating: 4.5, reviewCount: 670,
        category: categories[8], categoryId: "9", tags: [{ id: "t23", slug: "photo-editing", name: "Photo Editing" }],
        company: { id: "c22", slug: "photoroom", name: "PhotoRoom", country: "FR" },
        releasedAt: hoursAgo(3), createdAt: daysAgo(500), updatedAt: hoursAgo(3),
        commentPreview: { content: "Best background removal tool. Period. Saves me hours.", userName: "Marie Dubois", upvotes: 89 },
    },
    {
        id: "t24", slug: "deepl", name: "DeepL", description: "AI-powered translation that produces natural, human-sounding results in 30+ languages.",
        website: "https://deepl.com", version: "5.0", country: "DE", isVerified: true, isFeatured: false, isSponsored: false,
        pricingModel: "FREEMIUM", priceFrom: 9, priceCurrency: "USD",
        viewCount: 890000, saveCount: 18900, avgRating: 4.7, reviewCount: 1230,
        category: categories[18], categoryId: "19", tags: [{ id: "t24", slug: "translation", name: "Translation" }],
        company: { id: "c23", slug: "deepl", name: "DeepL SE", country: "DE" },
        releasedAt: daysAgo(4), createdAt: daysAgo(1100), updatedAt: daysAgo(4),
    },
];

// Utility functions
export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
    return tools.filter((t) => t.category.slug === categorySlug);
}

export function getTrendingTools(limit = 10): Tool[] {
    return [...tools].sort((a, b) => b.viewCount - a.viewCount).slice(0, limit);
}

export function getLatestTools(limit = 24): Tool[] {
    return [...tools]
        .sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime())
        .slice(0, limit);
}

export function getFreeTools(): Tool[] {
    return tools.filter((t) => t.pricingModel === "FREE");
}

export function searchTools(query: string): Tool[] {
    const lower = query.toLowerCase();
    return tools.filter(
        (t) =>
            t.name.toLowerCase().includes(lower) ||
            t.description.toLowerCase().includes(lower) ||
            t.category.name.toLowerCase().includes(lower)
    );
}
