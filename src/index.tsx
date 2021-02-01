import React from 'react'

const cid = (Date.now() + Math.random()).toString(36).replace(`.`, ``)
let i = 0
function createUid() {
  return `${cid}_${++i}`
}

let scopeI = 0
let ID: null | string = null

export function stylerun(
  tag: keyof JSX.IntrinsicElements,
): React.FunctionComponent & { className: string }
export function stylerun<T extends { className?: string;[K: string]: any }>(
  component: React.FunctionComponent<T>,
): React.FunctionComponent<T> & { className: string }
export function stylerun<T extends { className?: string;[K: string]: any }>(
  componentOrTag: keyof JSX.IntrinsicElements | React.FunctionComponent<T>,
): React.FunctionComponent<T> & { className: string } {
  if (typeof componentOrTag === `string`) {
    const Tag = componentOrTag
    return stylerun((props) => <Tag {...props} />)
  }

  const id = createUid()
  const className = `stylerun_${id}`

  function Component(props: T, ref: any) {
    try {
      scopeI = 0
      ID = id
      return (componentOrTag as React.FunctionComponent<T>)(
        { ...props, className: `${className} ${props.className || ``}` },
        ref,
      )
    } finally {
      ID = null
    }
  }
  Component.className = `.${className}`
  Component.toString = () => Component.className

  return Component
}

export const StylerunContext = React.createContext(
  new Map<string, { count: number; id: string }>(),
)

export function Style({ children: style }: { children: string }) {
  const metas = React.useContext(StylerunContext)
  React.useLayoutEffect(() => {
    let meta = metas.get(style)
    if (meta !== undefined) {
      meta.count++
    } else {
      metas.set(
        style,
        (meta = {
          count: 1,
          id: `stylerun_${createUid()}`,
        }),
      )

      const styleTag = document.createElement(`style`)
      styleTag.id = meta.id
      styleTag.type = `text/css`
      styleTag.innerHTML = style
      document.head.append(styleTag)
    }

    return () => {
      const meta = metas.get(style)!
      if (--meta.count === 0) {
        metas.delete(style)
        document.getElementById(meta.id)!.remove()
      }
    }
  }, [metas, style])

  return null
}

export function useCssVar(value: string | number, name = `var`) {
  const nameRef = React.useRef<string>()
  if (!nameRef.current) {
    if (!ID) {
      throw new Error(`Can't use \`useCssVar\` outside \`stylerun\` HOC`)
    }
    nameRef.current = `--${name}_${ID}_${++scopeI}`
  }

  return {
    var: `var(${nameRef.current})`,
    style: {
      [nameRef.current]: value,
    },
  }
}

/*
TODO: https://codesandbox.io/s/cssinjs-benchmarks-v2-decorators-5cufn
*/
