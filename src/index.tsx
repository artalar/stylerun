import React from 'react'

const cid = (Date.now() + Math.random() * 1e17).toString(36)
let i = 0
function createUid() {
  return `stylerun_${cid}_${++i}`
}

let scopeI = 0
let ID: null | string = null

export function stylerun<T extends keyof JSX.IntrinsicElements>(
  tag: T,
): React.FunctionComponent<JSX.IntrinsicElements[T]> & { className: string }
export function stylerun<T extends { className?: string; [K: string]: any }>(
  component: React.FunctionComponent<T>,
): React.FunctionComponent<T> & { className: string }
export function stylerun(
  Component_: keyof JSX.IntrinsicElements | React.FunctionComponent,
): React.FunctionComponent & { className: string } {
  if (typeof Component_ === `string`) {
    return stylerun(props => <Component_ {...props} />)
  }

  function Component(props: any, ref: any) {
    try {
      scopeI = 0
      // `className` may be rewrited in built time for better debug or SSR
      ID = Component.className.slice(1)
      return (Component_ as React.FunctionComponent)(
        Object.assign({}, props, {
          className: `${ID} ${props.className || ``}`,
        }),
        ref,
      )
    } finally {
      ID = null
    }
  }
  Component.className = `.${createUid()}`
  Component.toString = () => Component.className

  return Component
}

export const StylerunContext = React.createContext(
  new Map<string, { count: number; id: string }>(),
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
        }),
      )

      document.head.append(
        Object.assign(document.createElement(`style`), meta, {
          type: `text/css`,
          innerHTML: style,
        }),
      )
    }

    return () => {
      const meta = cache.get(style)!
      if (--meta.count === 0) {
        cache.delete(style)
        document.getElementById(meta.id)!.remove()
      }
    }
  }, [cache, style])

  return null
}

export function useCssVar(value: string | number, name = `var`) {
  const nameRef = React.useRef<string>()
  if (!nameRef.current) {
    if (ID === null) {
      throw new Error(`Can't use \`useCssVar\` outside Stylerun HOC`)
    }
    nameRef.current = `--${name}_${++scopeI}_${ID}`
  }

  return {
    var: `var(${nameRef.current})`,
    style: {
      [nameRef.current]: value,
    },
  }
}
