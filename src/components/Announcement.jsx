import React from 'react'
import { styled } from 'styled-components'

const Container=styled.div`
  height: 30px;
  font-size: 20px;
  background-color: #32d69c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bold;
`

const Announcement = () => {
  return (
    <>
      <Container>
        Big Announcement!!!
      </Container>
    </>
  )
}

export default Announcement
