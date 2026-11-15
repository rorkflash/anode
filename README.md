# anode

agentic nodes — connected agents, shared directions

Minimal TypeScript package scaffold. No agent runtime yet — this is the starter layout for building one.

## Requirements

- Node.js 20+

## Install

```bash
npm install
```

## Scripts

| Command        | What it does                                      |
|----------------|---------------------------------------------------|
| `npm run build`| Compile TypeScript (`src/`) to `dist/`            |
| `npm test`     | Run unit tests with Node's built-in test runner   |
| `npm run lint` | Typecheck with `tsc --noEmit` (no separate linter)|
| `npm run clean`| Remove the `dist/` build output                   |

## Quick start

```bash
npm install
npm run build
npm test
```

Import the placeholder API after a build:

```ts
import { greet } from "anode";

console.log(greet()); // "hello from anode"
```

## License

MIT — see [LICENSE](./LICENSE).
