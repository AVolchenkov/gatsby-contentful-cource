import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import { RichText } from "../../components/RichText";
import { SEO } from "../../components/SEO";

const BlogPost = (props) => {
  console.log("propsBlog",props);
  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} description={props.data.contentfulBlogPost.description}/>
      <RichText references={props.data.contentfulBlogPost.pageContent.references} raw={props.data.contentfulBlogPost.pageContent.raw} />
    </Layout>
  );
};

export const query = graphql`
    query BlogPostQuery($postId: String) {
        contentfulBlogPost(contentful_id: { eq: $postId }) {
            publishDate(formatString: "DD MMM YYYY")
            pageContent {
                raw
                references {
                  contentful_id
                  __typename
                  title
                  gatsbyImageData(layout: FULL_WIDTH)
                }
            }
            description
            title
            contentful_id
            slug
        }
    }
`;

export default BlogPost;