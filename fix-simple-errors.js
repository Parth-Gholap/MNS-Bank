#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple fixes for critical remaining files
const simpleFixes = [
  {
    file: 'app/[locale]/digital-services/neft-rtgs/page.tsx',
    fixes: [
      { 
        pattern: /locale === 'hi} \? 'भारत भर में धन ट्रांसफर के लिए इलेक्ट्रॉनिक प्रणाली'/g, 
        replacement: "locale === 'hi' ? 'भारत भर में धन ट्रांसफर के लिए इलेक्ट्रॉनिक प्रणाली'" 
      },
      { 
        pattern: /locale === 'hi} \? 'आधार बैच आधार \(2 घंटे\)'/g, 
        replacement: "locale === 'hi' ? 'आधार बैच आधार (2 घंटे)'" 
      }
    ]
  },
  {
    file: 'app/[locale]/digital-services/pan/page.tsx',
    fixes: [
      { 
        pattern: /locale === 'hi} \? 'हमारी बैंक शाखाओं में पैन सेवाएं'/g, 
        replacement: "locale === 'hi' ? 'हमारी बैंक शाखाओं में पैन सेवाएं'" 
      }
    ]
  }
];

// Apply fixes
simpleFixes.forEach(({ file, fixes }) => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    fixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Applied simple fixes to ${file}`);
  }
});

console.log('Simple syntax fixes complete!');
