// import sanitizeHtml from 'sanitize-html'

import { Fragment, VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FatText } from '../shared'

const CommentContainer = styled.div``

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
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
  // let cleanedPayload
  // if (payload) {
  //   cleanedPayload = sanitizeHtml(
  //     payload?.replace(/#[\w]+/g, '<mark>$&</mark>'),
  //     {
  //       allowedTags: ['mark'],
  //     }
  //   )
  // }
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      {/* {cleanedPayload && (
        <CommentCaption dangerouslySetInnerHTML={{ __html: cleanedPayload }} />
      )} */}
      <CommentCaption>
        {payload?.split(' ').map((word, index) =>
          /#[\w]+/.test(word) ? (
            <Link key={index} to={`/hashtags/${word}`}>
              {word}{' '}
            </Link>
          ) : (
            <Fragment key={index}>{word} </Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  )
}

export default Comment
