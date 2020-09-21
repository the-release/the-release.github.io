import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { PageProps, PageComponent } from "../modules/page/page.component";
import { getPages } from "../services/page.service";

interface PageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const pages = await getPages({
    props: ["slug"]
  });
  const paths = pages.map(({ slug }) => {
    return {
      params: { slug }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params
}) => {
  const [page] = await getPages({
    props: ["htmlContent"],
    where: {
      slug: params!.slug
    }
  });

  return {
    props: {
      page
    }
  };
};

export default PageComponent;
