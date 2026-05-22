const fs = require('fs');
const path = require('path');

const filesWithLine = [
    "index.html",
    "index-3.html",
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
    "blog.html",
    "blog-details.html",
    "team.html",
    "team-details.html"
];

const filesNoLine = [
    "index-2.html",
    "index-4.html"
];

const workspaceDir = "c:\\Users\\Admin\\Documents\\GitHub\\Neha-Infra";

function makeMenu(hasLine, filename) {
    const isHome = ["index.html", "index-2.html", "index-3.html", "index-4.html"].includes(filename);
    const isAbout = filename === "about.html";
    const isServices = ["services.html", "civil-earthworks.html", "composite-housing.html", "lift-irrigation.html", "residential-building.html", "road-development.html", "stormwater-drains.html"].includes(filename);
    const isPortfolio = ["portfolio.html", "portfolio-details.html"].includes(filename);
    const isContact = filename === "contact.html";

    const homeCls = "dropdown" + (isHome ? " current" : "");
    const aboutCls = "" + (isAbout ? "current" : "");
    const servicesCls = "dropdown" + (isServices ? " current" : "");
    const portfolioCls = "dropdown" + (isPortfolio ? " current" : "");
    const contactCls = "" + (isContact ? "current" : "");

    const lineSpan = hasLine ? ' <span class="line"></span>' : '';

    return `<ul class="main-menu__list">
                                                 <li class="${homeCls}">
                                                     <a href="index.html">Home${lineSpan}</a>
                                                     <ul>
                                                         <li><a href="index.html">Home One</a></li>
                                                         <li><a href="index-2.html">Home Two</a></li>
                                                         <li><a href="index-3.html">Home Three</a></li>
                                                         <li><a href="index-4.html">Home Four</a></li>
                                                         <li class="dropdown">
                                                             <a href="#">Header Styles</a>
                                                             <ul>
                                                                 <li><a href="index.html">Header One</a></li>
                                                                 <li><a href="index-2.html">Header Two</a></li>
                                                                 <li><a href="index-3.html">Header Three</a></li>
                                                                 <li><a href="index-4.html">Header Four</a></li>
                                                             </ul>
                                                         </li>
                                                     </ul>
                                                 </li>

                                                 <li class="${aboutCls}">
                                                     <a href="about.html">About Us${lineSpan}</a>
                                                 </li>

                                                 <li class="${servicesCls}">
                                                     <a href="services.html">Services${lineSpan}</a>
                                                     <ul>
                                                         <li><a href="services.html">All Services</a></li>
                                                         <li><a href="residential-building.html">Residential & Institutional Buildings</a></li>
                                                         <li><a href="road-development.html">Road Development & Improvement</a></li>
                                                         <li><a href="stormwater-drains.html">Stormwater Drains & Sewerage Systems</a></li>
                                                         <li><a href="lift-irrigation.html">Lift Irrigation & Canals</a></li>
                                                         <li><a href="composite-housing.html">Composite Housing & Layouts</a></li>
                                                         <li><a href="civil-earthworks.html">Civil Earthworks & Site Prep</a></li>
                                                     </ul>
                                                 </li>

                                                 <li class="${portfolioCls}">
                                                     <a href="portfolio.html">Completed Projects${lineSpan}</a>
                                                     <ul>
                                                         <li><a href="portfolio.html">Completed Projects</a></li>
                                                         <li><a href="portfolio-details.html">Project Details</a></li>
                                                     </ul>
                                                 </li>

                                                 <li class="${contactCls}">
                                                     <a href="contact.html">Contact Us${lineSpan}</a>
                                                 </li>
                                             </ul>`;
}

function updateMenuInFile(filename, hasLine) {
    const filepath = path.join(workspaceDir, filename);
    if (!fs.existsSync(filepath)) {
        console.log(`File ${filename} does not exist!`);
        return false;
    }

    let content = fs.readFileSync(filepath, 'utf8');
    const menuHtml = makeMenu(hasLine, filename);

    // Find `<div class="main-menu-box">` block and replace it
    const pattern = /<div class="main-menu-box">[\s\S]*?<\/div>/;
    
    const newBox = `<div class="main-menu-box">
                                             <a href="#" class="mobile-nav__toggler">
                                                 <i class="fa fa-bars"></i>
                                             </a>
                                             ${menuHtml}
                                         </div>`;

    if (pattern.test(content)) {
        const updatedContent = content.replace(pattern, newBox);
        fs.writeFileSync(filepath, updatedContent, 'utf8');
        console.log(`Successfully updated menu in ${filename}`);
        return true;
    } else {
        console.log(`Failed to find main-menu-box in ${filename}`);
        return false;
    }
}

// Update all files
filesWithLine.forEach(file => updateMenuInFile(file, true));
filesNoLine.forEach(file => updateMenuInFile(file, false));

console.log("All menu updates completed!");
