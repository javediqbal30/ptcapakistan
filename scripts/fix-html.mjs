import fs from 'fs';
const file = 'C:/ptcapakistan/src/pages/index.astro';
let content = fs.readFileSync(file, 'utf8');

// 1. Change section class
content = content.replace('<section class="section corporate-hero">', '<section class="section corporate-training-section">');

// 2. Wrap SectionHead in dark div
const oldContainer = '<div class="container">\n      <SectionHead';
const newContainer = '<div class="corporate-hero-bg">\n      <div class="container">\n        <SectionHead';
content = content.replace(oldContainer, newContainer);

// 3. Close dark div after SectionHead and start cards on light bg
const oldAfterHead = '      />\n      <div class="grid grid--3" style="margin-top: var(--space-8);">';
const newAfterHead = '      />\n      </div>\n    </div>\n    <div class="container">\n      <div class="grid grid--3" style="margin-top: var(--space-4);">';
content = content.replace(oldAfterHead, newAfterHead);

fs.writeFileSync(file, content);
console.log('HTML updated');