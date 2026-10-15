// Checks the rules for Obsidian community themes that a script can check.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (message) => errors.push(message);

const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
for (const key of ['name', 'version', 'minAppVersion', 'author']) if (!manifest[key]) fail(`manifest.json: "${key}" is missing`);
if (/obsidian/i.test(manifest.name ?? '')) fail('manifest.json: the theme name must not contain "Obsidian"');
if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? '')) fail('manifest.json: version must be x.y.z');
if (Object.keys(manifest).some((k) => !['name', 'version', 'minAppVersion', 'author', 'authorUrl', 'fundingUrl'].includes(k))) fail('manifest.json: unknown key');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (pkg.version !== manifest.version) fail(`package.json version ${pkg.version} differs from manifest.json ${manifest.version}`);

const licence = readFileSync(join(root, 'LICENSE'), 'utf8');
if (!licence.startsWith('Required Notice:') || !licence.includes('PolyForm Noncommercial License 1.0.0')) fail('LICENSE must be the PolyForm Noncommercial 1.0.0 text with a Required Notice line');
if (pkg.license !== 'PolyForm-Noncommercial-1.0.0') fail('package.json: license must be PolyForm-Noncommercial-1.0.0');
if (/MIT/.test(readFileSync(join(root, 'README.md'), 'utf8'))) fail('README.md still mentions MIT');

const css = readFileSync(join(root, 'theme.css'), 'utf8');
// Ignore the embedded font data when looking at the rules.
const rules = css.replace(/url\(data:[^)]*\)/g, 'url(data)');
if (/!important/.test(rules)) fail('theme.css: avoid !important, raise selector specificity instead');
if (/@import/.test(rules)) fail('theme.css: no @import');
if (/url\(\s*['"]?(https?:)?\/\//.test(rules)) fail('theme.css: no remote url(): everything is embedded');
if (/expression\(|javascript:/i.test(rules)) fail('theme.css: scripting in CSS');
const open = (rules.match(/{/g) ?? []).length;
const close = (rules.match(/}/g) ?? []).length;
if (open !== close) fail(`theme.css: unbalanced braces (${open} open, ${close} close)`);
if (!existsSync(join(root, 'screenshot.png'))) fail('screenshot.png is missing (needed for the community theme list)');

if (errors.length) {
	for (const e of errors) console.error(`error: ${e}`);
	process.exit(1);
}
console.log('Theme checks passed.');
