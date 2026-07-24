# SvelteToDo

A lightweight Svelte to-do app with emoji-first controls, task filtering, inline editing, and persistent local storage.

## What is included

- Add, edit, complete, and delete tasks
- Filter by all, active, or completed
- Optional completion alerts
- Local persistence using `localStorage`
- Keyboard- and screen-reader-friendly controls

## Tech stack

- Svelte 3
- Rollup
- Sirv (static server)

## Getting started

### Prerequisites

- Node.js 18+ recommended
- npm 9+

### Install

```bash
npm install
```

### Start development mode

```bash
npm run dev
```

Open the app at the URL printed by the terminal (typically http://localhost:5000).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run start
```

## Available scripts

- `npm run dev`: Build in watch mode + live reload
- `npm run build`: Create production bundle in `public/build`
- `npm run start`: Serve `public` directory
- `npm run prettier`: Format source files
- `npm run svelte-check`: Run Svelte static diagnostics

## Project structure

```text
public/
  global.css        # Global styles, theme variables, focus states
  index.html        # App shell
src/
  App.svelte        # Root component layout
  Header.svelte     # Add-task form and title
  TaskList.svelte   # Filtered list and task actions
  TaskListItem.svelte
  Footer.svelte
  ToolTip.svelte
  EmojiButton.svelte
  stores.js         # Task store, persistence, derived state
```

## Data model

Each task is normalized to:

```js
{
  id: string,
  text: string,
  done: boolean,
  createdAt: string
}
```

Notes:

- Task text is trimmed and capped at 200 characters.
- Invalid/empty tasks are discarded during normalization.

## Accessibility and UX notes

- Interactive controls are native buttons with labels.
- Tooltips are visible on hover and keyboard focus.
- Focus-visible outlines are enabled for keyboard navigation.
- Empty state is shown when a filter has no matching tasks.

## Known limitations and next improvements

- Dependency stack is based on an older Svelte 3 + Rollup template.
- `npm audit fix` has been applied, but `npm audit` still reports 6 transitive vulnerabilities (4 moderate, 2 high) tied to legacy toolchain packages.
- A modern migration path is to move to SvelteKit (Vite), add Vitest + Playwright, and enable CI checks.

## Validation run

The following checks were run in this workspace:

- `npm run build`: passes
- `npm run svelte-check`: reports 0 errors/warnings (with a legacy source-map wasm runtime warning from old tooling)

## License

No license file is currently included. Add one before distributing this project publicly.
