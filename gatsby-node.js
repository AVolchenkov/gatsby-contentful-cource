const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
    });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const {data: { contentfulBlog, allContentfulBlogPost, allShopifyProduct, contentfulProduct },} = await graphql(`
    {
      contentfulBlog {
        postsPerPage
        slug
      }
      allContentfulBlogPost(sort: {publishDate: DESC}) {
        edges {
          node {
            shopifyProductTag
            publishDate(formatString: "DD MMM YYYY")
            pageContent {
              raw
            }
            description
            title
            description
            contentful_id
            slug
          }
        }
      }
      contentfulProduct {
        slug
      }
      allShopifyProduct {
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
  `);

  allContentfulBlogPost.edges.forEach((blogPost) => {
  console.log("blogPost", blogPost);

    createPage({
      path: `${contentfulBlog.slug}/${blogPost.node.slug}`,
      context: {
        postId: blogPost.node.contentful_id,
        tagName: blogPost.node.shopifyProductTag
      },
      component: path.resolve("./src/templates/BlogPost/index.js"),
    });
  });

  allShopifyProduct.nodes.forEach((product) => {
    console.log("product", product);
  
      createPage({
        path: `${contentfulProduct.slug}/${product.handle}`,
        context: {
          handle: product.handle
        },
        component: path.resolve("./src/pages/product.js"),
      });
    });

  const numPages = Math.ceil(allContentfulBlogPost.edges.length / contentfulBlog.postsPerPage)
  for (let i = 0; i < numPages; i++) {
    console.log("allContentfulBlogPost", allContentfulBlogPost);
    createPage({
      path: `${contentfulBlog.slug}${i === 0 ? "" : `/${i + 1}`}`,
      component: path.resolve(
        "./src/templates/PaginatedBlogPage/index.js"
      ),
      context: {
        blogSlug: contentfulBlog.slug,
        totalPages: numPages,
        currentPage: i + 1,
        posts: allContentfulBlogPost.edges
          .map((blogPost) => blogPost.node)
          .slice(
            i * contentfulBlog.postsPerPage,
            i * contentfulBlog.postsPerPage +
              contentfulBlog.postsPerPage
          ),
      },
    });
  }
};
