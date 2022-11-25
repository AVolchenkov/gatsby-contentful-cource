import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout/index"
import { RichText } from "../components/RichText";

export default function ContentfulPages (props) {
  console.log("props",props);
  return (
    <Layout>
      <h1>{props.data.contentfulPage.title}</h1>
      {!!props.data.contentfulPage.pageContent &&
        <RichText references={props.data.contentfulPage.pageContent.references} raw={props.data.contentfulPage.pageContent.raw}/>
      }
    </Layout>
  )
}

export const query = graphql `
  query PageQuery($id: String) {
    contentfulPage(id: {eq: $id}) {
      id
      title
      pageContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            gatsbyImageData(layout: FULL_WIDTH)
          }
          ... on ContentfulHero {
            __typename
            contentful_id
            heading
            subHeading
            backgroundImage {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          ... on ContentfulPriceGroup {
            __typename
            contentful_id
            priceOptions{
              id
              title
              amountPerMonth
              description {
                raw
              }
              mostPopular
            }
          }
        }
      }
    }
  }
`