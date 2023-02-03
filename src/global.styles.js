import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        padding: 20px 40px;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale; 
        
        @media screen and (max-width: 800px){
            padding: 10px;
        }
    }
    
    a{
        text-decoration: none;
        color: black;
    }

    *{
         box-sizing: border-box;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        }

`;
