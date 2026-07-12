const fs = require('fs');
const path = require('path');

const dir = '/Users/Parag/repos/Odoo/feature/crud-ui';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const replacements = [
  { search: /'#fff'/g, replace: "'var(--surface-raised)'" },
  { search: /'#ffffff'/g, replace: "'var(--surface-raised)'" },
  { search: /'#dadce0'/g, replace: "'var(--border-default)'" },
  { search: /'#f1f3f4'/g, replace: "'var(--surface-base)'" },
  { search: /'#fce8e6'/g, replace: "'var(--icon-bg-rose)'" },
  { search: /'#c5221f'/g, replace: "'var(--icon-text-rose)'" },
  { search: /'#fad2cf'/g, replace: "'var(--icon-bg-rose)'" }, // treating as red border
  { search: /'#137333'/g, replace: "'var(--icon-text-emerald)'" },
  { search: /'#e0e0e0'/g, replace: "'var(--border-subtle)'" },
  { search: /'#eee'/g, replace: "'var(--border-subtle)'" },
  { search: /'#b06000'/g, replace: "'var(--icon-text-amber)'" },
  { search: /'#222'/g, replace: "'var(--text-primary)'" },
  { search: /'#888'/g, replace: "'var(--text-muted)'" },
  { search: /'#5f6368'/g, replace: "'var(--text-secondary)'" },
  { search: /'#444'/g, replace: "'var(--text-secondary)'" }
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(({ search, replace }) => {
    content = content.replace(search, replace);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
