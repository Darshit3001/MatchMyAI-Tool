const { execSync } = require('child_process');
require('dotenv').config();

const url = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

if (!url || !token) {
    console.error("Missing TURSO config in .env");
    process.exit(1);
}

// Ensure the schema has url = env("DATABASE_URL")
const fs = require('fs');
let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
if (!schema.includes('url      = env("DATABASE_URL")')) {
    schema = schema.replace('provider = "sqlite"', 'provider = "sqlite"\n  url      = env("DATABASE_URL")');
    fs.writeFileSync('prisma/schema.prisma', schema);
}

// Remove url override from prisma.config.ts temporarily to allow schema to take precedence
let config = fs.readFileSync('prisma.config.ts', 'utf8');
const originalConfig = config;
if (config.includes('url:')) {
    config = config.replace(/url:(.*),/g, '// url overridden');
    fs.writeFileSync('prisma.config.ts', config);
}

const fullUrl = `${url}?authToken=${token}`;

try {
    console.log("Running prisma db push...");
    execSync('npx prisma db push --accept-data-loss', {
        env: { ...process.env, DATABASE_URL: fullUrl },
        stdio: 'inherit'
    });
} catch (e) {
    console.error("Push failed:", e.message);
} finally {
    console.log("Restoring config...");
    fs.writeFileSync('prisma.config.ts', originalConfig);
    // Restore schema
    schema = schema.replace('\n  url      = env("DATABASE_URL")', '');
    fs.writeFileSync('prisma/schema.prisma', schema);
}
