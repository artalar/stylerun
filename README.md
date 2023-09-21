[![version](https://img.shields.io/npm/v/stylerun)](https://www.npmjs.com/package/stylerun)
[![bundle size](https://deno.bundlejs.com/badge?q=stylerun&treeshake=%5B%7B+default+%7D%5D)](https://bundlejs.com/?q=stylerun&treeshake=%5B%7B+default+%7D%5D)
![license](https://img.shields.io/github/license/artalar/reatom)

[![logo](https://raw.githubusercontent.com/artalar/stylerun/main/logo.svg)](https://github.com/artalar/stylerun)

**Stylerun** is the most efficient tool to describe styles in (J|T)avaScript. You can use it for small widgets or (P?)React SPAs. It is **small**, **performant** and have **familiar** API inspired by styled-components.

The size is less than 500 B and controlled by [Size Limit](https://github.com/ai/size-limit).

The goal of the chosen API is to have CSS syntax highlighting in your script code with any popular extension for styled-components.

Stylerun does not parse your styles at runtime and pastes them as they are. All dynamic parts are converted to CSS variables, which is the most modern and performant way to manage dynamic styles!

Note that you can manage only CSS properties; do not include the entire CSS blocks in the function results.

Example https://stackblitz.com/edit/stylerun

```tsx
import styled from 'stylerun'

const inputStyles = styled('')`
  font-size: ${(length: number) => `${1 + length * 0.1}em`};
`

export const Input = () => {
  const [value, setValue] = useState('')

  return (
    <input
      {...inputStyles(value.length)}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  )
}
```

Here `inputStyles(1)` will return `{ className: 'sr_1_zzzz', style: { '--2_sr_1_zzzz': '1.1em' } }`

Each style function returns self class name with `toString` method, which allows you to use styles as selectors! Also, you could chain styles with `styled` method to add extra styles with selectors

```ts
let listStyles = styled('')`
  color: red;
`
let ulStyles = styled('')`
  margin: 1rem;
`.styled(':hover')`
  box-shadow: 0 0 1rem gray;
`.styled(listStyles)`
  padding-left: 1rem;
  color: ${(props: { color: string }) => props.color};
`
```

## Motivation

CSS-in-JS is a powerful approach with benefits like: simple dynamic styles, critical CSS and dead code elimination by design and many others. Stylerun, inspired by [Reshadow](https://reshadow.dev) and [styled-jsx](https://github.com/vercel/styled-jsx), try to get all that benefits, but keeping natural styling and reduce JS specificity.

## Limitations

- Currently there is no SSR support
- Stylerun has no compiler (pre/post processor) thats prevent vendor prefixing and nesting (`&`) usage
  > TODO: https://github.com/artalar/stylerun/issues/19
- Stylerun has no built time static extraction and hasn't goal for that.

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
