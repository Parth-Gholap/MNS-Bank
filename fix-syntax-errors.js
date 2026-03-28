#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to fix
const filesToFix = [
  'app/[locale]/other-services/asba/page.tsx',
  'app/[locale]/other-services/download-forms/page.tsx',
  'app/[locale]/other-services/insurance/page.tsx',
  'app/[locale]/other-services/mutual-funds/page.tsx',
  'app/[locale]/digital-services/pan/page.tsx',
  'app/[locale]/digital-services/sms-banking/page.tsx',
  'app/[locale]/digital-services/neft-rtgs/page.tsx',
  'app/[locale]/locate-us/branch-locator/page.tsx',
  'app/[locale]/locate-us/atm-locator/page.tsx',
  'app/[locale]/about-us/careers/page.tsx',
  'app/[locale]/about-us/membership/page.tsx'
];

// Common fixes
const fixes = [
  // Fix ternary operators: locale === 'hi} ? -> locale === 'hi' ?
  { pattern: /locale === 'hi} \?/g, replacement: "locale === 'hi' ?" },
  
  // Fix ternary operators: locale === 'hi} -> locale === 'hi' ?
  { pattern: /locale === 'hi}([^?])/g, replacement: "locale === 'hi' ?$1" },
  
  // Fix array syntax: remove duplicate entries
  { pattern: /locale === 'hi' \? 'बड़ी आईपीओ के लिए उपयुक्त' : 'Suitable for large IPOs',\s*locale === 'hi' \? 'व्यापारिक लेनदेन के लिए उपयुक्त' : 'Suitable for business transactions',\s*locale === 'hi' \? 'बड़ी आईपीओ के लिए उपयुक्त' : 'Suitable for large IPOs'/g, 
    replacement: "locale === 'hi' ? 'बड़ी आईपीओ के लिए उपयुक्त' : 'Suitable for large IPOs',\n        locale === 'hi' ? 'व्यापारिक लेनदेन के लिए उपयुक्त' : 'Suitable for business transactions'" },
  
  // Fix unterminated strings
  { pattern: /locale === 'hi} \? '([^']+)'/g, replacement: "locale === 'hi' ? '$1'" },
  
  // Fix JSX issues
  { pattern: /{locale === 'hi} \? '([^']+)'/g, replacement: "{locale === 'hi' ? '$1'" },
  
  // Fix regex issues
  { pattern: /locale === 'hi} \? '([^']+)'/g, replacement: "locale === 'hi' ? '$1'" }
];

function fixFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      return false;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;
    
    fixes.forEach(fix => {
      const originalContent = content;
      content = content.replace(fix.pattern, fix.replacement);
      if (content !== originalContent) {
        changed = true;
        console.log(`Applied fix to ${filePath}: ${fix.pattern}`);
      }
    });
    
    if (changed) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Fix all files
console.log('Starting syntax fixes...');
let fixedCount = 0;

filesToFix.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} out of ${filesToFix.length} files`);

// Additional specific fixes for known issues
const specificFixes = [
  {
    file: 'app/[locale]/other-services/asba/page.tsx',
    fixes: [
      { pattern: /locale === 'hi} \? 'नॉमिनी की अनुमति'/g, replacement: "locale === 'hi' ? 'नॉमिनी की अनुमति'" },
      { pattern: /locale === 'hi} \? 'आवेदन भरें'/g, replacement: "locale === 'hi' ? 'आवेदन भरें'" },
      { pattern: /locale === 'hi} \? 'बोली राशि'/g, replacement: "locale === 'hi' ? 'बोली राशि'" }
    ]
  }
];

specificFixes.forEach(({ file, fixes }) => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    fixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Applied specific fixes to ${file}`);
  }
});

console.log('Syntax fix complete!');
