import { ApolloCache, FetchResult, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import useUser from '../../hooks/useUser'
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
      id
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
  const { data: userData } = useUser()
  const { register, handleSubmit, setValue, getValues } = useForm<IForm>()

  const createCommentUpdate = (
    cache: ApolloCache<any>,
    result: FetchResult<any>
  ) => {
    const { payload } = getValues()
    setValue('payload', '')
    const {
      data: {
        createComment: { ok, id },
      },
    } = result
    if (ok && userData?.me) {
      const newComment = {
        __typename: 'Comment',
        createdAt: Date.now(),
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      }
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newComment]
          },
          commentNumber(prev) {
            return prev + 1
          },
        },
      })
    }
  }

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate,
  })

  const onValid: SubmitHandler<IForm> = (data) => {
    const { payload } = data
    if (loading) {
      return
    }
    createCommentMutation({
      variables: { photoId, payload },
    })
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
