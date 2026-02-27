const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('d:/Apps/dpsg/greenfield/assets/css/style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const rootRegex = /:root\s*\{([\s\S]*?)\}/;
const oldRootMatch = css.match(rootRegex);
const originalRootContent = oldRootMatch ? oldRootMatch[1] : '';

function abstractVars(content) {
    let c = content;
    c = c.replace(/var\(--font-serif\)/g, 'var(--heading-font)');
    c = c.replace(/var\(--font-sans\)/g, 'var(--body-font)');
    c = c.replace(/var\(--cream\)/g, 'var(--background-color)');
    c = c.replace(/var\(--cream-dark\)/g, 'color-mix(in srgb, var(--background-color), black 5%)');
    c = c.replace(/color: var\(--white\)/g, 'color: var(--text-color-inv, #fff)');
    c = c.replace(/background: var\(--white\)/g, 'background: var(--background-color)');
    c = c.replace(/var\(--green-900\)/g, 'var(--primary-dark)');
    c = c.replace(/var\(--green-800\)/g, 'color-mix(in srgb, var(--primary-dark), white 10%)');
    c = c.replace(/var\(--green-700\)/g, 'color-mix(in srgb, var(--primary-dark), white 20%)');
    c = c.replace(/var\(--green-600\)/g, 'var(--primary-color)');
    c = c.replace(/var\(--green-500\)/g, 'color-mix(in srgb, var(--primary-color), white 15%)');
    c = c.replace(/var\(--green-400\)/g, 'color-mix(in srgb, var(--primary-color), white 30%)');
    c = c.replace(/var\(--green-300\)/g, 'color-mix(in srgb, var(--primary-color), white 45%)');
    c = c.replace(/var\(--gold-600\)/g, 'color-mix(in srgb, var(--accent-color), black 15%)');
    c = c.replace(/var\(--gold-500\)/g, 'var(--accent-color)');
    c = c.replace(/var\(--gold-400\)/g, 'color-mix(in srgb, var(--accent-color), white 15%)');
    c = c.replace(/var\(--gold-300\)/g, 'color-mix(in srgb, var(--accent-color), white 30%)');
    c = c.replace(/var\(--text-dark\)/g, 'var(--text-color)');
    c = c.replace(/var\(--text-mid\)/g, 'color-mix(in srgb, var(--text-color), transparent 20%)');
    c = c.replace(/var\(--text-light\)/g, 'color-mix(in srgb, var(--text-color), transparent 40%)');

    c = c.replace(/rgba\(\s*10,\s*31,\s*16,\s*([0-9.]+)\s*\)/g, function (m, p1) { return "color-mix(in srgb, var(--primary-dark) " + parseFloat(p1) * 100 + "%, transparent)" });
    c = c.replace(/rgba\(\s*45,\s*143,\s*78,\s*([0-9.]+)\s*\)/g, function (m, p1) { return "color-mix(in srgb, var(--primary-color) " + parseFloat(p1) * 100 + "%, transparent)" });
    c = c.replace(/rgba\(\s*30,\s*102,\s*51,\s*([0-9.]+)\s*\)/g, function (m, p1) { return "color-mix(in srgb, var(--primary-color) " + parseFloat(p1) * 100 + "%, transparent)" });
    c = c.replace(/rgba\(\s*212,\s*160,\s*23,\s*([0-9.]+)\s*\)/g, function (m, p1) { return "color-mix(in srgb, var(--accent-color) " + parseFloat(p1) * 100 + "%, transparent)" });
    c = c.replace(/rgba\(\s*255,\s*255,\s*255,\s*([0-9.]+)\s*\)/g, function (m, p1) { return "color-mix(in srgb, #fff " + parseFloat(p1) * 100 + "%, transparent)" });
    c = c.replace(/rgba\(\s*0,\s*0,\s*0,\s*([0-9.]+)\s*\)/g, function (m, p1) { return "color-mix(in srgb, #000 " + parseFloat(p1) * 100 + "%, transparent)" });
    return c;
}

let baseCss = abstractVars(css);
const newRoot = ":root {\n" +
    "    --primary-color: #2d8f4e;\n" +
    "    --primary-dark: #0a1f10;\n" +
    "    --accent-color: #d4a017;\n" +
    "    --background-color: #f9f5ee;\n" +
    "    --text-color: #0a1f10;\n" +
    "    --text-color-inv: #ffffff;\n" +
    "    --heading-font: 'Cormorant Garamond', Georgia, serif;\n" +
    "    --body-font: 'Inter', system-ui, sans-serif;\n" +
    "    --cta-style: 100px;\n" +
    "    --radius-style: 1rem;\n" +
    "    --radius-sm-style: 0.5rem;\n" +
    "    --shadow: 0 4px 24px color-mix(in srgb, var(--primary-dark) 8%, transparent);\n" +
    "    --shadow-lg: 0 12px 48px color-mix(in srgb, var(--primary-dark) 15%, transparent);\n" +
    "    --transition: 0.35s cubic-bezier(.4, 0, .2, 1);\n" +
    "}";
baseCss = baseCss.replace(rootRegex, newRoot);

baseCss = baseCss.replace(/border-radius:\s*var\(--radius\)/g, 'border-radius: var(--radius-style)');
baseCss = baseCss.replace(/border-radius:\s*var\(--radius-sm\)/g, 'border-radius: var(--radius-sm-style)');
baseCss = baseCss.replace(/border-radius:\s*100px/g, 'border-radius: var(--cta-style)');

fs.writeFileSync(path.resolve('d:/Apps/dpsg/greenfield/assets/css/base.css'), baseCss, 'utf8');
console.log('Created base.css');

const themeProgressive = ":root {\n" +
    "    --primary-color: #1e6633;\n" +
    "    --primary-dark: #0a1f10;\n" +
    "    --accent-color: #d4a017;\n" +
    "    --background-color: #f9f5ee;\n" +
    "    --text-color: #0a1f10;\n" +
    "    --text-color-inv: #ffffff;\n" +
    "    --heading-font: 'Cormorant Garamond', Georgia, serif;\n" +
    "    --body-font: 'Inter', system-ui, sans-serif;\n" +
    "    --cta-style: 100px;\n" +
    "    --radius-style: 1rem;\n" +
    "    --radius-sm-style: 0.5rem;\n" +
    "}\n";
fs.writeFileSync(path.resolve('d:/Apps/dpsg/greenfield/assets/css/theme-progressive.css'), themeProgressive, 'utf8');

const themePrestige = ":root {\n" +
    "    --primary-color: #0B1F3A;\n" +
    "    --primary-dark: #07152B;\n" +
    "    --accent-color: #C6A75E;\n" +
    "    --background-color: #F5F2EA;\n" +
    "    --text-color: #0B1F3A;\n" +
    "    --text-color-inv: #F5F2EA;\n" +
    "    --heading-font: 'Playfair Display', serif;\n" +
    "    --body-font: 'Inter', sans-serif;\n" +
    "    --cta-style: 100px;\n" +
    "    --radius-style: 0.8rem;\n" +
    "    --radius-sm-style: 0.4rem;\n" +
    "}\n" +
    ".btn--primary { background: transparent !important; border: 2px solid var(--accent-color) !important; color: var(--primary-color) !important; }\n" +
    ".btn--primary:hover { background: var(--accent-color) !important; color: #fff !important; }\n" +
    ".nav__inner { justify-content: space-between; }\n" +
    ".nav__links { margin: 0; }\n";
fs.writeFileSync(path.resolve('d:/Apps/dpsg/greenfield/assets/css/theme-prestige.css'), themePrestige, 'utf8');

const themeMinimal = ":root {\n" +
    "    --primary-color: #111111;\n" +
    "    --primary-dark: #000000;\n" +
    "    --accent-color: #1F3A2F;\n" +
    "    --background-color: #FFFFFF;\n" +
    "    --text-color: #111111;\n" +
    "    --text-color-inv: #FFFFFF;\n" +
    "    --heading-font: 'DM Serif Display', serif;\n" +
    "    --body-font: 'IBM Plex Sans', sans-serif;\n" +
    "    --cta-style: 0px;\n" +
    "    --radius-style: 0px;\n" +
    "    --radius-sm-style: 0px;\n" +
    "}\n" +
    ".btn { border-radius: 0 !important; }\n" +
    ".nav { background: rgba(255, 255, 255, 0.9) !important; }\n" +
    ".nav.scrolled { background: rgba(255, 255, 255, 1) !important; border-bottom: 1px solid #eee; }\n" +
    ".logo-text, .logo-text small, .nav__links a, .nav__burger span { color: #111 !important; }\n" +
    ".nav__links a:hover, .nav__links a.active { background: transparent !important; border-bottom: 1px solid #111; border-radius: 0; }\n";
fs.writeFileSync(path.resolve('d:/Apps/dpsg/greenfield/assets/css/theme-minimal.css'), themeMinimal, 'utf8');

const themeTech = ":root {\n" +
    "    --primary-color: #0A0F1F;\n" +
    "    --primary-dark: #050811;\n" +
    "    --accent-color: #00C2A8;\n" +
    "    --background-color: #0F172A;\n" +
    "    --text-color: #E2E8F0;\n" +
    "    --text-color-inv: #FFFFFF;\n" +
    "    --heading-font: 'Sora', sans-serif;\n" +
    "    --body-font: 'Inter', sans-serif;\n" +
    "    --cta-style: 8px;\n" +
    "    --radius-style: 12px;\n" +
    "    --radius-sm-style: 6px;\n" +
    "}\n" +
    ".btn--primary { background: linear-gradient(135deg, var(--accent-color), #0075FF) !important; border: none !important; box-shadow: 0 4px 15px color-mix(in srgb, var(--accent-color) 40%, transparent); }\n" +
    ".btn--primary:hover { box-shadow: 0 6px 20px color-mix(in srgb, var(--accent-color) 60%, transparent); }\n" +
    ".nav { background: transparent !important; }\n" +
    ".nav.scrolled { background: rgba(10, 15, 31, 0.95) !important; }\n" +
    ".nav__links a { position: relative; }\n" +
    ".nav__links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--accent-color); transition: 0.3s; }\n" +
    ".nav__links a:hover::after, .nav__links a.active::after { width: 100%; }\n" +
    ".nav__links a:hover, .nav__links a.active { background: transparent !important; color: var(--accent-color) !important; }\n";
fs.writeFileSync(path.resolve('d:/Apps/dpsg/greenfield/assets/css/theme-tech.css'), themeTech, 'utf8');

fs.unlinkSync(cssPath);
console.log('Removed original style.css, generated base.css and themes.');
