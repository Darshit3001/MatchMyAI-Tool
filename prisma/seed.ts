// Seed script for APT AI database
// Run with: npx tsx prisma/seed.ts

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000);
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000);

async function main() {
    // Dynamic imports for ESM compatibility
    const { PrismaClient } = await import("../src/generated/prisma/client.js");
    const { PrismaBetterSqlite3 } = await import("@prisma/adapter-better-sqlite3");
    const path = await import("path");
    const dbPath = path.resolve(process.cwd(), "dev.db");
    const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
    const prisma = new PrismaClient({ adapter });

    console.log("🌱 Seeding APT AI database...\n");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await prisma.collectionItem.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.deal.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.review.deleteMany();
    await prisma.savedTool.deleteMany();
    await prisma.toolSubmission.deleteMany();
    await prisma.tagsOnTools.deleteMany();
    await prisma.tool.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.company.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log("  ✅ Cleared\n");

    // 1. Categories
    console.log("📁 Creating categories...");
    const categoriesData = [
        { slug: "chatbot", name: "Chatbots", icon: "💬", description: "Conversational AI assistants" },
        { slug: "image-generation", name: "Image Generation", icon: "🎨", description: "Create images with AI" },
        { slug: "writing", name: "Writing", icon: "✍️", description: "AI writing assistants" },
        { slug: "code", name: "Code", icon: "💻", description: "AI coding tools" },
        { slug: "video", name: "Video", icon: "🎬", description: "AI video creation & editing" },
        { slug: "audio", name: "Audio & Music", icon: "🎵", description: "AI audio & music tools" },
        { slug: "productivity", name: "Productivity", icon: "⚡", description: "Boost your workflow with AI" },
        { slug: "marketing", name: "Marketing", icon: "📈", description: "AI marketing & SEO tools" },
        { slug: "design", name: "Design", icon: "🎯", description: "AI design tools" },
        { slug: "education", name: "Education", icon: "📚", description: "AI learning tools" },
        { slug: "research", name: "Research", icon: "🔬", description: "AI research assistants" },
        { slug: "data-analysis", name: "Data Analysis", icon: "📊", description: "AI data analytics" },
        { slug: "customer-support", name: "Customer Support", icon: "🎧", description: "AI customer service" },
        { slug: "healthcare", name: "Healthcare", icon: "🏥", description: "AI in healthcare" },
        { slug: "finance", name: "Finance", icon: "💰", description: "AI finance tools" },
        { slug: "legal", name: "Legal", icon: "⚖️", description: "AI legal assistants" },
        { slug: "hr", name: "HR & Recruiting", icon: "👥", description: "AI hiring tools" },
        { slug: "social-media", name: "Social Media", icon: "📱", description: "AI social media tools" },
        { slug: "translation", name: "Translation", icon: "🌐", description: "AI translation tools" },
        { slug: "automation", name: "Automation", icon: "🤖", description: "AI workflow automation" },
    ];

    const categories: Record<string, string> = {};
    for (const cat of categoriesData) {
        const created = await prisma.category.create({ data: cat });
        categories[cat.slug] = created.id;
    }
    console.log(`  ✅ ${Object.keys(categories).length} categories\n`);

    // 2. Companies
    console.log("🏢 Creating companies...");
    const companiesData = [
        { slug: "openai", name: "OpenAI", country: "US" },
        { slug: "midjourney", name: "Midjourney Inc.", country: "US" },
        { slug: "anthropic", name: "Anthropic", country: "US" },
        { slug: "cursor", name: "Anysphere", country: "US" },
        { slug: "perplexity", name: "Perplexity AI", country: "US" },
        { slug: "notion", name: "Notion Labs", country: "US" },
        { slug: "runway", name: "Runway AI", country: "US" },
        { slug: "elevenlabs", name: "ElevenLabs", country: "US" },
        { slug: "jasper", name: "Jasper AI", country: "US" },
        { slug: "canva", name: "Canva", country: "AU" },
        { slug: "github", name: "GitHub (Microsoft)", country: "US" },
        { slug: "synthesia", name: "Synthesia", country: "GB" },
        { slug: "grammarly", name: "Grammarly Inc.", country: "US" },
        { slug: "descript", name: "Descript", country: "US" },
        { slug: "copyai", name: "Copy.ai", country: "US" },
        { slug: "otterai", name: "Otter.ai", country: "US" },
        { slug: "stability", name: "Stability AI", country: "GB" },
        { slug: "google", name: "Google DeepMind", country: "US" },
        { slug: "leonardo", name: "Leonardo Interactive", country: "AU" },
        { slug: "zapier", name: "Zapier", country: "US" },
        { slug: "writesonic", name: "Writesonic", country: "US" },
        { slug: "photoroom", name: "PhotoRoom", country: "FR" },
        { slug: "deepl", name: "DeepL SE", country: "DE" },
    ];

    const companies: Record<string, string> = {};
    for (const comp of companiesData) {
        const created = await prisma.company.create({ data: comp });
        companies[comp.slug] = created.id;
    }
    console.log(`  ✅ ${Object.keys(companies).length} companies\n`);

    // 3. Tags
    console.log("🏷️  Creating tags...");
    const tagsData = [
        "chatgpt", "image-generation", "code-editor", "video-generation",
        "search", "productivity", "video-editing", "text-to-speech",
        "marketing", "design", "code", "writing", "transcription",
        "copywriting", "photo-editing", "translation", "automation",
    ];

    const tags: Record<string, string> = {};
    for (const slug of tagsData) {
        const name = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        const created = await prisma.tag.create({ data: { slug, name } });
        tags[slug] = created.id;
    }
    console.log(`  ✅ ${Object.keys(tags).length} tags\n`);

    // 4. Tools
    console.log("🔧 Creating tools...");
    const toolsData = [
        { slug: "chatgpt", name: "ChatGPT", desc: "Advanced conversational AI by OpenAI for writing, coding, analysis, and creative tasks.", web: "https://chat.openai.com", ver: "5.2", co: "US", feat: true, sp: false, pm: "FREEMIUM", pf: 20, vc: 2450000, sc: 45200, ar: 4.5, rc: 3420, cat: "chatbot", comp: "openai", tag: "chatgpt", rel: daysAgo(2), cre: daysAgo(900) },
        { slug: "midjourney", name: "Midjourney", desc: "Create stunning visual art and photorealistic images from text prompts.", web: "https://midjourney.com", ver: "6.1", co: "US", feat: true, sp: false, pm: "PAID", pf: 10, vc: 1890000, sc: 32100, ar: 4.7, rc: 2180, cat: "image-generation", comp: "midjourney", tag: "image-generation", rel: daysAgo(5), cre: daysAgo(800) },
        { slug: "claude", name: "Claude", desc: "Anthropic's helpful, harmless, and honest AI assistant for complex reasoning and analysis.", web: "https://claude.ai", ver: "4.0", co: "US", feat: true, sp: false, pm: "FREEMIUM", pf: 20, vc: 1560000, sc: 28900, ar: 4.6, rc: 1890, cat: "chatbot", comp: "anthropic", tag: "chatgpt", rel: daysAgo(1), cre: daysAgo(600) },
        { slug: "cursor", name: "Cursor", desc: "AI-powered code editor that helps you write, edit, and debug code with natural language.", web: "https://cursor.sh", ver: "2.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 20, vc: 890000, sc: 18700, ar: 4.8, rc: 1230, cat: "code", comp: "cursor", tag: "code-editor", rel: daysAgo(3), cre: daysAgo(400) },
        { slug: "sora", name: "Sora", desc: "OpenAI's text-to-video model that creates realistic and imaginative scenes from text.", web: "https://sora.com", ver: "2.0", co: "US", feat: true, sp: false, pm: "PAID", pf: 200, vc: 2100000, sc: 41000, ar: 4.3, rc: 980, cat: "video", comp: "openai", tag: "video-generation", rel: daysAgo(7), cre: daysAgo(300) },
        { slug: "perplexity", name: "Perplexity", desc: "AI-powered search engine that provides accurate, cited answers to any question.", web: "https://perplexity.ai", ver: "3.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 20, vc: 1200000, sc: 22400, ar: 4.4, rc: 1560, cat: "research", comp: "perplexity", tag: "search", rel: hoursAgo(8), cre: daysAgo(500) },
        { slug: "notion-ai", name: "Notion AI", desc: "AI-powered workspace for notes, docs, and project management with built-in intelligence.", web: "https://notion.so", ver: "3.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 10, vc: 980000, sc: 19800, ar: 4.2, rc: 890, cat: "productivity", comp: "notion", tag: "productivity", rel: daysAgo(4), cre: daysAgo(700) },
        { slug: "runway-ml", name: "Runway", desc: "Creative AI toolkit for video editing, generation, and visual effects.", web: "https://runway.ml", ver: "4.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 12, vc: 750000, sc: 14500, ar: 4.3, rc: 670, cat: "video", comp: "runway", tag: "video-editing", rel: hoursAgo(12), cre: daysAgo(600) },
        { slug: "elevenlabs", name: "ElevenLabs", desc: "Ultra-realistic AI voice generation and text-to-speech platform.", web: "https://elevenlabs.io", ver: "3.5", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 5, vc: 670000, sc: 12300, ar: 4.6, rc: 540, cat: "audio", comp: "elevenlabs", tag: "text-to-speech", rel: daysAgo(6), cre: daysAgo(500) },
        { slug: "jasper", name: "Jasper", desc: "AI marketing copilot for creating on-brand content across channels.", web: "https://jasper.ai", ver: "4.0", co: "US", feat: false, sp: true, pm: "PAID", pf: 39, vc: 560000, sc: 9800, ar: 4.1, rc: 780, cat: "marketing", comp: "jasper", tag: "marketing", rel: daysAgo(2), cre: daysAgo(800) },
        { slug: "canva-ai", name: "Canva AI", desc: "AI-powered design tools for creating stunning visuals, presentations, and social media content.", web: "https://canva.com", ver: "2.0", co: "AU", feat: false, sp: false, pm: "FREEMIUM", pf: 13, vc: 890000, sc: 16700, ar: 4.4, rc: 1120, cat: "design", comp: "canva", tag: "design", rel: hoursAgo(2), cre: daysAgo(900) },
        { slug: "github-copilot", name: "GitHub Copilot", desc: "AI pair programmer that helps you write code faster with contextual suggestions.", web: "https://github.com/features/copilot", ver: "3.0", co: "US", feat: false, sp: false, pm: "PAID", pf: 10, vc: 1340000, sc: 25600, ar: 4.5, rc: 2340, cat: "code", comp: "github", tag: "code", rel: daysAgo(10), cre: daysAgo(1000) },
        { slug: "synthesia", name: "Synthesia", desc: "Create professional AI videos with virtual avatars — no camera needed.", web: "https://synthesia.io", ver: "3.2", co: "GB", feat: false, sp: false, pm: "PAID", pf: 22, vc: 430000, sc: 8900, ar: 4.2, rc: 456, cat: "video", comp: "synthesia", tag: "video-editing", rel: daysAgo(8), cre: daysAgo(700) },
        { slug: "grammarly", name: "Grammarly", desc: "AI-powered writing assistant for grammar, clarity, tone, and style improvements.", web: "https://grammarly.com", ver: "5.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 12, vc: 780000, sc: 15400, ar: 4.3, rc: 1890, cat: "writing", comp: "grammarly", tag: "writing", rel: daysAgo(3), cre: daysAgo(1200) },
        { slug: "descript", name: "Descript", desc: "AI-powered video and podcast editing — edit media like editing a document.", web: "https://descript.com", ver: "4.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 24, vc: 340000, sc: 6700, ar: 4.4, rc: 340, cat: "video", comp: "descript", tag: "video-editing", rel: hoursAgo(6), cre: daysAgo(600) },
        { slug: "copy-ai", name: "Copy.ai", desc: "AI-powered platform for generating marketing copy, emails, and sales content.", web: "https://copy.ai", ver: "3.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 36, vc: 450000, sc: 8200, ar: 4.0, rc: 560, cat: "marketing", comp: "copyai", tag: "copywriting", rel: daysAgo(5), cre: daysAgo(800) },
        { slug: "otter-ai", name: "Otter.ai", desc: "AI meeting assistant that records, transcribes, and summarizes meetings in real-time.", web: "https://otter.ai", ver: "4.5", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 17, vc: 520000, sc: 11200, ar: 4.3, rc: 890, cat: "productivity", comp: "otterai", tag: "transcription", rel: hoursAgo(18), cre: daysAgo(700) },
        { slug: "stable-diffusion", name: "Stable Diffusion", desc: "Open-source AI image generation model — run locally or via API.", web: "https://stability.ai", ver: "XL 3.0", co: "GB", feat: false, sp: false, pm: "FREE", pf: 0, vc: 1670000, sc: 34500, ar: 4.4, rc: 2100, cat: "image-generation", comp: "stability", tag: "image-generation", rel: daysAgo(14), cre: daysAgo(900) },
        { slug: "gemini", name: "Gemini", desc: "Google's multimodal AI that understands text, images, code, audio, and video.", web: "https://gemini.google.com", ver: "2.5", co: "US", feat: true, sp: false, pm: "FREEMIUM", pf: 20, vc: 1890000, sc: 29800, ar: 4.3, rc: 1670, cat: "chatbot", comp: "google", tag: "chatgpt", rel: hoursAgo(4), cre: daysAgo(450) },
        { slug: "leonardo-ai", name: "Leonardo.ai", desc: "AI-powered creative suite for generating production-quality visual assets.", web: "https://leonardo.ai", ver: "3.0", co: "AU", feat: false, sp: false, pm: "FREEMIUM", pf: 10, vc: 560000, sc: 10200, ar: 4.5, rc: 450, cat: "image-generation", comp: "leonardo", tag: "image-generation", rel: hoursAgo(1), cre: daysAgo(400) },
        { slug: "zapier-ai", name: "Zapier AI", desc: "Automate workflows between 6,000+ apps using natural language AI commands.", web: "https://zapier.com", ver: "2.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 20, vc: 340000, sc: 7800, ar: 4.1, rc: 320, cat: "automation", comp: "zapier", tag: "automation", rel: daysAgo(9), cre: daysAgo(500) },
        { slug: "writesonic", name: "Writesonic", desc: "AI writing platform for blog posts, ads, product descriptions, and more.", web: "https://writesonic.com", ver: "5.0", co: "US", feat: false, sp: false, pm: "FREEMIUM", pf: 16, vc: 320000, sc: 6100, ar: 4.0, rc: 420, cat: "writing", comp: "writesonic", tag: "writing", rel: daysAgo(6), cre: daysAgo(700) },
        { slug: "photoroom", name: "PhotoRoom", desc: "AI photo editor that removes backgrounds and creates professional product photos instantly.", web: "https://photoroom.com", ver: "4.0", co: "FR", feat: false, sp: false, pm: "FREEMIUM", pf: 10, vc: 410000, sc: 8400, ar: 4.5, rc: 670, cat: "design", comp: "photoroom", tag: "photo-editing", rel: hoursAgo(3), cre: daysAgo(500) },
        { slug: "deepl", name: "DeepL", desc: "AI-powered translation that produces natural, human-sounding results in 30+ languages.", web: "https://deepl.com", ver: "5.0", co: "DE", feat: false, sp: false, pm: "FREEMIUM", pf: 9, vc: 890000, sc: 18900, ar: 4.7, rc: 1230, cat: "translation", comp: "deepl", tag: "translation", rel: daysAgo(4), cre: daysAgo(1100) },
    ];

    for (const t of toolsData) {
        await prisma.tool.create({
            data: {
                slug: t.slug, name: t.name, description: t.desc, website: t.web,
                version: t.ver, country: t.co, isVerified: true, isFeatured: t.feat,
                isSponsored: t.sp, pricingModel: t.pm, priceFrom: t.pf || null,
                priceCurrency: "USD", viewCount: t.vc, saveCount: t.sc, avgRating: t.ar,
                reviewCount: t.rc, releasedAt: t.rel, createdAt: t.cre,
                categoryId: categories[t.cat], companyId: companies[t.comp],
                tags: { create: [{ tagId: tags[t.tag] }] },
            },
        });
        console.log(`  ✅ ${t.name}`);
    }

    // 5. Admin user
    console.log("\n👤 Creating admin user...");
    const admin = await prisma.user.create({
        data: { email: "admin@aptai.com", name: "APT AI Admin", role: "admin", karma: 1000 },
    });
    console.log(`  ✅ ${admin.email}`);

    // 6. Sample comments
    console.log("\n💬 Creating comments...");
    const commentData = [
        { slug: "chatgpt", content: "Still the best all-around AI assistant. GPT-5.2 is a massive leap.", upvotes: 142 },
        { slug: "claude", content: "Claude 4 is incredible for long-form writing and code review.", upvotes: 234 },
        { slug: "cursor", content: "Completely changed how I code. The AI suggestions are next level.", upvotes: 312 },
        { slug: "midjourney", content: "V6.1 is unbelievably good at photorealism. Best image gen tool.", upvotes: 89 },
        { slug: "sora", content: "The future of filmmaking. 60-second clips look professional.", upvotes: 567 },
    ];
    for (const c of commentData) {
        const tool = await prisma.tool.findUnique({ where: { slug: c.slug } });
        if (tool) await prisma.comment.create({ data: { content: c.content, upvotes: c.upvotes, toolId: tool.id, userId: admin.id } });
    }
    console.log("  ✅ Done");

    // 7. Deals
    console.log("\n🏷️  Creating deals...");
    const dealPairs = [
        { slug: "chatgpt", coupon: "APTAI20", disc: 20, orig: 30, deal: 20, days: 3 },
        { slug: "midjourney", coupon: "SAVE30", disc: 30, orig: 15, deal: 10, days: 5 },
        { slug: "claude", coupon: "NEWYEAR", disc: 40, orig: 30, deal: 20, days: 7 },
        { slug: "cursor", coupon: "LAUNCH50", disc: 50, orig: 30, deal: 20, days: 2 },
        { slug: "sora", coupon: "DEAL25", disc: 25, orig: 300, deal: 200, days: 10 },
    ];
    for (const d of dealPairs) {
        const tool = await prisma.tool.findUnique({ where: { slug: d.slug } });
        if (tool) await prisma.deal.create({ data: { couponCode: d.coupon, discount: d.disc, originalPrice: d.orig, dealPrice: d.deal, expiresAt: new Date(now.getTime() + d.days * 86400000), toolId: tool.id } });
    }
    console.log("  ✅ Done");

    // 8. Collections
    console.log("\n📦 Creating collections...");
    const cols = [
        { name: "AI Starter Pack", slug: "ai-starter-pack", desc: "Essential AI tools everyone should know", icon: "🚀" },
        { name: "Best Free AI Tools", slug: "best-free-ai", desc: "Top-tier free AI tools", icon: "🆓" },
        { name: "Developer Toolkit", slug: "dev-toolkit", desc: "AI tools every developer needs", icon: "💻" },
    ];
    for (let i = 0; i < cols.length; i++) {
        const { desc, ...rest } = cols[i];
        const col = await prisma.collection.create({ data: { ...rest, description: desc, userId: admin.id } });
        const tools = await prisma.tool.findMany({ take: 4, skip: i * 3 });
        for (let j = 0; j < tools.length; j++) {
            await prisma.collectionItem.create({ data: { collectionId: col.id, toolId: tools[j].id, position: j } });
        }
    }
    console.log("  ✅ Done");

    console.log("\n🎉 Seed complete! Database is ready.\n");
    await prisma.$disconnect();
}

main().catch(async (e) => { console.error(e); process.exit(1); });
