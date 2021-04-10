import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import AuthLayout from '../components/auth/AuthLayout'
import BottomBox from '../components/auth/BottomBox'
import Button from '../components/auth/Button'
import FormBox from '../components/auth/FormBox'
import Input from '../components/auth/Input'
import Separator from '../components/auth/Separator'
import PageTitle from '../components/PageTitle'
import routes from '../routes'

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

interface IForm {
  username: string
  password: string
}

const Login = () => {
  const { register, handleSubmit, getValues } = useForm<IForm>()

  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    console.log(data)
  }

  const onSubmitInvalid = () => {
    const { username, password } = getValues()
  }

  return (
    <AuthLayout>
      <PageTitle title='Login' />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size='3x' />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            //@ts-ignore
            ref={register({
              required: 'Username is required.',
              minLength: 5,
              validate: (currentValue: string) =>
                currentValue.includes('potato'),
            })}
            name='username'
            type='text'
            placeholder='Username'
          />
          <Input
            //@ts-ignore
            ref={register({ required: true })}
            name='password'
            type='password'
            placeholder='Password'
          />
          <Button type='submit' value='Log in' />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Dont' have an account?"
        linkText='Sign up'
        link={routes.signUp}
      />
    </AuthLayout>
  )
}

export default Login
