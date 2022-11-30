import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout";
import { RichText } from "../../components/RichText";
import { SEO } from "../../components/SEO";
import { ImageWrapper, PriceBox, ShopifyProductItem, ShopifyProductItemTitle, Wrapper } from "./style";

const BlogPost = (props) => {
  console.log("propsBlog",props);
  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} description={props.data.contentfulBlogPost.description}/>
      <RichText references={props.data.contentfulBlogPost.pageContent.references} raw={props.data.contentfulBlogPost.pageContent.raw} />
      {!!props.data.allShopifyProduct.nodes.length &&
        <>
          <ShopifyProductItemTitle>{props.data.contentfulBlogPost.shopifyProductSectionTitle}</ShopifyProductItemTitle>
          <Wrapper>
            {props.data.allShopifyProduct.nodes.map(product => (
              <ShopifyProductItem key={product.id}>
                <Link to={`/product/${product.handle}`} style={{color: "#000"}}>
                  <ImageWrapper>
                    <img alt={product.featuredImage.altText ? product.featuredImage.altText : "Image description"} src={product.featuredImage.src}/>
                  </ImageWrapper>
                  <div>{product.title}</div>
                  <PriceBox>
                    <ins>${product.variants[0].price}</ins>
                    <del>${product.variants[0].compareAtPrice}</del>
                  </PriceBox>
                </Link>
              </ShopifyProductItem>
            ))}
          </Wrapper>
        </>
      }
    </Layout>
  );
};

export const query = graphql`
    query BlogPostQuery($postId: String, $tagName: String) {
        contentfulBlogPost(contentful_id: { eq: $postId }) {
            publishDate(formatString: "DD MMM YYYY")
            shopifyProductTag
            shopifyProductSectionTitle
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
        allShopifyProduct(filter: {tags: {eq: $tagName}}) {
          nodes {
            id
            title
            handle
            variants {
              price
              compareAtPrice
            }
            featuredImage {
              src
              altText
            }
          }
        }
    }
`;

export default BlogPost;