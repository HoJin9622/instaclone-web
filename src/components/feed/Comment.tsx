import { VFC } from 'react'
import styled from 'styled-components'
import { FatText } from '../shared'

const CommentContainer = styled.div``

const CommentCaption = styled.span`
  margin-left: 10px;
`

interface IProps {
  author?: string
  payload?: string | null
}

const Comment: VFC<IProps> = ({ author, payload }) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  )
}

export default Comment
