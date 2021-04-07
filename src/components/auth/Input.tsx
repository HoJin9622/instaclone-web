import { InputHTMLAttributes, VFC } from 'react'
import styled from 'styled-components'

const SInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid rgb(219, 219, 219);
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`

const Input: VFC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <SInput {...props}></SInput>
}

export default Input