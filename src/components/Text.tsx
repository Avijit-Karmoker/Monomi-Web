import styled from '@emotion/styled'

type Props = { bold?: boolean }

const Text = styled.p<Props>`
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.24px;
`

export default Text
