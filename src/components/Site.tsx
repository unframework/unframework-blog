import { PageProps } from 'gatsby';

export interface SiteNodeFrontmatter {
  title: string;
  description: string;
  date: string;
}

export interface SiteNode {
  // @todo proper content type
  html: string;
  excerpt: string;
  frontmatter: SiteNodeFrontmatter;
  fields: {
    slug: string;
  };
}

export interface SitePageData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: {
        name: string;
        url: string;
      };
    };
  };
  markdownRemark: SiteNode;
}

export interface SitePageContext {
  slug: string;
}

export interface SiteBlogPageContext extends SitePageContext {
  previous: SiteNode | null;
  next: SiteNode | null;
}

export type SitePageProps = PageProps<SitePageData, SitePageContext>;
export type SiteBlogPageProps = PageProps<SitePageData, SiteBlogPageContext>;
