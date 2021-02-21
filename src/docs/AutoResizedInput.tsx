import { styled } from '../../'

export const AutoResizedInput = styled(
  `input`,
  ({ className, value = '', useCssVar }) => `
  .${className} {
    font-size: ${useCssVar(`${Math.max(1, 2 - String(value).length * 0.1)}em`)}
  }
`,
)
