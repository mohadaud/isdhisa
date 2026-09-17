const fs = require('fs');

function stripModuleSyntax(code) {
  return code
    .split('\n')
    .filter(line => !/^\s*import\s/.test(line))
    .filter(line => !/^export default\s+App;?\s*$/.test(line.trim()) ? true : false)
    .map(line => {
      let l = line.replace(/^export default function\s+/, 'function ');
      l = l.replace(/^export default\s+\w+;?\s*$/, '');
      l = l.replace(/^export const\s+/, 'const ');
      l = l.replace(/^export function\s+/, 'function ');
      return l;
    })
    .join('\n');
}

const read = p => fs.readFileSync(p, 'utf8');
const bg = fs.readFileSync('public/bg.png').toString('base64');
const fav = fs.readFileSync('public/favicon.svg').toString('base64');

let html = read(__dirname + '/template_top.tmp');
// Inline vendored libraries (offline build)
const vendorFiles = ['react.production.min.js', 'react-dom.production.min.js', 'react-is.production.min.js', 'Recharts.js', 'babel.min.js'];
for (const vf of vendorFiles) {
  const marker = '<!--VENDOR_INLINE:' + vf + '-->';
  if (!html.includes(marker)) { console.error('ERROR: vendor marker missing: ' + vf); process.exit(1); }
  const raw = read(__dirname + '/vendor/' + vf);
  const code = raw.split(String.fromCharCode(10)).filter(l => !l.startsWith('// sourceMappingURL=')).join(String.fromCharCode(10));
  if (code.includes('<' + '/script')) { console.error('ERROR: ' + vf + ' contains closing script tag'); process.exit(1); }
  html = html.split(marker).join('<script>' + code + '</script>');
}
// Inline embedded Inter font (JS that document.writes a <style> block)
const fMarker = '<!--FONTS_INLINE-->';
if (!html.includes(fMarker)) { console.error('ERROR: font marker missing'); process.exit(1); }
html = html.split(fMarker).join('<script>' + read(__dirname + '/vendor/fonts_inline.js') + '</script>');

// CSS (from real src/index.css on disk)
const css = read('src/index.css').replace("@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');", '');
const cssFixed = css.replace("url('/bg.png')", 'url("data:image/jpeg;base64,__BG_B64__")');
html += cssFixed + '\n    </style>\n  </head>\n  <body>\n';

// Loading placeholder (replaced by React)
html += '    <div id="root">\n      <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;color:#9585b8;font-family:\'Inter\',sans-serif;">\n        ⏳ Loading Lavender Fit…\n      </div>\n    </div>\n\n';

// Babel script opens
html += '    <script type="text/babel" data-presets="react">\n';

const prelude = `/* =========================================================================
   Lavender Fit — Calisthenics Tracker
   Single-file build. Originally spread across:
   src/hooks/useLocalStorage.js, src/data/*.js, src/components/*.jsx, src/App.jsx
   Icons are embedded lucide-react (ISC license) node data + a tiny factory.
   ========================================================================= */

const { useState, useEffect } = React;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;

`;
html += prelude;

// Hook
html += stripModuleSyntax(read('src/hooks/useLocalStorage.js')) + '\n\n';

// Data
html += stripModuleSyntax(read('src/data/workoutData.js')) + '\n\n';
html += stripModuleSyntax(read('src/data/mealData.js')) + '\n\n';

// Icons
html += read(__dirname + '/icons_block.tmp.js') + '\n';

// Components (order matters: Dashboard uses StatCard/CheckInCard defined in same file)
const comps = ['Dashboard', 'ThirtyDayChallenge', 'WorkoutTracker', 'ProgressChart', 'Badges', 'NotesAndGoals', 'MealPlan'];
for (const c of comps) {
  html += stripModuleSyntax(read(`src/components/${c}.jsx`)) + '\n\n';
}

// App
html += stripModuleSyntax(read('src/App.jsx')) + '\n\n';

// Mount
html += `/* ==============================
   Mount
   ============================== */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

// Close
html += '    </script>\n  </body>\n</html>\n';

// Verify placeholders exist before replacing
if (!html.includes('__BG_B64__')) { console.error('ERROR: __BG_B64__ placeholder missing'); process.exit(1); }
if (!html.includes('__FAVICON_B64__')) { console.error('ERROR: __FAVICON_B64__ placeholder missing'); process.exit(1); }

html = html.split('__BG_B64__').join(bg).split('__FAVICON_B64__').join(fav);

// Sanity checks
if (html.includes('__BG_B64__') || html.includes('__FAVICON_B64__')) { console.error('ERROR: replacement failed'); process.exit(1); }
const leftover = html.split('\n').filter(l => /^\s*import\s|^export\s/.test(l));
if (leftover.length) { console.error('ERROR: leftover module syntax:\n' + leftover.join('\n')); process.exit(1); }

fs.writeFileSync('index.html', html);
console.log('OK — index.html built:', (fs.statSync('index.html').size / 1024).toFixed(0), 'KB,', html.split('\n').length, 'lines');
