import { PageHome } from "../modules/page-home/page-home.component";
import path from "path";
import fs from "fs";

export const getStaticProps = () => {
  const postsDirectory = path.join(process.cwd(), "articles");
  const filenames = fs.readdirSync(postsDirectory);
  const slugs = filenames.map(filename => {
    return path.parse(filename).name;
  });

  return {
    props: {
      slugs
    }
  };
};

export default PageHome;
