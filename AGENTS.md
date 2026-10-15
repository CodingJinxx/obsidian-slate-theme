# Notes for coding agents

Read [CONTRIBUTING.md](CONTRIBUTING.md) first.

- `theme.css` is generated from `src/*.css` and `fonts/`. Edit the sources, run `npm run build`, commit both. `npm run check` fails when `theme.css` is out of date.
- Colours come from the `--sl-` tokens in `src/01-tokens.css`; map new needs onto Obsidian variables in `src/02-variables.css` before adding rules.
- No `!important`, `@import` or remote URLs. Do not rely on the format of Obsidian variables that changed between versions (see the callout note in CONTRIBUTING.md).
- Never commit secrets or private information. The demo vault under `test/vault` contains sample notes only.
- `main` is protected: never push to it. Work on a branch, open a pull request and merge it when the **Check** job passes. Tags are pushed only after the release PR is merged.
- Run `npm run check` before committing, and `npm run screenshots` (look at the images in light and dark) when styles change.
