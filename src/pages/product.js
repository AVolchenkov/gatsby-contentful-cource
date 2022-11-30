import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Product from "../components/Product";

const ShopifyProductPage = (props) => {
  console.log("ProductProps", props);
  return (
    <Layout>
      <Product props={props}></Product>
    </Layout>
  )
}

export const query = graphql`
query ProductQuery($handle: String) {
  allShopifyProduct(filter: {handle: {eq: $handle}}) {
    nodes {
      id
      title
      description
      variants {
        price
        compareAtPrice
      }
      media {
        preview {
          image {
            gatsbyImageData(layout: FULL_WIDTH)
            altText
          }
        }
      }
    }
  }
}
`

export default ShopifyProductPage;