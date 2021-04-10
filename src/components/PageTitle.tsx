import { VFC } from 'react'
import { Helmet } from 'react-helmet-async'

interface IProps {
  title: string
}

const PageTitle: VFC<IProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Instaclone </title>
    </Helmet>
  )
}

export default PageTitle
