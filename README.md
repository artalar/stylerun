[![version](https://img.shields.io/npm/v/stylerun)](https://www.npmjs.com/package/stylerun)
[![bundle size](https://img.shields.io/bundlephobia/minzip/stylerun)](https://bundlephobia.com/result?p=stylerun)
![license](https://img.shields.io/github/license/artalar/reatom)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/artalar/stylerun)

[![logo](https://github.com/artalar/stylerun/blob/main/logo.svg)](https://github.com/artalar/stylerun)

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

## Motivation

CSS-in-JS is a powerful approach with benefits like: simple dynamic styles, critical CSS and dead code elimination by design and many others. Stylerun, inspired by [Reshadow](https://reshadow.dev) and [styled-jsx](https://github.com/vercel/styled-jsx), try to get all that benefits, but keeping natural styling and reduce JS specificity.

Key features:

- Natural API
- No limits for dynamic parts and values (+ helper for css-vars)
- Use components as selectors
- Less than 1KB bundle overhead
- Fast runtime by lack of pre/post processor (no `&` selector and so on)
- Simple sources
