import { useMutation } from '@apollo/client'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import AuthLayout from '../components/auth/AuthLayout'
import BottomBox from '../components/auth/BottomBox'
import Button from '../components/auth/Button'
import FormBox from '../components/auth/FormBox'
import FormError from '../components/auth/FormError'
import Input from '../components/auth/Input'
import PageTitle from '../components/PageTitle'
import { FatLink } from '../components/shared'
import routes from '../routes'
import {
  createAccount,
  createAccountVariables,
} from '../__generated__/createAccount'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`

interface IForm {
  firstName: string
  lastName?: string
  email: string
  username: string
  password: string
  result?: string
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $firstName: String!
    $lastName: String
    $password: String!
    $username: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      ok
      error
    }
  }
`

const SignUp = () => {
  const history = useHistory()

  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues()
    const {
      createAccount: { ok, error },
    } = data
    if (!ok) {
      return setError('result', { message: error || undefined })
    }
    history.push(routes.home, {
      message: 'Account created. Please log in.',
      username,
      password,
    })
  }
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted })

  const {
    register,
    handleSubmit,
    errors,
    formState: { isValid },
    getValues,
    setError,
  } = useForm<IForm>({
    mode: 'onChange',
  })

  const onSubmitValid: SubmitHandler<IForm> = (data) => {
    if (loading) {
      return
    }
    createAccount({ variables: { ...data } })
  }

  return (
    <AuthLayout>
      <PageTitle title='Sign up' />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size='3x' />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: 'First Name is reuiqred.' })}
            name='firstName'
            type='text'
            placeholder='First Name'
            hasError={Boolean(errors.firstName?.message)}
          />
          <FormError message={errors.firstName?.message} />
          <Input
            ref={register}
            name='lastName'
            type='text'
            placeholder='Last Name'
          />
          <Input
            ref={register({ required: 'Email is reuiqred.' })}
            name='email'
            type='text'
            placeholder='Email'
            hasError={Boolean(errors.email?.message)}
          />
          <FormError message={errors.email?.message} />
          <Input
            ref={register({ required: 'Username is reuiqred.' })}
            name='username'
            type='text'
            placeholder='Username'
            hasError={Boolean(errors.username?.message)}
          />
          <FormError message={errors.username?.message} />
          <Input
            ref={register({ required: 'Password is reuiqred.' })}
            name='password'
            type='password'
            placeholder='Password'
            hasError={Boolean(errors.password?.message)}
          />
          <FormError message={errors.password?.message} />
          <Button
            type='submit'
            value={loading ? 'Loading' : 'Sign up'}
            disabled={!isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta='Have an account?' linkText='Log in' link={routes.home} />
    </AuthLayout>
  )
}

export default SignUp
