const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const shell = fs.readFileSync(path.join(__dirname, 'mobile-shell.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'mobile.html'), html.replace('</html>', shell + '</html>'));
console.log('mobile.html generated');
