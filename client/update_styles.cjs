const fs = require('fs');
const path = require('path');

const dir = '/Users/Parag/repos/Odoo/feature/crud-ui';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const replacements = [
  { search: /backgroundColor:\s*'#fafafa'/g, replace: "backgroundColor: 'var(--surface-base)'" },
  { search: /backgroundColor:\s*'#fff'/g, replace: "backgroundColor: 'var(--surface-raised)'" },
  { search: /backgroundColor:\s*'#f8f9fa'/g, replace: "backgroundColor: 'var(--surface-base)'" },
  { search: /color:\s*'#333'/g, replace: "color: 'var(--text-primary)'" },
  { search: /color:\s*'#111'/g, replace: "color: 'var(--text-primary)'" },
  { search: /color:\s*'#555'/g, replace: "color: 'var(--text-secondary)'" },
  { search: /color:\s*'#666'/g, replace: "color: 'var(--text-secondary)'" },
  { search: /color:\s*'#777'/g, replace: "color: 'var(--text-muted)'" },
  { search: /border:\s*'1px solid #ddd'/g, replace: "border: '1px solid var(--border-default)'" },
  { search: /borderBottom:\s*'1px solid #eee'/g, replace: "borderBottom: '1px solid var(--border-subtle)'" },
  { search: /borderTop:\s*'1px solid #eee'/g, replace: "borderTop: '1px solid var(--border-subtle)'" },
  { search: /backgroundColor:\s*'#1a73e8'/g, replace: "backgroundColor: 'var(--icon-text-emerald)'" },
  { search: /color:\s*'#d93025'/g, replace: "color: 'var(--icon-text-rose)'" },
  // Status badges
  { search: /backgroundColor:\s*'#e6f4ea'/g, replace: "backgroundColor: 'var(--icon-bg-emerald)'" },
  { search: /color:\s*'#137333'/g, replace: "color: 'var(--icon-text-emerald)'" },
  { search: /backgroundColor:\s*'#e8f0fe'/g, replace: "backgroundColor: 'var(--icon-bg-cyan)'" },
  { search: /color:\s*'#1a73e8'/g, replace: "color: 'var(--icon-text-cyan)'" },
  { search: /backgroundColor:\s*'#fef7e0'/g, replace: "backgroundColor: 'var(--icon-bg-amber)'" },
  { search: /color:\s*'#b06000'/g, replace: "color: 'var(--icon-text-amber)'" },
  { search: /backgroundColor:\s*'#f1f3f4'/g, replace: "backgroundColor: 'var(--icon-bg-slate)'" },
  { search: /color:\s*'#3c4043'/g, replace: "color: 'var(--icon-text-slate)'" },
  // Form input backgrounds
  { search: /backgroundColor:\s*'white'/g, replace: "backgroundColor: 'var(--surface-raised)'" },
  { search: /backgroundColor:\s*'#f5f5f5'/g, replace: "backgroundColor: 'var(--surface-base)'" },
  { search: /border:\s*'1px solid #ccc'/g, replace: "border: '1px solid var(--border-default)'" }
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
