import React from 'react'

const cid = Math.random().toString(36).slice(-4)
let i = 0
function createUid(name: string | number = ++i) {
  return `sr_${name}_${cid}`
}

export function stylerun<T extends keyof JSX.IntrinsicElements>(
  tag: T,
): React.FunctionComponent<JSX.IntrinsicElements[T]> & { className: string }
export function stylerun<T extends { className?: string; [K: string]: any }>(
  component: React.FunctionComponent<T>,
): React.FunctionComponent<T> & { className: string }
export function stylerun(
  component: keyof JSX.IntrinsicElements | React.FunctionComponent,
): React.FunctionComponent & { className: string } {
  if (typeof component === `string`) {
    return stylerun((props) => React.createElement(component, props))
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

export const StylerunContext = React.createContext(
  new Map<string, { count: number; id: string; innerHTML: string }>(),
)

export function Style({ children: style }: { children: string }) {
  const cache = React.useContext(StylerunContext)
  React.useLayoutEffect(() => {
    let meta = cache.get(style)
    if (meta !== undefined) {
      meta.count++
    } else {
      cache.set(
        style,
        (meta = {
          count: 1,
          id: createUid(),
          innerHTML: style,
        }),
      )

      document.head.append(Object.assign(document.createElement(`style`), meta))
    }

    return () => {
      if (--meta!.count === 0) {
        cache.delete(style)
        document.getElementById(meta!.id)!.remove()
      }
    }
  }, [cache, style])

  return null
}

export function useCssVar(value: string | number, description = `var`) {
  const name = React.useState(() => `--${createUid(description)}`)[0]

  return {
    var: `var(${name})`,
    style: {
      [name]: value,
    },
  }
}
