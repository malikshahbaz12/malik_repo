/**
 * Automated Component Conversion Script
 * Converts Next.js components to Vite + React
 * 
 * Usage: node convert-components.js
 */

const fs = require('fs');
const path = require('path');

// Conversion rules
const conversions = {
  // Remove 'use client' directive
  removeUseClient: (content) => {
    return content.replace(/'use client'\n/g, '');
  },
  
  // Convert Next.js imports
  convertImports: (content) => {
    // usePathname to useLocation
    content = content.replace(
      /import\s*{\s*usePathname\s*}\s*from\s*['"]next\/navigation['"]/g,
      "import { useLocation } from 'react-router-dom'"
    );
    
    // Next Link to React Router Link
    content = content.replace(
      /import\s+Link\s+from\s+['"]next\/link['"]/g,
      "import { Link } from 'react-router-dom'"
    );
    
    // Next Image removal (will be handled separately)
    content = content.replace(
      /import\s+Image\s+from\s+['"]next\/image['"]\n/g,
      ''
    );
    
    return content;
  },
  
  // Convert usePathname to useLocation
  convertPathname: (content) => {
    content = content.replace(
      /const\s+pathname\s*=\s*usePathname\(\)/g,
      'const location = useLocation()\n  const pathname = location.pathname'
    );
    
    return content;
  },
  
  // Convert Link href to to
  convertLinks: (content) => {
    content = content.replace(
      /<Link\s+href=/g,
      '<Link to='
    );
    
    return content;
  },
  
  // Convert Next Image to img tag
  convertImages: (content) => {
    // This is a simplified conversion - manual review recommended
    content = content.replace(
      /<Image\s+([^>]*?)\/>/g,
      (match, attrs) => {
        // Extract src and alt
        const srcMatch = attrs.match(/src=["']([^"']+)["']/);
        const altMatch = attrs.match(/alt=["']([^"']+)["']/);
        const classMatch = attrs.match(/className={([^}]+)}/);
        
        const src = srcMatch ? srcMatch[1] : '';
        const alt = altMatch ? altMatch[1] : '';
        const className = classMatch ? `className={${classMatch[1]}}` : '';
        
        return `<img src="${src}" alt="${alt}" ${className} />`;
      }
    );
    
    return content;
  }
};

// Apply all conversions
function convertFile(content) {
  let converted = content;
  
  converted = conversions.removeUseClient(converted);
  converted = conversions.convertImports(converted);
  converted = conversions.convertPathname(converted);
  converted = conversions.convertLinks(converted);
  converted = conversions.convertImages(converted);
  
  return converted;
}

// Process a single file
function processFile(filePath, outputPath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const converted = convertFile(content);
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, converted, 'utf8');
    console.log(`✅ Converted: ${filePath} → ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
  }
}

// Process directory recursively
function processDirectory(sourceDir, outputDir) {
  const items = fs.readdirSync(sourceDir);
  
  items.forEach(item => {
    const sourcePath = path.join(sourceDir, item);
    const outputPath = path.join(outputDir, item);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      processDirectory(sourcePath, outputPath);
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      processFile(sourcePath, outputPath);
    } else {
      // Copy non-JS files as-is (SCSS, etc.)
      if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      }
      fs.copyFileSync(sourcePath, outputPath);
      console.log(`📋 Copied: ${sourcePath} → ${outputPath}`);
    }
  });
}

// Main execution
console.log('🚀 Starting Next.js to Vite conversion...\n');

// Convert components
console.log('📦 Converting components...');
processDirectory('../components', './src/components');

// Convert styles
console.log('\n🎨 Copying styles...');
processDirectory('../styles', './src/styles');

// Copy public assets
console.log('\n🖼️  Copying public assets...');
processDirectory('../public', './public');

console.log('\n✨ Conversion complete!');
console.log('\n⚠️  IMPORTANT: Manual review required for:');
console.log('   - Image components (verify img tags)');
console.log('   - Complex routing logic');
console.log('   - Any custom Next.js features');
console.log('\n📝 Next steps:');
console.log('   1. Review converted files');
console.log('   2. Run: npm install');
console.log('   3. Run: npm run dev');
console.log('   4. Test all functionality');
