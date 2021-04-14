import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useParams } from 'react-router'
import { PHOTO_FRAGMENT } from '../fragment'
import { seeProfile, seeProfileVariables } from '../__generated__/seeProfile'

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`

interface IParams {
  username: string
}

const Profile = () => {
  const { username } = useParams<IParams>()
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    { variables: { username } }
  )

  console.log(data)

  return <div></div>
}

export default Profile
