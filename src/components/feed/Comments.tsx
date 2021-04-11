import { VFC } from 'react'
import styled from 'styled-components'
import { seeFeed_seeFeed_comments } from '../../__generated__/seeFeed'
import Comment from './Comment'

const CommentsContainer = styled.div`
  margin-top: 20px;
`

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 12px;
`

interface IProps {
  author: string
  caption: string | null
  commentNumber: number
  comments: (seeFeed_seeFeed_comments | null)[] | null
}

const Comments: VFC<IProps> = ({
  author,
  caption,
  commentNumber,
  comments,
}) => {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          author={comment?.user.username}
          payload={comment?.payload}
        />
      ))}
    </CommentsContainer>
  )
}

export default Comments
