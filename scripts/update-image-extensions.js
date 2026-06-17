const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const directoriesToScan = ['./src', './scripts'];
let files = [];

directoriesToScan.forEach(dir => {
  if (fs.existsSync(dir)) {
    files = files.concat(walk(dir));
  }
});

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('.png') || content.includes('.jpg') || content.includes('.jpeg')) {
    // Replace all static image extensions with .webp
    const newContent = content
      .replace(/\.png/g, '.webp')
      .replace(/\.jpg/g, '.webp')
      .replace(/\.jpeg/g, '.webp');
      
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Updated extensions in:', file);
      updatedCount++;
    }
  }
});

console.log(`\nSuccessfully updated image extensions in ${updatedCount} files.`);
