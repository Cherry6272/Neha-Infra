const fs = require('fs');
const path = require('path');

const workspaceDir = "c:\\Users\\Admin\\Documents\\GitHub\\Neha-Infra";

const targetFiles = [
    "about.html",
    "services.html",
    "portfolio.html",
    "portfolio-details.html",
    "contact.html",
    "civil-earthworks.html",
    "composite-housing.html",
    "lift-irrigation.html",
    "residential-building.html",
    "road-development.html",
    "stormwater-drains.html",
    "index-4.html"
];

// 1. Read index.html to extract the Header Two block
const indexFilepath = path.join(workspaceDir, "index.html");
if (!fs.existsSync(indexFilepath)) {
    console.error("index.html not found! Cannot extract Header Two.");
    process.exit(1);
}

const indexContent = fs.readFileSync(indexFilepath, 'utf8');
const headerRegex = /(<!--Start Main Header Two-->[\s\S]*?<!--End Main Header Two-->)/;
const match = indexContent.match(headerRegex);

if (!match) {
    console.error("Could not find Main Header Two in index.html!");
    process.exit(1);
}

const headerTwoBlock = match[1];
console.log("Successfully extracted Header Two block from index.html.");

// 2. Process each target file
targetFiles.forEach(file => {
    const filepath = path.join(workspaceDir, file);
    if (!fs.existsSync(filepath)) {
        console.warn(`File not found: ${file}, skipping.`);
        return;
    }

    let content = fs.readFileSync(filepath, 'utf8');

    // Replace Header One block with Header Two block
    const headerOneRegex = /<!--Start Main Header One-->[\s\S]*?<!--End Main Header One-->/;
    if (headerOneRegex.test(content)) {
        content = content.replace(headerOneRegex, headerTwoBlock);
        console.log(`- Replaced Header One with Header Two in ${file}`);
    } else {
        console.warn(`- Could not find Header One block in ${file}`);
    }

    // Replace sticky header class stricky-header--one with stricky-header--two
    if (content.includes("stricky-header--one")) {
        content = content.replace(/stricky-header--one/g, "stricky-header--two");
        console.log(`- Updated sticky header to stricky-header--two in ${file}`);
    }

    fs.writeFileSync(filepath, content, 'utf8');
});

console.log("\nHeader standardization complete! Please run update_menus.js next to sync navigation lists.");
