# Contributing

Thanks for helping. Slate follows the Slate design system, so a change should keep its look: one monospace family, radius 0, hard offset shadows, ember only as a fill.

## Layout

- `src/*.css`: the sources, joined in file-name order. `01-tokens.css` holds the `--sl-` design tokens, `02-variables.css` maps them to Obsidian's variables, `03-base.css` and `04-components.css` hold the rules.
- `fonts/`: JetBrains Mono files (and their licence), embedded as base64 by the build.
- `theme.css`: **generated**, committed because Obsidian reads it from the repository. Never edit it by hand.
- `test/`: the demo vault and the screenshot recorder.

## Rules for the CSS

Obsidian's review of community themes applies, and `npm run check` enforces what it can:

- Use Obsidian's variables where there is one; add a rule only for what a variable cannot do.
- No `!important`, no `@import`, no remote `url()`; nothing is fetched from the network.
- Colours come from the `--sl-` tokens, never from hex values outside `01-tokens.css`.
- Do not depend on a variable's format: Obsidian changed `--callout-color` from an `r, g, b` triplet to a colour between versions. Use the Slate tokens instead.
- Text keeps 4.5:1 contrast and meaningful non-text 3:1 in both variants.

## Workflow

`main` is protected: nothing is pushed to it directly.

1. Branch from `main` (`git switch -c fix/short-name`).
2. Edit `src/`, run `npm run build`, then `npm run check`.
3. Run `npm run screenshots` and look at `test/screenshots/` (light and dark). To check the oldest supported version: `OBSIDIAN_VERSIONS=1.8.10/1.8.10 npm run screenshots`. If a screenshot in the README changes, update `docs/images/`.
4. Open a pull request. CI must pass (**Check**). Merge with *Squash and merge*.

## Releasing

1. Branch `release/<x.y.z>`; move the "Unreleased" entries in `CHANGELOG.md` under the new version.
2. Set `version` in `manifest.json` and `package.json` (and `package-lock.json`) to `<x.y.z>`, run `npm run build`, commit, open the pull request and merge it.
3. Tag the merge commit and push the tag: `git switch main && git pull && git tag <x.y.z> && git push origin <x.y.z>`.
4. The release workflow checks the tag against `manifest.json`, builds, attests `theme.css` and creates a **draft** release with `theme.css` and `manifest.json`. Review it and publish.

## Licence of contributions

The theme is under the [PolyForm Noncommercial License 1.0.0](LICENSE). By opening a pull request you agree that your contribution is licensed under the same terms and that the author may also license it for commercial use.
