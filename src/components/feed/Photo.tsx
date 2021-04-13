import { ApolloCache, FetchResult, useMutation } from '@apollo/client'
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons'
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag'
import { VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { seeFeed_seeFeed } from '../../__generated__/seeFeed'
import { toggleLike, toggleLikeVariables } from '../../__generated__/toggleLike'
import Avatar from '../Avatar'
import { FatText } from '../shared'
import Comments from './Comments'

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(239, 239, 239);
`

const Username = styled(FatText)`
  margin-left: 15px;
`

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`

const PhotoData = styled.div`
  padding: 12px 15px;
`

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`

const Photo: VFC<seeFeed_seeFeed> = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const updateToggleLike = (
    cache: ApolloCache<any>,
    result: FetchResult<any>
  ) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result
    if (ok) {
      //   2번째 방법 캐시를 읽고 캐시의 변수를 찾아내서 쓰는 방법
      //   const fragmentId = `Photo:${id}`
      //   const fragment = gql`
      //     fragment BSName on Photo {
      //       isLiked
      //       likes
      //     }
      //   `
      //   const result: any = cache.readFragment({
      //     id: fragmentId,
      //     fragment: fragment,
      //   })
      //   if ('isLiked' in result && 'likes' in result) {
      //     const { isLiked: cacheIsLiked, likes: cacheLikes } = result
      //     cache.writeFragment({
      //       id: fragmentId,
      //       fragment: fragment,
      //       data: {
      //         isLiked: !cacheIsLiked,
      //         likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
      //       },
      //     })
      //   }

      // 1번째 방법 그냥 쓰기
      // cache.writeFragment({
      //   id: `Photo:${id}`,
      //   fragment: gql`
      //     fragment BSName on Photo {
      //       isLiked
      //       likes
      //     }
      //   `,
      //   data: {
      //     isLiked: !isLiked,
      //     likes: isLiked ? likes - 1 : likes + 1,
      //   },
      // })

      // 3번째 방법 modify
      const photoId = `Photo:${id}`
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            }
            return prev + 1
          },
        },
      })
    }
  }

  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: { id },
      update: updateToggleLike,
    }
  )

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user.username}}`}>
          <Avatar url={user.avatar} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
        />
      </PhotoData>
    </PhotoContainer>
  )
}

export default Photo
