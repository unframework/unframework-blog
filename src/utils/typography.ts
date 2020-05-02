import Typography from 'typography';
import ThemeWikipedia from 'typography-theme-wikipedia';

ThemeWikipedia.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`
    }
  };
};

delete ThemeWikipedia.googleFonts;

const typography = new Typography(ThemeWikipedia);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
