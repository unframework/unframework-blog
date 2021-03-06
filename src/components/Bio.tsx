/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/nick-profile-small.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        alignItems: 'center',
        marginBottom: rhythm(2.5)
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`
        }}
        imgStyle={{
          borderRadius: `50%`
        }}
      />
      <div>
        Hi! I am <strong>{author.name}</strong>, {author.summary}.<br />

        <Link to="/about-me">
          About Me
        </Link>{' '}
        |<a href={`https://twitter.com/${encodeURIComponent(social.twitter)}`}>
          Twitter
        </a>{' '}
        |{' '}
        <a href={`https://github.com/${encodeURIComponent(social.github)}`}>
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Bio;
