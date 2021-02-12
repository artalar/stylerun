import React from 'react'

const cid = Math.random().toString(36).slice(-4)
let i = 0
function createUid(name?: string | number) {
  name = name ? `_${name}` : ``
  return `sr${name}_${++i}_${cid}`
}

const noop: (...a: any[]) => any = () => {}

let addCssVar = noop

export function styled<
  Props extends Record<string, any>,
  Tag extends keyof JSX.IntrinsicElements = 'div'
>(
  tag: Tag,
  styleCreator?: (props: Props) => string,
): React.FunctionComponent<JSX.IntrinsicElements[Tag] & Props> & {
  className: string
}
export function styled<T extends { className?: string; [K: string]: any }>(
  component: React.FunctionComponent<T & { className?: string }>,
): React.FunctionComponent<T> & { className: string }
export function styled(
  component: keyof JSX.IntrinsicElements | React.FunctionComponent,
  styleCreator?: (props: any) => string,
): React.FunctionComponent & { className: string } {
  if (typeof component === `string`) {
    return styled(
      (props: any): React.ReactElement => {
        let styles: undefined | string

        if (styleCreator !== undefined) {
          const vars: Record<string, any> = {}
          addCssVar = Object.assign.bind(null, vars)
          styles = styleCreator(props)
          addCssVar = noop
          // we can mutate props here
          // because `stylerun` wrapper already make an immutable copy of it
          props.style = Object.assign({}, props.style || {}, vars)
        }

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
    return (component as React.FunctionComponent)(
      Object.assign({}, props, {
        className: `${Component} ${props.className || ``}`.slice(1),
      }),
      ref,
    )
  }
  Component.className = `.${createUid()}`
  Component.toString = () => Component.className

  return Component
}

export const StylerunContext = React.createContext(new Set<string>())

export function Style({ children: style }: { children: string }) {
  const cache = React.useContext(StylerunContext)
  React.useLayoutEffect(() => {
    if (!cache.has(style)) {
      const styleEl = document.createElement(`style`)
      styleEl.innerHTML = style
      document.head.appendChild(styleEl)
    }
    cache.add(style)
  }, [cache, style])

  return null
}

export function useCssVar<T extends string | number>(
  value: T,
  description = `var`,
): React.CSSProperties {
  const name = React.useState(() => `--${createUid(description)}`)[0]
  const meta = Object.defineProperty(
    {
      [name]: value,
    },
    // `defineProperty` need to make it `enumerable: false`
    'toString',
    {
      value: () => `var(${name})`,
    },
  )

  addCssVar(meta)

  return meta
}
