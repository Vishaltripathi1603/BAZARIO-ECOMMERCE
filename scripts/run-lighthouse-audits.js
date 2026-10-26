/* eslint-disable */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targets = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'category', url: 'http://localhost:3000/category/sustainable-bamboo' },
  { name: 'product', url: 'http://localhost:3000/products/bamboo-laptop-stand-riser' },
  { name: 'blog', url: 'http://localhost:3000/blog/why-choose-bamboo-over-plastic' }
];

const results = [];

targets.forEach(t => {
  ['mobile', 'desktop'].forEach(preset => {
    console.log(`Running Lighthouse on ${t.name} (${preset})...`);
    const outputPath = path.join(__dirname, `../docs/lighthouse/${t.name}-${preset}.json`);
    const desktopFlag = preset === 'desktop' ? '--preset=desktop' : '';
    const cmd = `npx lighthouse "${t.url}" --chrome-flags="--headless --no-sandbox" --output=json --output-path="${outputPath}" --only-categories=performance,accessibility,best-practices,seo --quiet ${desktopFlag}`;

    try {
      execSync(cmd, { stdio: 'pipe' });
      const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      const scores = {
        page: t.name,
        url: t.url,
        device: preset,
        performance: Math.round((data.categories.performance?.score || 0) * 100),
        accessibility: Math.round((data.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((data.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((data.categories.seo?.score || 0) * 100)
      };
      results.push(scores);
      console.log(`[PASS] ${t.name} (${preset}): Perf=${scores.performance}, A11y=${scores.accessibility}, BP=${scores.bestPractices}, SEO=${scores.seo}`);
    } catch (err) {
      console.error(`Error auditing ${t.name} (${preset}):`, err.message);
    }
  });
});

fs.writeFileSync(path.join(__dirname, '../docs/lighthouse-scores.json'), JSON.stringify(results, null, 2), 'utf8');
console.log('Lighthouse audit run finished. Results saved to docs/lighthouse-scores.json');
