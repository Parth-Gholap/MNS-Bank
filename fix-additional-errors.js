#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Additional fixes for remaining errors
const additionalFixes = [
  // Fix remaining ASBA issues
  {
    file: 'app/[locale]/other-services/asba/page.tsx',
    fixes: [
      { 
        pattern: /locale === 'hi} \? 'नॉमिनी की अनुमति'/g, 
        replacement: "locale === 'hi' ? 'नॉमिनी की अनुमति'" 
      },
      { 
        pattern: /locale === 'hi} \? 'आवेदन भरें'/g, 
        replacement: "locale === 'hi' ? 'आवेदन भरें'" 
      },
      { 
        pattern: /locale === 'hi} \? 'बोली राशि'/g, 
        replacement: "locale === 'hi' ? 'बोली राशि'" 
      }
    ]
  },
  // Fix insurance page
  {
    file: 'app/[locale]/other-services/insurance/page.tsx',
    fixes: [
      { 
        pattern: /{locale === 'hi} => 'फोटोग्राफ'/g, 
        replacement: "{locale === 'hi' ? 'फोटोग्राफ'" 
      }
    ]
  },
  // Fix SMS banking page
  {
    file: 'app/[locale]/digital-services/sms-banking/page.tsx',
    fixes: [
      { 
        pattern: /{locale === 'hi} \?/g, 
        replacement: "{locale === 'hi' ?" 
      }
    ]
  },
  // Fix NEFT/RTGS page
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
  // Fix PAN page
  {
    file: 'app/[locale]/digital-services/pan/page.tsx',
    fixes: [
      { 
        pattern: /locale === 'hi} \? 'हमारी बैंक शाखाओं में पैन सेवाएं'/g, 
        replacement: "locale === 'hi' ? 'हमारी बैंक शाखाओं में पैन सेवाएं'" 
      }
    ]
  },
  // Fix branch locator
  {
    file: 'app/[locale]/locate-us/branch-locator/page.tsx',
    fixes: [
      { 
        pattern: /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div}\s*<\/div>\s*<\/div>\s*<\/div}\s*<\/div>\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*<\/div}\s*\
        replacement: "\n    </div>\n  );\n};"
      }
    }
  ];
  
  // Apply fixes
  additionalFixes.forEach(({ file, fixes }) => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      fixes.forEach(fix => {
        content = content.replace(fix.pattern, fix.replacement);
      });
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Applied additional fixes to ${file}`);
    }
  });
  
  console.log('Additional syntax fixes complete!');
}

// Run the additional fixes
applyAdditionalFixes();
