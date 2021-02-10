[![version](https://img.shields.io/npm/v/stylerun)](https://www.npmjs.com/package/stylerun)
[![bundle size](https://img.shields.io/bundlephobia/minzip/stylerun)](https://bundlephobia.com/result?p=stylerun@alpha)
![license](https://img.shields.io/github/license/artalar/reatom)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/artalar/stylerun)

[![logo](https://raw.githubusercontent.com/artalar/stylerun/main/logo.svg)](https://github.com/artalar/stylerun)

**Stylerun** is natural and performant way to style your (P?)React application

> **API is stable. Docs, tests and examples in progress.**

Stylerun allow you to write styles in an JSX markup, like so:

```JSX
import { stylerun, Style } from 'stylerun';

const Input = stylerun(`input`)

export function HelloWorld() {
  const [input, update] = useState(``)
  return (<>
    <Input value={input} onChange={e => update(e.target.value)} placeholder="name"/>
    {input && <p>Hello, ${input}!<p>}
    <Style>{`
      ${Input} {
        font-size: 1.5em;
      }
    `}</Style>
  </>)
}
```

---

Advanced example:

[![Advanced example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stylerun-vzw20)

## Motivation

CSS-in-JS is a powerful approach with benefits like: simple dynamic styles, critical CSS and dead code elimination by design and many others. Stylerun, inspired by [Reshadow](https://reshadow.dev) and [styled-jsx](https://github.com/vercel/styled-jsx), try to get all that benefits, but keeping natural styling and reduce JS specificity.

Key features:

- Natural API
- No limits for dynamic parts and values (+ helper for css-vars)
- Use components as selectors
- Less than 1KB bundle overhead
- Fast runtime by lack of pre/post processor (no `&` selector and so on)
- Simple sources

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/artalar"><img src="https://avatars0.githubusercontent.com/u/27290320?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arutyunyan Artyom</b></sub></a><br /><a href="https://github.com/artalar/stylerun/commits?author=artalar" title="Code">💻</a> <a href="#ideas-artalar" title="Ideas, Planning, & Feedback">🤔</a> <a href="#example-artalar" title="Examples">💡</a> <a href="https://github.com/artalar/stylerun/commits?author=artalar" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kancurochat"><img src="https://avatars.githubusercontent.com/u/54439779?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Infante Pacheco</b></sub></a><br /><a href="#design-kancurochat" title="Design">🎨</a> <a href="https://github.com/artalar/stylerun/commits?author=kancurochat" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/scorpionknifes"><img src="https://avatars.githubusercontent.com/u/23299540?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ZHENK</b></sub></a><br /><a href="https://github.com/artalar/stylerun/commits?author=scorpionknifes" title="Documentation">📖</a> <a href="#infra-scorpionknifes" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
