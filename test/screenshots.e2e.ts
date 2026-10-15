import * as fs from 'node:fs';
import * as path from 'node:path';
import { browser, expect } from '@wdio/globals';
import { before, describe, it } from 'mocha';

const out = path.resolve('test/screenshots');

async function shot(name: string): Promise<void> {
	await browser.pause(400);
	fs.mkdirSync(out, { recursive: true });
	await browser.saveScreenshot(path.join(out, `${name}.png`));
}

async function colorScheme(scheme: 'light' | 'dark'): Promise<void> {
	await browser.executeObsidian(({ app }, s) => {
		(app as unknown as { changeTheme(name: string): void }).changeTheme(s === 'dark' ? 'obsidian' : 'moonstone');
	}, scheme);
	await browser.pause(300);
}

async function openNote(file: string, mode: 'live' | 'reading'): Promise<void> {
	await browser.executeObsidian(async ({ app, obsidian }, f, m) => {
		const leaf = app.workspace.getLeaf(false);
		await leaf.openFile(app.vault.getFileByPath(f)!, { state: m === 'reading' ? { mode: 'preview' } : { mode: 'source', source: false } });
		app.workspace.setActiveLeaf(leaf, { focus: true });
		void obsidian;
	}, file, mode);
	await browser.pause(500);
}

/** Scrolls the open note so the heading with this text is at the top (Live Preview and Reading view). */
async function scrollTo(heading: string): Promise<void> {
	await browser.executeObsidian(({ app, obsidian }, h) => {
		const view = app.workspace.getActiveViewOfType(obsidian.MarkdownView)!;
		if (view.getMode() === 'preview') {
			const el = [...view.contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6')].find((n) => n.textContent === h);
			el?.scrollIntoView({ block: 'start' });
			return;
		}
		const line = view.editor.getValue().split(/\r?\n/).findIndex((l) => l.replace(/^#+ /, '') === h);
		// Centre a line a little below the heading, so the section reads from its heading downwards.
		view.editor.scrollIntoView({ from: { line: line + 13, ch: 0 }, to: { line: line + 13, ch: 0 } }, true);
	}, heading);
	await browser.pause(400);
}

describe('Slate screenshots', function () {
	before(async function () {
		// Electron does not support setWindowSize over WebDriver: resize the window from inside.
		await browser.execute(() => window.resizeTo(1280, 760));
		await browser.executeObsidian(({ app }) => {
			const config = app.vault as unknown as { setConfig(k: string, v: unknown): void };
			config.setConfig('showLineNumber', false);
			config.setConfig('readableLineLength', true);
			config.setConfig('showInlineTitle', false);
		});
	});

	it('applies the Slate tokens in both variants', async function () {
		const read = () =>
			browser.execute(() => {
				const style = getComputedStyle(document.body);
				return {
					accent: style.getPropertyValue('--sl-color-accent').trim(),
					page: style.getPropertyValue('--background-primary').trim(),
					radius: style.getPropertyValue('--radius-m').trim(),
					font: style.getPropertyValue('--font-text-theme').trim(),
					theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light',
				};
			});
		await colorScheme('light');
		expect(await read()).toMatchObject({ theme: 'light', accent: '#e8823a', radius: '0' });
		expect((await read()).font).toContain('JetBrains Mono');
		const lightPage = (await read()).page;
		await colorScheme('dark');
		expect(await read()).toMatchObject({ theme: 'dark', accent: '#e8823a' });
		expect((await read()).page).not.toBe(lightPage);
		// The theme is enabled, and its embedded font is available to the page.
		expect(await browser.executeObsidian(({ app }) => (app as unknown as { customCss: { theme: string } }).customCss.theme)).toBe('Slate');
		expect(await browser.execute(() => document.fonts.check("12px 'JetBrains Mono'"))).toBe(true);
	});

	it('editor, light and dark', async function () {
		await openNote('Slate demo.md', 'live');
		await scrollTo('Lists');
		await colorScheme('light');
		await shot('editor-light');
		await colorScheme('dark');
		await shot('editor-dark');
	});

	it('reading view, light and dark', async function () {
		await openNote('Slate demo.md', 'reading');
		await scrollTo('Callouts');
		await colorScheme('light');
		await shot('reading-light');
		await colorScheme('dark');
		await shot('reading-dark');
	});

	it('command palette', async function () {
		await openNote('Slate demo.md', 'live');
		await scrollTo('Lists');
		await colorScheme('dark');
		await browser.executeObsidian(({ app }) => (app as unknown as { commands: { executeCommandById(id: string): void } }).commands.executeCommandById('command-palette:open'));
		await browser.pause(300);
		await browser.keys('ope'.split(''));
		await shot('palette-dark');
		await browser.keys('Escape');
	});
});
