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

- Allow to use components as selectors
- Couple markup and styling together
- Get closer to natural styling
- Easy dynamic parts and values
