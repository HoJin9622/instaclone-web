import { gql, useQuery, useReactiveVar } from '@apollo/client'
import { useEffect } from 'react'
import { isLoggedInVar, logUserOut } from '../apollo'
import { me } from '../__generated__/me'

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar)
  const { data } = useQuery<me>(ME_QUERY, { skip: !hasToken })
  console.log(data)
  useEffect(() => {
    if (data?.me === null) {
      logUserOut()
    }
  }, [data])

  return
}

export default useUser
