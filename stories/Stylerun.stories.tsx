import React from 'react';
import { Meta, Story } from '@storybook/react';
import { stylerun, Style, useCssVar } from '../src';

const Text = stylerun(`span`)
// only one rule you need to use zero-cost css-in-js
// forward `className` to stylerun container
const Consent = stylerun(({ className, options, onChange }) => (
  <select className={className} onChange={onChange}>
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </select>
))

const Example = stylerun(({ className }) => {
  const [hue, updateHue] = React.useState(1)
  const [isAwesome, updateIsAwesome] = React.useState(true)
  const color = useCssVar(`hsl(${hue}, 100%, ${isAwesome ? 50 : 20}%)`, `color`)

  React.useEffect(() => {
    requestAnimationFrame(() => {
      updateHue((hue + 1) % 360)
    })
  }, [hue])

  return (
    <>
      <div style={color.style} className={className}>
        <Text>Web is awesome!</Text>
        <br />
        <Consent
          options={[`yes`, `no`]}
          onChange={(e) => updateIsAwesome(e.target.value === `yes`)}
        />
      </div>
      <Style>{`
        ${Text} {
          padding: 0.5em;
          font-size: 2em;
          background-color: ${color.var};
        }
        ${Consent} {
          margin-top: 1rem;
        }
      `}</Style>
    </>
  )
})

function App() {
  return (
    <>
      <Example />
      <Example />
      <Style>{`
        ${Example} + ${Example} {
          margin-top: 2rem;
        }
      
      `}</Style>
    </>
  )
}

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
