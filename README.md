# 🪝 Hooks

[![Version][version-badge]][npm]
[![Downloads][downloads-badge]][npm]
[![Github Actions][github-actions-badge]][github-actions]
[![Make a PR][makepr-badge]][makepr]
[![Typescript][typescript-badge]][npm]
[![Linted with oxlint][oxlint-badge]][oxc]
[![Formatted with oxfmt][oxfmt-badge]][oxc]

A collection of reusable react hooks for state and UI management

## Installation

```bash
# Using PNPM
pnpm install @codiume/hooks
```

```bash
# Using Bun
bun add @codiume/hooks
```

```bash
# Using NPM
npm install @codiume/hooks
```

```bash
# Using Yarn
yarn add @codiume/hooks
```

## Hooks

| Hook                                         | Description                                     |
| -------------------------------------------- | ----------------------------------------------- |
| [use-clipboard](./src/use-clipboard)         | Copy text to the clipboard with ease            |
| [use-hover](./src/use-hover)                 | Tracks the hover state of a DOM element         |
| [use-in-viewport](./src/use-in-viewport)     | Detects if element is visible in the viewport   |
| [use-local-storage](./src/use-local-storage) | Manages state with localStorage synchronization |
| [use-media-query](./src/use-media-query)     | Track if a media query matches the viewport     |
| [use-queue](./src/use-queue)                 | Manage state of elements in FIFO-like strategy  |
| [use-scroll](./src/use-scroll)               | Tracks scroll position of an element            |
| [use-singleton](./src/use-singleton)         | Creates a value exactly once                    |
| [use-window-scroll](./src/use-window-scroll) | Tracks scroll position of the window            |

## Contributing

Please see [Contributing.md](.github/CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please report them privately as described in our [Security Policy](.github/SECURITY.md) instead of using the issue tracker.

## Changelog

Please see the [Changelog](CHANGELOG.md) for more information on what has changed recently.

## License

Please see the [LICENSE](LICENSE) for more information.

[npm]: https://www.npmjs.com/package/@codiume/hooks
[version-badge]: https://img.shields.io/npm/v/%40codiume%2Fhooks.svg
[downloads-badge]: https://img.shields.io/npm/dt/%40codiume%2Fhooks
[github-actions]: https://github.com/codiume/hooks/actions/workflows/ci.yml
[github-actions-badge]: https://github.com/codiume/hooks/actions/workflows/ci.yml/badge.svg?branch=main
[typescript-badge]: https://img.shields.io/npm/types/%40codiume%2Fhooks
[makepr]: https://makeapullrequest.com
[makepr-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square?style=flat
[oxc]: https://oxc.rs
[oxlint-badge]: https://img.shields.io/badge/Linted_with-oxlint-32f3e8?style=flat
[oxfmt-badge]: https://img.shields.io/badge/Formatted_with-oxfmt-32f3e8?style=flat
