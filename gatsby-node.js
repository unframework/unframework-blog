const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// set up a slug field
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const sourceInstanceName = getNode(node.parent).sourceInstanceName;

    createNodeField({
      name: `slug`,
      node,
      value:
        (sourceInstanceName === 'blog' ? '/blog' : '') +
        createFilePath({
          node,
          getNode
        })
    });

    createNodeField({
      name: `sourceInstanceName`,
      node,
      value: sourceInstanceName
    });
  }
};

// walk the nodes and set up generated pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allPageMarkdownRemark: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "page" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }

        allBlogMarkdownRemark: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "blog" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create pages.
  const pageTemplate = path.resolve(`./src/templates/page.tsx`);
  const pages = result.data.allPageMarkdownRemark.edges;
  pages.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: pageTemplate,
      context: {
        slug: post.node.fields.slug
      }
    });
  });

  // Create blog posts.
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const blogPosts = result.data.allBlogMarkdownRemark.edges;
  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    });
  });
};
