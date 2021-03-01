import styled from 'styled-components'

import colors from '@/utils/colors'

type Props = { bold?: boolean }

const Text = styled.p<Props>`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.text};
  letter-spacing: 0.24px;
`

export default Text
