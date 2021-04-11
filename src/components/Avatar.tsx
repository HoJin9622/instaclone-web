import { VFC } from 'react'
import styled from 'styled-components'

const SAvatar = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #2c2c2c;
  overflow: hidden;
`

const Img = styled.img`
  max-width: 100%;
`

interface IProps {
  url?: string | null | undefined
}

const Avatar: VFC<IProps> = ({ url }) => {
  return <SAvatar>{url ? <Img src={url} /> : null}</SAvatar>
}

export default Avatar
