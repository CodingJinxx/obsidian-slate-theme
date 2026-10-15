# Changelog

All notable changes to this theme are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/). Release tags have no leading `v`.

## [Unreleased]

## [0.1.1] - 2026-10-15

### Changed

- Smaller `theme.css` (53 KB instead of 116 KB): the embedded JetBrains Mono is now a Latin subset in weights 400 and 700 (weight 500 renders as regular), as Obsidian's review recommends. `npm run check` fails above 100 KB.

## [0.1.0] - 2026-10-15

First public release, under the [PolyForm Noncommercial License 1.0.0](LICENSE): free for personal and other non-commercial use, commercial use needs permission.

### Added

- Light and dark variants built from the Slate design system tokens, mapped onto Obsidian's variables.
- Restyled buttons, inputs, switches, menus, dialogs, the command palette, tabs, file tree, tags, tables, code, quotes and callouts.
- JetBrains Mono embedded in `theme.css` (no network access).
- Icon: an ember tile with a prompt and a block cursor (`docs/images/icon.svg`, rendered by `scripts/make-icon.py`).
- Funding link (Buy Me a Coffee) in `manifest.json`, the README and GitHub's Sponsor button.
- Build script, theme checks and a screenshot recorder that drives a real Obsidian.

[Unreleased]: https://github.com/CodingJinxx/obsidian-slate-theme/compare/0.1.1...HEAD
[0.1.1]: https://github.com/CodingJinxx/obsidian-slate-theme/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/CodingJinxx/obsidian-slate-theme/releases/tag/0.1.0
