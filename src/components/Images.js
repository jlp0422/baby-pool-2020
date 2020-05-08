import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  > * {
    margin-top: 0;
  }
`

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            id
            fluid(maxHeight: 500, maxWidth: 500) {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  if (!data) {
    return null
  }

  const images = data.allImageSharp.edges.map(edge => edge.node)

  return (
    <Div>
      {images.map(({ id, fluid }) => (
        <Img key={id} fluid={fluid} alt={fluid.originalName} title={fluid.originalName} />
      ))}
    </Div>
  )
}

export default Image
