import { Link } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import { ActivePage, Content, Pagination, Post } from "./style";

const PaginatedBlogPage = ({pageContext}) => {
  return (
    <Layout>
      <Content>
        {pageContext.posts.map(post => (
          <Post key={post.contentful_id}>
            <div>
              <Link to={`/${pageContext.blogSlug}/${post.slug}`}>{post.title}</Link>
            </div>
            <div>
              {post.description}
            </div>
            <small>
              {post.publishDate}
            </small>
          </Post>
        ))}
      </Content>
      <Pagination>
        {Array.from({length: pageContext.totalPages}).map((n, i) => (
          <Link to={`/${pageContext.blogSlug}/${i === 0 ? '' : i + 1}`}>
            {pageContext.currentPage === i + 1 ? 
            <ActivePage>{i + 1}</ActivePage> : <span>{i + 1}</span>}
          </Link>
        ))}
      </Pagination>
    </Layout>
  )
}

export default PaginatedBlogPage;