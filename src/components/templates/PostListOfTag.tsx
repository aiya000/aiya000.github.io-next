import { HeadFC, graphql } from 'gatsby'
import React from 'react'

import * as style from './PostListOfTag.css'

import Layout from '@/components/Layout'
import PostPreview from '@/components/PostPreview'
import Seo from '@/components/Seo'
import WriterProfile from '@/components/WriterProfile'
import { raise } from '@/modules/Error'

/**
 * A template for src/posts/*.md
 */
const PostListOfTag: React.FC<{ data: Queries.PostListOfTagQuery }> = ({ data }) => {
  const postPreviews = data.allMarkdownRemark.edges.map(extractEdgeToPost)

  return (
    <div>
      <Layout>
        <div className={style.previews}>{postPreviews}</div>
      </Layout>

      <WriterProfile />
    </div>
  )
}

function extractEdgeToPost(
  edge: Queries.PostListOfTagQuery['allMarkdownRemark']['edges'][0],
): React.ReactNode {
  const title = edge.node.frontmatter?.title ?? raise('.title is not existence.')
  const tags = (edge.node.frontmatter?.tags ?? raise('.tags is not existence.')).filter(
    (tag): tag is string => tag !== null,
  )
  const slug = edge.node.fields?.slug ?? raise('.slug is not existence.')
  const excerpt = (
    <div
      dangerouslySetInnerHTML={{
        __html: edge.node.excerpt ?? raise('.excerpt is not existence.'),
      }}
    />
  )

  return (
    <PostPreview
      className={style.preview}
      title={title}
      tags={tags}
      slug={slug}
      excerpt={excerpt}
      key={edge.node.id}
    />
  )
}

export default PostListOfTag

// TODO: Don't ignore eslint.
// eslint-disable-next-line react/prop-types
export const Head: HeadFC<Queries.PostListOfTagQuery> = ({ pageContext }) => {
  if (pageContext === null) {
    throw new Error('pageContext is null.')
  }
  const context: { tag?: unknown } = pageContext

  const tag = context.tag ?? raise('.tag not found.')
  if (typeof tag !== 'string') {
    throw new Error('.tag is not a string.')
  }

  const routeName = `/tags/${tag}`
  // eslint-disable-next-line react/prop-types
  return <Seo routeName={routeName} />
}

export const query = graphql`
  query PostListOfTag($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { glob: $tag } } }
      sort: { fields: { slug: DESC } }
    ) {
      edges {
        node {
          id
          excerpt(format: HTML, pruneLength: 50)
          frontmatter {
            title
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
