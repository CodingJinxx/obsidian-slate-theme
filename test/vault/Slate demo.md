---
title: Slate demo
status: ok
tags: [slate, theme]
created: 2026-10-15
---

# Slate demo

A dense, calm, keyboard-first look: one monospace typeface, square edges and hard offset shadows. Links are [[Runbook|ember text]], never ember fills. Selection looks like this and `inline code` sits in a well.

## Writing

Body text is **bold when it matters**, *italic when it helps*, ==highlighted== when it is the point, and ~~struck~~ when it is gone. A tag looks like a badge: #slate #theme/dark.

### Lists

- Status is shape, colour and word together
  - `ok` is a circle
  - `warn` is a triangle
- Numbers use tabular figures
  1. Build 4821 passed in 38s
  2. Deploy waits for review

- [x] Map the Slate tokens
- [x] Square every edge
- [ ] Ship the theme

> Quiet state changes: only the cursor blinks. A quote has a 2 px rule and no tint.

#### Callouts

> [!note] note
> Neutral information in the muted tone.

> [!tip] tip
> Healthy and helpful, in the ok tone.

> [!warning] warning
> Degraded. Check the runbook before you continue.

> [!danger] danger
> Down. Roll back now.

##### Table

| service | state | latency | owner |
| --- | --- | --- | --- |
| api | ok | 41 ms | core |
| queue | warn | 380 ms | data |
| search | crit | n/a | infra |

###### Code

```ts
export function status(latency: number): 'ok' | 'warn' | 'crit' {
  if (latency < 100) return 'ok'; // fast enough
  return latency < 500 ? 'warn' : 'crit';
}
```

---

Footnotes work too.[^1]

[^1]: Set in `text-sm`, quietly.
