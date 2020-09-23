export const NODE_ENV = process.env.NODE_ENV;
export const SITE_NAME = "The Release";
export const SITE_DESCRIPTION =
  "Your Daily Dose of News About The Tech Industry";
export const SLOGAN = "Tech's\u00A0Single Source\u00A0of\u00A0Truth.";
export const ORIGIN = process.env.ORIGIN || "http://localhost:3000";
export const DEFAULT_SOCIAL_IMAGE = `${ORIGIN}/social-image.png`;
export const DEFAULT_SOCIAL_IMAGE_ALT = `The Release's Logo`;
export const ITEMS_PER_PAGE = 9;
export const HOMEPAGE_MAX_ITEMS = 10;
export const TWITTER_HANDLE = "@TheReleaseNews";
export const TWITTER_URL = "https://twitter.com/TheReleaseNews";
export const GITHUB_URL = "https://github.com/the-release/";
export const IMAGE_SIZES = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1100,
  1200,
  1300,
  1400,
  1500,
  1600
] as const;
export const COVER_IMAGE_MIN_WIDTH = 768 * 2;
export const AUTHOR_IMAGE_MIN_WIDTH = 300;
