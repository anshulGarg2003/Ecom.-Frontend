import React from 'react'
import {categories} from "../data"
import { styled } from 'styled-components'
import CategoryItem from './CategoryItem'
import { mobile } from "../responsive";


const Container=styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    ${mobile({flexDirection:"column",alignItem:"center"})}
`
const Categories = () => {
  return (
    <Container>
      {categories.map(item =>(
          <CategoryItem item={item} key={item.id}/>
      ))}
    </Container>
  )
}

export default Categories