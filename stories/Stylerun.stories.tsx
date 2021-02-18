import React from 'react'
import { Meta, Story } from '@storybook/react'
import { styled, Style } from '../src'

const AwesomeText = styled<{ isAwesome: boolean }>(
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

const Consent = styled<{
  options: Array<string>
  onChange: React.SelectHTMLAttributes<HTMLSelectElement>['onChange']
}>(({ className, options, onChange }) => (
  <select className={className} onChange={onChange}>
    {options.map(option => (
      <option key={option}>{option}</option>
    ))}
  </select>
))

const Example = styled(({ className }) => {
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

const App = styled(({ className }) => {
  const [input, update] = React.useState(0)
  return (
    <div className={className}>
      <input type="number" onChange={e => update(+e.currentTarget.value)} />
      {new Array(input).fill(null).map(() => (
        <Example />
      ))}
      <Style>{`
        .${className} {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        .${className} > input, ${Example} + ${Example} {
          margin: 0.5rem;
        }
      `}</Style>
    </div>
  )
})

const meta: Meta = {
  title: 'Main',
  component: App,
}

export default meta

const Template: Story = () => <App />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
