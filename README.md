[![version](https://img.shields.io/npm/v/stylerun)](https://www.npmjs.com/package/stylerun)
[![bundle size](https://img.shields.io/bundlephobia/minzip/stylerun)](https://bundlephobia.com/result?p=stylerun@alpha)
![license](https://img.shields.io/github/license/artalar/reatom)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/artalar/stylerun)

[![logo](https://raw.githubusercontent.com/artalar/stylerun/main/logo.svg)](https://github.com/artalar/stylerun)

> **`WORK IN PROGRESS`**

**Stylerun** is natural and performant way to style your (P?)React application. It allow you to write styles in an JSX markup, like in plain HTML:

```JSX
import { Style } from 'stylerun';
import { TextInput } from 'example-ui-library'

export function Example() {
  return (<>
    <TextInput className="text-input" />
    <Style>{`
      .text-input {
        outline: none;
      }
      .text-input:focus {
        box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      }
    `}</Style>
  </>)
}
```

It looks and feels like a plain CSS, but works much powerful because we use [JavaScript Template literals (Template strings)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) and may easily modify it at the runtime. Stylerun pass a couple of helpers (`styled`, `useCssVar` - (see below)[#API]) to boost it aproach and make it simple and performant.

## Motivation

CSS-in-JS is a powerful approach with benefits like: simple dynamic styles, critical CSS and dead code elimination by design and many others. Stylerun, inspired by [Reshadow](https://reshadow.dev) and [styled-jsx](https://github.com/vercel/styled-jsx), try to get all that benefits, but keeping natural styling and reduce JS specificity.

Key features:

- Natural API
- No limits for dynamic parts and values (+ helper for css-vars)
- Use components as selectors
- Only [0.5KB](https://bundlephobia.com/result?p=stylerun@alpha) bundle overhead
- A few times faster runtime than [styled-components](https://styled-components.com) or [goober](https://github.com/cristianbote/goober) by lack of pre/post processor
  > TODO: benchmarks
- No need a build time setup

Limitations:

- Stylerun coupled with (P?)React and has no native API
- Stylerun has no compiler (pre/post processor) thats prevent vendor prefixing and nesting (`&`) usage
  > TODO: https://github.com/artalar/stylerun/issues/19
- Stylerun has no built time static extraction and hasn't goal for that (but assumes integration with SSR / SSG)
  > TODO: https://github.com/artalar/stylerun/issues/7
- No [class components](https://reactjs.org/docs/components-and-props.html#function-and-class-components) support
  > use `styled(props => <ClassComponent {...props}>)` instead

## API

You may be want to try (examples)[#examples] first.

### Style

The Style component just cache and forward your styles into the [head](https://developer.mozilla.org/en-US/docs/Glossary/Head).

> See example

### useCssVar

[Css-variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) is a most performant and flexible way to bring visual interaction to your application. Stylerun help to use it.

`useCssVar` accept string or number value and create object with one **unique** css-property name in the keys and and passed value in the value of property. It may be used as an [style object](https://reactjs.org/docs/dom-elements.html#style) or spread in to it. Also it has [`toString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method that returns css-variable for paste it in a styles.

```JSX
import { Style, useCssVar } from 'stylerun'

export function Example1(props/*: { color: 'red' }*/) {
    const colorVar = useCssVar(props.color)

    console.log(colorVar)            // { '--sr_var_1_qj2c': 'red' }
    console.log(colorVar.toString()) // 'var(--sr_var_1_qj2c)'
    console.log(colorVar + '')       // 'var(--sr_var_1_qj2c)'
    console.log(`${colorVar}`)       // 'var(--sr_var_1_qj2c)'

    return <>
        <span style={colorVar} className="example-text">text</span>
        <Style>{`
            .example-text {
                color: ${colorVar}
            }
        `}</Style>
    </>
}

// Also you may paste optional name for generated value by the second argument

export function Example2(props/*: { color: 'red', size: '2' }*/) {
    const colorVar = useCssVar(props.color)
    const sizeVar = useCssVar(`${props.size}em`, 'size')

    console.log(colorVar) // { '--sr_var_2_qj2c': 'red' }
    console.log(sizeVar)  // { '--sr_size_3_qj2c': '2em' }

    return <>
        <span style={{...colorVar, ...sizeVar}} className="example-text">text</span>
        <Style>{`
            .example-text {
                color: ${colorVar}
                font-size: ${sizeVar}
            }
        `}</Style>
    </>
}
```

### styled

Inspired by [styled-component](https://styled-components.com) Stylerun has `styled` method for easily creation of styled components and wrap existed components to allow use it as selectors.

```JSX
import { styled } from 'stylerun'

// classic input component with `className` prop and returns it `toString` method
const Input = styled('input')
console.log(Input.className)  // 'sr_4_qj2c'
console.log(Input.toString()) // '.sr_4_qj2c'
console.log(Input + '')       // '.sr_4_qj2c'
console.log(`${Input}`)       // '.sr_4_qj2c'
// Fill free rewrite `className` for better debug
Input.className = `input-example`
console.log(Input.className)  // 'input-example'
console.log(Input.toString()) // '.input-example'
console.log(Input + '')       // '.input-example'
console.log(`${Input}`)       // '.input-example'

const OtherInput = styled(Input)
console.log(OtherInput.className)  // 'sr_5_qj2c'
```

When you create an component with `styled` method you can paste styles creator as the second argument. It will be called inside component render on each update so you may use [hooks](https://reactjs.org/docs/hooks-intro.html) with it. One of the best feature of Stylerun is when you use `useCssVar` hook inside the styles creator callback it automatically register created css-variables inside element styles.

Remember that styles creator return plain css with global values (selectord), so for scoped defenition for created component you should use it as selector in them self.

```JSX
import { styled, useCssVar } from 'stylerun'

const Input = styled(`input`, ({ value = '' }) => `
  ${Input} {
    font-size: ${useCssVar(`${Math.max(1, 2 - String(value).length * 0.1)}em`)}
  }
`)
```

## Examples

#### Component as selector

> Component should accept and apply `className` property.

```JSX
import { Style, styled } from 'stylerun';
import { TextInput as _TextInput } from 'example-ui-library'

const TextInput = styled(_TextInput)

export function Example() {
  return (<>
    <TextInput />
    <Style>{`
      ${TextInput} {
        outline: none;
      }
      ${TextInput}:focus {
        box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      }
    `}</Style>
  </>)
}
```

#### New component

> Component should accept and apply `className` property.

```JSX
import { styled } from 'stylerun';

const TextInput = styled('input', () => `
  ${TextInput} {
    outline: none;
  }
  ${TextInput}:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`)

export function Example() {
  return (<>
    <TextInput />
  </>)
}
```

#### useCssVar autobind

In this example value from props will be updated on each frame, but documents styles not changes, only autobinded css-variable.

```JSX
import { styled, useCssVar } from 'stylerun';

const TextInput = styled('input', ({ shadowOpasity = 1 }) => `
  ${TextInput} {
    outline: none;
  }
  ${TextInput}:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, ${useCssVar(shadowOpasity)});
  }
`)

export function Example() {
  const [shadowOpasity, update] = React.useState(0)

  React.useEffect(() => {
    requestAnimationFrame(() => {
      update((shadowOpasity + 1) % 100)
    })
  }, [shadowOpasity])

  return (<>
    <TextInput shadowOpasity={shadowOpasity / 100}/>
  </>)
}
```

Advanced example:

[![Advanced example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/stylerun-vzw20)

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
