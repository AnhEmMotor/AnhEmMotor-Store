const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.nuxt') && !file.includes('.output')) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.vue')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./app');
let changed = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let newContent = content
        .replace(/(['"`])(\.\.\/)*stores\//g, '$1~/core/application/stores/')
        .replace(/(['"`])(\.\.\/)*services\//g, '$1~/core/infrastructure/services/');
    
    if (content !== newContent) {
        fs.writeFileSync(f, newContent);
        changed++;
        console.log(`Updated ${f}`);
    }
});
console.log(`Fixed relative imports in ${changed} files`);
