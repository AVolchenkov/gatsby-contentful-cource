import styled from 'styled-components'

export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

export const Post = styled.div`
  margin: 20px 0;
  a {
    font-weight: 700;
    font-size: 20px;
  }
`

export const Pagination = styled.div`
  text-align: center;
  a {
    padding: 0 4px;
  }

  span {
    display: inline-block;
    padding: 6px 12px;
    background: #000;
    color: #fff;
    border-radius: 6px;
  }
`

export const ActivePage = styled.span`
  background: blueviolet !important;
`