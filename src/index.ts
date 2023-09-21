let cid = Math.random().toString(36).slice(-4)
let cidCount = 0

let style = ''
let styleEl = document.createElement('style')
styleEl.id = 'stylerun'
document.head.appendChild(styleEl!)

type KindaStyle = Record<string, string | number>

type Stylerun<T = {}> = {
  (
    props: T,
    style?: KindaStyle,
    extraClasses?: string,
  ): { className: string; style: KindaStyle }

  styled: (
    selector: string | Stylerun,
    options?: {
      selector?: string
      vars?: Array<{ name: string; fn: (props: {}) => string | number }>
    },
  ) => <TT>(
    styleParts: TemplateStringsArray,
    ...varsValues: Array<string | number | ((props: TT) => string | number)>
  ) => Stylerun<T & TT>

  toString(): string
}

// @ts-expect-error
let stylerun: Stylerun['styled'] = (
  className,
  { selector, vars = [] } = {},
) => {
  className ||= `sr_${++cidCount}_${cid}`
  selector ??= `.${className}`

  return (styleParts, ...varsValues) => {
    if (!style) {
      Promise.resolve().then(() => {
        styleEl.innerHTML += style
        style = ''
      })
    }

    style += `${selector}{`
    styleParts.forEach((stylePart, i) => {
      style += stylePart
      if (i < varsValues.length) {
        let value = varsValues[i]
        if (typeof value === `function`) {
          let name = `--${++cidCount}_${className}`
          // @ts-expect-error generic leak
          vars.push({ name, fn: value })
          value = `var(${name})`
        }

        style += value
      }
    })
    style += `}`

    return Object.assign(
      (props: any, style: KindaStyle = {}, extraClasses?: string) => {
        for (let { name, fn } of vars) {
          style[name] = fn(props)
        }
        return {
          className: extraClasses ? `${className} ${extraClasses}` : className,
          style,
        }
      },
      {
        styled: (selector: string | Stylerun) =>
          stylerun(className, {
            selector: `.${className}${
              typeof selector === 'function' ? ` ${selector}` : selector
            }`,
            vars: vars.slice(0),
          }),
        toString: () => `.${className}`,
      },
    )
  }
}

export default stylerun
