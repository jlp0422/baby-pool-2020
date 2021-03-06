import { css, Global } from '@emotion/core'
import React from 'react'
import background from '../backgrounds/background.jpg'

export default () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
        }
        * + * {
          margin-top: 1rem;
        }

        html,
        body {
          background: url(${background}) repeat-y center center fixed;
          background-color: rgba(255, 255, 255, 0.6);
          background-blend-mode: lighten;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          height: 100vh;
          overflow: scroll;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          font-size: 62.5%;
          line-height: 1.4;
          /* remove margin for the main div that Gatsby mounts into */
          > div {
            margin-top: 0;
          }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: #222;
          line-height: 1.1;
          + * {
            margin-top: 1rem;
          }
        }
        a {
          font-size: 16px;
        }
      `}
    />
  )
}
