const cid = Math.random().toString(36).slice(-4)
let cidCount = 0

let appending: undefined | Promise<void>
let styleEl: undefined | HTMLStyleElement

export const styled = (
  className: string,
  {
    selector,
    style = '',
    vars = [],
  }: {
    selector?: string
    style?: string
    vars?: Array<{ name: string; fn: (props: T) => string | number }>
  } = {},
) => {
  className ||= `sr_${++cidCount}_${cid}`
  selector ??= `.${className}`

  return <T>(
    styleParts: TemplateStringsArray,
    ...varsValues: Array<string | number | ((props: T) => string | number)>
  ) => {
    style += `${selector}{`

    styleParts.forEach((stylePart, i) => {
      style += stylePart
      if (i < varsValues.length) {
        const value = varsValues[i]
        if (typeof value === `function`) {
          const name = `--${++cidCount}_${className}`
          style += `var(${name})`
          vars.push({ name, fn: value })
        } else {
          style += value
        }
      }
    })

    style += `}`

    appending ??= Promise.resolve().then(() => {
      if (!styleEl) {
        styleEl = document.createElement(`style`)
        styleEl.innerHTML += style
        document.head.appendChild(styleEl!)
      } else {
        styleEl.innerHTML += style
      }
    })

    return {
      styled: (selector: string) =>
        styled(className, {
          selector: `.${className}${selector}`,
          style,
          vars,
        }),
      style,
      class: className,
      className,
      vars(props: T) {
        let varsRec: Record<string, string | number> = {}
        for (const { name, fn } of vars) {
          varsRec[name] = fn(props)
        }
        return varsRec
      },
      toString: () => `.${className}`,
      *[Symbol.iterator]() {
        yield (
          props: T,
        ): {
          className: string
          style: Record<string, string | number>
        } => ({
          className,
          style: this.vars(props),
        })
      },
    }
  }
}

// const listStyles = styled('')`
//   color: red;
// `
// const ulStyles = styled('')`
//   margin: 1rem;
// `.styled(` ${listStyles}`)`
//   padding-left: 1rem;
//   color: ${(props: { color: string }) => props.color};
// `

// console.log(ulStyles.vars('blue'))
