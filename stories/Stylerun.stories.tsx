import React from 'react';
import { Meta, Story } from '@storybook/react';
import { styled, Style, useCssVar } from '../src';

const AwesomeText = styled(`div`, ({ isAwesome }: { isAwesome: boolean }) => {
  const [hue, updateHue] = React.useState(1)
  React.useEffect(() => {
    requestAnimationFrame(() => {
      updateHue((hue + 1) % 360)
    })
  }, [hue])

  const colorVar = useCssVar(`hsl(${hue}, 100%, ${isAwesome ? 50 : 20}%)`)

  return `
    ${AwesomeText} {
      padding: 0.25em;
      font-size: 0.5em;
      background-color: ${colorVar};
    }
  `
})

const Consent = styled(({ className, options, onChange }) => (
  <select className={className} onChange={onChange}>
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </select>
))

const Example = styled(({ className }) => {
  const [isAwesome, updateIsAwesome] = React.useState(true)

  return (
    <>
      <div className={className}>
        <AwesomeText isAwesome={isAwesome}>Web is awesome!</AwesomeText>
        <br />
        <Consent
          options={[`yes`, `no`]}
          onChange={(e) => updateIsAwesome(e.target.value === `yes`)}
        />
      </div>
      <Style>{`
        .${className} {
          box-shadow: 0 0 3rem -0.5rem;
          width: fit-content;
        }
        ${Consent} {
          margin-top: 0.5rem;
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
      {new Array(input).fill(null).map(() => <Example />)}
      <Style>{`
        .${className} {
          display: flex;
          flex-wrap: wrap;
        }
        ${Example} + ${Example} {
          margin: 0.5rem;
        }
      `}</Style>
    </div>
  )
})

const meta: Meta = {
  title: 'Main',
  component: App
};

export default meta;

const Template: Story = () => <App />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
