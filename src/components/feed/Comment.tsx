// import sanitizeHtml from 'sanitize-html'

import { ApolloCache, FetchResult, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Fragment, VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  deleteComment,
  deleteCommentVariables,
} from '../../__generated__/deleteComment'
import { FatText } from '../shared'

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`

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
  id?: number
  photoId?: number
  author?: string
  payload?: string | null
  isMine?: boolean
}

const Comment: VFC<IProps> = ({ id, photoId, author, payload, isMine }) => {
  const updateDeleteComment = (
    cache: ApolloCache<any>,
    result: FetchResult<any>
  ) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result
    if (ok) {
      cache.evict({ id: `Comment:${id}` })
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1
          },
        },
      })
    }
  }

  const [deleteCommentMutation] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, { update: updateDeleteComment })

  // let cleanedPayload
  // if (payload) {
  //   cleanedPayload = sanitizeHtml(
  //     payload?.replace(/#[\w]+/g, '<mark>$&</mark>'),
  //     {
  //       allowedTags: ['mark'],
  //     }
  //   )
  // }

  const onDeleteClick = () => {
    if (!id) return
    deleteCommentMutation({ variables: { id } })
  }

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
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  )
}

export default Comment
