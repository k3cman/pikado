const fs = require('fs');
const path = require('path');

// Config: Files to ignore
const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', '.vscode', 'public']);
const IGNORE_FILES = new Set(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bundle-project.js', 'codebase_dump.txt', '.DS_Store']);
const ALLOWED_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.sql', '.prisma']);

// The output file
const OUTPUT_FILE = 'codebase_dump.txt';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (!IGNORE_DIRS.has(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (!IGNORE_FILES.has(file) && ALLOWED_EXTENSIONS.has(path.extname(file))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

const projectRoot = __dirname;
const allFiles = getAllFiles(projectRoot);

let output = `Project Scan Timestamp: ${new Date().toISOString()}\n\n`;

console.log(`Scanning ${projectRoot}...`);

allFiles.forEach(filePath => {
  const relativePath = path.relative(projectRoot, filePath);
  
  // Skip env files for security
  if (relativePath.includes('.env')) return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    output += `\n================================================================================\n`;
    output += `FILE: ${relativePath}\n`;
    output += `================================================================================\n`;
    output += content + `\n\n`;
    console.log(`Included: ${relativePath}`);
  } catch (e) {
    console.log(`Skipped (Read Error): ${relativePath}`);
  }
});

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`\nDone! All code written to ${OUTPUT_FILE}`);