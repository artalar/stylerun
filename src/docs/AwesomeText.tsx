import React from 'react'
import { styled, Style } from '..'

export const AwesomeText = styled<{ isAwesome: boolean }>(
  `div`,
  ({ isAwesome, className, useCssVar }) => {
    const [hue, updateHue] = React.useState(1)
    React.useEffect(() => {
      requestAnimationFrame(() => {
        updateHue((hue + 1) % 360)
      })
    }, [hue])

    const light = isAwesome ? 50 : 20
    const colorVar = useCssVar(`hsl(${hue}, 100%, ${light}%)`)

    return `
      .${className} {
        padding: 0.25em;
        background-color: ${colorVar};
      }
    `
  },
)

export const Consent = styled<{
  options: Array<string>
  onChange: React.SelectHTMLAttributes<HTMLSelectElement>['onChange']
}>(({ className, options, onChange }) => (
  <select className={className} onChange={onChange}>
    {options.map(option => (
      <option key={option}>{option}</option>
    ))}
  </select>
))

export const Example = styled(({ className }) => {
  const [isAwesome, updateIsAwesome] = React.useState(true)

  return (
    <>
      <div className={className}>
        <Consent
          options={[`yes`, `no`]}
          onChange={e => updateIsAwesome(e.currentTarget.value === `yes`)}
        />
        <AwesomeText isAwesome={isAwesome}>Web is awesome!</AwesomeText>
      </div>
      <Style>{`
          .${className} {
            display: flex;
            align-items: center;
            width: fit-content;
            box-shadow: 0 0 0.5em -0.2em;
          }
        `}</Style>
    </>
  )
})
