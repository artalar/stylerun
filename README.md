[![version](https://img.shields.io/npm/v/stylerun)](https://www.npmjs.com/package/stylerun)
[![bundle size](https://img.shields.io/bundlephobia/minzip/stylerun)](https://bundlephobia.com/result?p=stylerun)
![license](https://img.shields.io/github/license/artalar/reatom)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/artalar/stylerun)

<!-- 
[![stylerun logo](https://github.com/artalar/stylerun/blob/main/log.svg)](https://github.com/artalar/stylerun)
 -->

**Stylerun** is natural and performant way to style your (P?)React application

> API is stable, docs, testt and examples in progress

### Usage example

```js
import { stylerun, Style, useCssVar } from '../src';

import { stylerun, Style, useCssVar } from '../src';

const Text = stylerun(`span`)
const Consent = stylerun(({ className, options, onChange }) => (
  <select className={className} onChange={onChange}>
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </select>
))

const Example = stylerun(({ className }) => {
  const [hue, updateHue] = React.useState(1)
  const [isAwesome, updateIsAwesome] = React.useState(true)
  const color = useCssVar(`hsl(${hue}, 100%, ${isAwesome ? 50 : 20}%)`, `color`)

  React.useEffect(() => {
    requestAnimationFrame(() => {
      updateHue((hue + 1) % 360)
    })
  }, [hue])

  return (
    <>
      <div style={color.style} className={className}>
        <Text>Web is awesome!</Text>
        <br />
        <Consent
          options={[`yes`, `no`]}
          onChange={(e) => updateIsAwesome(e.target.value === `yes`)}
        />
      </div>
      <Style>{`
        ${Text} {
          padding: 0.5em;
          font-size: 2em;
          background-color: ${color.var};
        }
        ${Consent} {
          margin-top: 1rem;
        }
      `}</Style>
    </>
  )
})
```