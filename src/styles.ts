import reset from 'styled-reset'
import { createGlobalStyle, DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  accent: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
}

export const darkTheme: DefaultTheme = {}

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all: unset;
    }
    * {
      box-sizing: border-box;
    }
    body {
        background-color: #fafafa;
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: rgba(38, 38, 38);
    }
    a {
      text-decoration: none;
    }
`
