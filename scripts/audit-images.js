/**
 * Bazario E-Commerce Image Audit Tool
 * Scans products and categories to audit image coverage, placeholders, duplicates, and accessibility alts.
 */

const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../data/products.json");
const categoriesPath = path.join(__dirname, "../data/categories.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));

console.log("=================================================");
console.log("    BAZARIO E-COMMERCE IMAGE AUDIT REPORT       ");
console.log("=================================================\n");

let svgPlaceholderCount = 0;
let remoteImageCount = 0;
let missingAltCount = 0;
let missingImageCount = 0;
const imageUsageMap = new Map();

for (const p of products) {
  let primaryUrl = "";
  let primaryAlt = "";

  if (Array.isArray(p.images) && p.images.length > 0) {
    const first = p.images[0];
    if (typeof first === "string") {
      primaryUrl = first;
    } else if (first && typeof first === "object") {
      primaryUrl = first.url || "";
      primaryAlt = first.alt || "";
    }
  } else if (typeof p.image === "string") {
    primaryUrl = p.image;
  }

  if (!primaryAlt && p.imageAlt) {
    primaryAlt = p.imageAlt;
  }

  if (!primaryUrl) {
    missingImageCount++;
  } else {
    if (primaryUrl.endsWith(".svg") || primaryUrl.includes("/images/products/") || primaryUrl.includes("/images/categories/")) {
      svgPlaceholderCount++;
    } else {
      remoteImageCount++;
    }

    const count = imageUsageMap.get(primaryUrl) || 0;
    imageUsageMap.set(primaryUrl, count + 1);
  }

  if (!primaryAlt) {
    missingAltCount++;
  }
}

let duplicateImageCount = 0;
for (const [url, count] of imageUsageMap.entries()) {
  if (count > 1) {
    duplicateImageCount += count - 1;
  }
}

// Check category images
let categoriesMissingImage = 0;
for (const c of categories) {
  if (!c.image) {
    categoriesMissingImage++;
  }
}

// Flagship multi-image check
const flagships = products.filter((p) => p.tier === "flagship");
const flagshipsWithGallery = flagships.filter(
  (p) => Array.isArray(p.images) && p.images.length >= 3
);

console.log("--- PRODUCT CATALOG AUDIT ---");
console.log(`Total Products in Catalog:      ${products.length}`);
console.log(`Remote Photographic Images:     ${remoteImageCount}`);
console.log(`Local SVG Cards / Placeholders: ${svgPlaceholderCount}`);
console.log(`Missing Image URLs:             ${missingImageCount}`);
console.log(`Missing Image Alt Attributes:   ${missingAltCount}`);
console.log(`Duplicate Image Reuse Count:    ${duplicateImageCount}`);
console.log(`Unique Image Assets Used:       ${imageUsageMap.size}`);
console.log(`Flagship Products Total:        ${flagships.length}`);
console.log(`Flagships with >= 3 Gallery:    ${flagshipsWithGallery.length} / ${flagships.length}`);

console.log("\n--- CATEGORY TAXONOMY AUDIT ---");
console.log(`Total Leaf Categories:          ${categories.length}`);
console.log(`Categories with Valid Image:    ${categories.length - categoriesMissingImage}`);
console.log(`Categories Missing Image:       ${categoriesMissingImage}`);

console.log("\n=================================================");
if (missingImageCount === 0 && missingAltCount === 0) {
  console.log("STATUS: PASS (Zero missing images, Zero missing alts)");
} else {
  console.log(`STATUS: WARNING (Needs attention: ${missingImageCount} missing images, ${missingAltCount} missing alts)`);
}
console.log("=================================================");
