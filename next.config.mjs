/** @type {import('next').NextConfig} */
const nextConfig = {
    // Vercel handles standard Next.js apps natively. 
    // We shouldn't need `output: "export"` unless we're deploying to static hosts like GH Pages.
    // However, since the app is embedded in `assets/`, let's make sure the builder knows.
};

export default nextConfig;
