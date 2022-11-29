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
  const {data: { contentfulBlog, allContentfulBlogPost, shopifyProductByTag },} = await graphql(`
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
        shopifyProductsByTag: shopifyProductByTag,
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
