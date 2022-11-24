import React from "react";
import { graphql } from "gatsby";

export default function (props) {
  console.log(props);
  return (
    <div>
      <h1>{props.data.contentfulPage.title}</h1>
    </div>
  )
}

export const query = graphql `
  query PageQuery($id: String) {
    contentfulPage(id: {eq: $id}) {
      id
      title
    }
  }
`