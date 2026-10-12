// Resolve a static asset path against the base URL the app is served from.
//
// The site is published to GitHub Pages as a *project* page:
// https://kratos606.github.io/portal/
// so a hard-coded "/cube.glb" resolves to https://kratos606.github.io/cube.glb
// and 404s. Prefixing with Vite's import.meta.env.BASE_URL keeps local dev
// (base "/") and the deployed build (base "/portal/") both working.
//
// Files affected live in /public and are copied as-is into dist on every build.
export default function assetPath(file) {
    return `${import.meta.env.BASE_URL}${file}`
}
