/* eslint-disable */
/**
 * Category Asset Generator for Bazario Marketplace
 * Creates lightweight on-brand SVG visual cards for all leaf categories.
 * Each card features a department-themed gradient, clean modern iconography, and subtle depth.
 */

const fs = require('fs');
const path = require('path');

const categoriesPath = path.join(__dirname, '../data/categories.json');
const outputDir = path.join(__dirname, '../public/images/categories');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(categoriesPath)) {
  console.error("categories.json not found! Run generate-taxonomy.js first.");
  process.exit(1);
}

const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

const COLOR_MAP = {
  "sustainable-bamboo": ["#059669", "#064E3B"],
  "sustainable-desk-accessories": ["#0284C7", "#0C4A6E"],
  "electronics": ["#6366F1", "#312E81"],
  "mobiles-accessories": ["#EC4899", "#831843"],
  "computers-laptops": ["#3B82F6", "#1E3A8A"],
  "home-kitchen": ["#EA580C", "#7C2D12"],
  "furniture-living": ["#854D0E", "#451A03"],
  "fashion-men": ["#0F766E", "#134E4A"],
  "fashion-women": ["#DB2777", "#701A75"],
  "kids-baby": ["#F59E0B", "#78350F"],
  "beauty-personal-care": ["#BE185D", "#500724"],
  "health-wellness": ["#10B981", "#064E3B"],
  "sports-fitness": ["#F97316", "#7C2D12"],
  "outdoors-travel": ["#047857", "#064E3B"],
  "books-stationery": ["#B45309", "#451A03"],
  "toys-games": ["#8B5CF6", "#4C1D95"],
  "grocery-gourmet": ["#15803D", "#14532D"],
  "pet-supplies": ["#CA8A04", "#713F12"],
  "automotive": ["#475569", "#0F172A"],
  "tools-hardware": ["#D97706", "#78350F"],
  "garden-outdoor-decor": ["#16A34A", "#14532D"],
  "office-products": ["#0284C7", "#075985"],
  "music-instruments": ["#9333EA", "#581C87"],
  "gaming-gear": ["#7C3AED", "#4C1D95"],
  "cameras-photography": ["#4338CA", "#1E1B4B"],
  "smart-home": ["#0D9488", "#115E59"]
};

console.log(`Generating visual cards for ${categories.length} categories...`);

let generated = 0;
categories.forEach((cat) => {
  const [c1, c2] = COLOR_MAP[cat.departmentSlug] || ["#0F766E", "#134E4A"];
  const safeName = cat.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeDept = cat.departmentName.replace(/&/g, '&amp;');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="g_${cat.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <pattern id="grid_${cat.slug}" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background Gradient -->
  <rect width="600" height="450" fill="url(#g_${cat.slug})" />
  <!-- Pattern Grid -->
  <rect width="600" height="450" fill="url(#grid_${cat.slug})" />

  <!-- Geometric Abstract 3D Shapes -->
  <g transform="translate(300, 190)">
    <!-- Base Glow -->
    <circle cx="0" cy="0" r="100" fill="rgba(255,255,255,0.12)" filter="blur(20px)" />
    <!-- Isometric Cube / Cylinder -->
    <path d="M 0 -60 L 65 -22 L 65 50 L 0 88 L -65 50 L -65 -22 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" />
    <path d="M 0 -60 L 65 -22 L 0 15 L -65 -22 Z" fill="rgba(255,255,255,0.3)" />
    <path d="M 0 15 L 0 88" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" />
    <!-- Modern Accent Star -->
    <circle cx="0" cy="15" r="7" fill="#F59E0B" />
  </g>

  <!-- Category Department Pill -->
  <rect x="36" y="36" width="${safeDept.length * 9 + 30}" height="28" rx="14" fill="rgba(0,0,0,0.3)" />
  <text x="51" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#E2E8F0" letter-spacing="0.8">${safeDept.toUpperCase()}</text>

  <!-- Title Bottom Card -->
  <rect x="24" y="340" width="552" height="86" rx="20" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.15)" />
  <text x="46" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF">${safeName}</text>
  <text x="46" y="402" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Curated Marketplace Selection • 100% Quality Assured</text>
</svg>`;

  fs.writeFileSync(path.join(outputDir, `${cat.slug}.svg`), svgContent, 'utf8');
  generated++;
});

console.log(`Generated ${generated} category visual SVG cards in public/images/categories!`);
