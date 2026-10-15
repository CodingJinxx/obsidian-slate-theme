/**
 * Takes the screenshots in the README in a real, sandboxed Obsidian
 * (downloaded into .obsidian-cache, never your installed app or vaults).
 *
 *   npm run screenshots
 *   OBSIDIAN_VERSIONS=earliest/earliest npm run screenshots   # the oldest supported version
 */
import * as path from 'node:path';
import { env } from 'node:process';
import { parseObsidianVersions } from 'wdio-obsidian-service';

const cacheDir = path.resolve(env.OBSIDIAN_CACHE_DIR ?? '.obsidian-cache');
const versions = await parseObsidianVersions(env.OBSIDIAN_VERSIONS ?? 'latest/latest', { cacheDir });
if (env.CI) console.log('obsidian-cache-key:', JSON.stringify(versions));

export const config: WebdriverIO.Config = {
	runner: 'local',
	framework: 'mocha',
	specs: ['./test/screenshots.e2e.ts'],
	maxInstances: 1,
	capabilities: versions.map<WebdriverIO.Capabilities>(([appVersion, installerVersion]) => ({
		browserName: 'obsidian',
		'wdio:obsidianOptions': { appVersion, installerVersion, themes: [{ path: '.', enabled: true }], vault: 'test/vault' },
	})),
	services: ['obsidian'],
	reporters: ['obsidian'],
	mochaOpts: { ui: 'bdd', timeout: 90 * 1000 },
	waitforInterval: 100,
	waitforTimeout: 10 * 1000,
	logLevel: 'warn',
	cacheDir,
	injectGlobals: false,
};
