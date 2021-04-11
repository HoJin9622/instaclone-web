import sanitizeHtml from 'sanitize-html'
import { VFC } from 'react'
import styled from 'styled-components'
import { FatText } from '../shared'

const CommentContainer = styled.div``

const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`

interface IProps {
  author?: string
  payload?: string | null
}

const Comment: VFC<IProps> = ({ author, payload }) => {
  let cleanedPayload
  if (payload) {
    cleanedPayload = sanitizeHtml(
      payload?.replace(/#[\w]+/g, '<mark>$&</mark>'),
      {
        allowedTags: ['mark'],
      }
    )
  }
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      {cleanedPayload && (
        <CommentCaption dangerouslySetInnerHTML={{ __html: cleanedPayload }} />
      )}
    </CommentContainer>
  )
}

export default Comment
