import { useParams } from 'react-router'

interface IParams {
  username: string
}

const Profile = () => {
  const { username } = useParams<IParams>()

  return <div></div>
}

export default Profile
