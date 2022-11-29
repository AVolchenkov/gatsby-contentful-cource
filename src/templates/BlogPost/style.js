import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
`

export const ShopifyProductItem = styled.div`
  max-width: 25%;
  padding: 0 10px;
`

export const PriceBox = styled.div`
  del {
    margin: 0 0 0 10px;
  }
`

export const ImageWrapper = styled.div`
  img {
    width: 100%;
  }
`

export const ShopifyProductItemTitle = styled.h2`
  margin: 30px auto 0;
  text-align: center;
`