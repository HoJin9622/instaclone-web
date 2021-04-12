import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import {
  createComment,
  createCommentVariables,
} from '../../__generated__/createComment'
import { seeFeed_seeFeed_comments } from '../../__generated__/seeFeed'
import Comment from './Comment'

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`

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
  photoId: number
  author: string
  caption: string | null
  commentNumber: number
  comments: (seeFeed_seeFeed_comments | null)[] | null
}

interface IForm {
  payload: string
}

const Comments: VFC<IProps> = ({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}) => {
  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION)

  const { register, handleSubmit, setValue } = useForm<IForm>()

  const onValid: SubmitHandler<IForm> = (data) => {
    const { payload } = data
    if (loading) {
      return
    }
    createCommentMutation({
      variables: { photoId, payload },
    })
    setValue('payload', '')
  }

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
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            ref={register({ required: true })}
            name='payload'
            type='text'
            placeholder='Write a comment...'
          />
        </form>
      </div>
    </CommentsContainer>
  )
}

export default Comments
