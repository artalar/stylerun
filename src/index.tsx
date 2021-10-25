import React from 'react'

const cid = Math.random()
  .toString(36)
  .slice(-4)

let i = 0

export type UseCssVar = (
  value: string | number,
  description?: string,
) => React.CSSProperties

type StylerunProps<Props extends Record<string, any> = {}> = Props & {
  className: string
  useCssVar: UseCssVar
}

export function styled<
  Props extends Record<string, any> = {},
  Tag extends keyof JSX.IntrinsicElements = 'div'
>(
  tag: Tag,
  styleCreator?: (
    props: StylerunProps<JSX.IntrinsicElements[Tag] & Props>,
  ) => string,
): React.FunctionComponent<JSX.IntrinsicElements[Tag] & Props> & {
  className: string
}
export function styled<Props>(
  component: React.FunctionComponent<StylerunProps<Props>>,
): React.FunctionComponent<Props & { className?: string }> & {
  className: string
}
export function styled(
  component: keyof JSX.IntrinsicElements | React.FunctionComponent,
  styleCreator?: (props: any) => string,
): React.FunctionComponent & { className: string } {
  if (typeof component === `string`) {
    return styled(
      (props: any): React.ReactElement => {
        let styles = ``

        if (styleCreator !== undefined) {
          const vars: Record<string, any> = {}
          const _useCssVar = props.useCssVar
          props.useCssVar = (v: any, d: any) => {
            const inlineStyles = _useCssVar(v, d)
            Object.assign(vars, inlineStyles)
            return inlineStyles
          }
          styles = styleCreator(props)
          props.style = Object.assign({}, props.style || {}, vars)
        }

        props.useCssVar = void 0

        // FIXME:
        // @ts-expect-error
        return [
          React.createElement(component, props),
          styles && React.createElement(Style, null, styles),
        ]
      },
    )
  }

  function Component(props: any, ref: any) {
    const { className } = Component

    let i = 0
    function useCssVar<T extends string | number>(
      value: T,
      description = `var`,
    ): React.CSSProperties {
      if (i < 0) {
        throw new Error(`Can't use \`useCssVar\` outside binded render`)
      }

      const name = React.useState(
        () => `--${description}_${++i}_${className}`,
      )[0]

      return Object.defineProperty(
        {
          [name]: value,
        },
        // `defineProperty` is needed to make it `enumerable: false`
        'toString',
        {
          value: () => `var(${name})`,
        },
      )
    }

    const element = (component as React.FunctionComponent)(
      Object.assign({}, props, {
        className: className + (props.className ? ` ${props.className}` : ``),
        useCssVar,
      }),
      ref,
    )
    i = -1
    return element
  }
  Component.className = `sr_${++i}_${cid}`
  Component.toString = () => `.${Component.className}`

  return Component
}

export const StylerunContext = React.createContext(new Set<string>())

let styleEl: null | HTMLStyleElement = null

export function Style({ children: style }: { children: string }) {
  const cache = React.useContext(StylerunContext)
  React.useLayoutEffect(() => {
    const cacheLastSize = cache.size
    cache.add(style)
    if (cacheLastSize !== cache.size) {
      if (styleEl == null) {
        styleEl = document.createElement(`style`)
        Promise.resolve().then(() => {
          document.head.appendChild(styleEl!)
          styleEl = null
        })
      }
      styleEl.innerHTML += style
    }
  }, [cache, style])

  // SSR
  if (typeof window === `undefined`) {
    cache.add(style)
  }

  return null
}
