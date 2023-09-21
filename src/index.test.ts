import 'linkedom-global'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import './randomMock'
import styled from './'

test('base', async () => {
  let listStyles = styled('')`
    color: red;
  `
  let ulStyles = styled('')`
    margin: 1rem;
  `.styled(':hover')`
    box-shadow: 0 0 1rem gray;
  `.styled(listStyles)`
    padding-left: 1rem;
    color: ${(props: { color: string }) => props.color};
  `

  // based on `randomMock`
  const liClassName = 'sr_1_zzza'
  const className = 'sr_2_zzza'
  const varName = `--3_${className}`

  assert.equal(ulStyles({ color: 'red' }), {
    className,
    style: {
      [varName]: 'red',
    },
  })

  await null

  const styleEl = document.getElementById('stylerun')!
  assert.is(
    styleEl.innerText,
    `.${liClassName}{ color: red; }.${className}{ margin: 1rem; }.${className}:hover{ box-shadow: 0 0 1rem gray; }.${className} .${liClassName}{ padding-left: 1rem; color: var(${varName}); }`,
  )
})

test.run()
