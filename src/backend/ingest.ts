import { createConnection, getRepository } from "typeorm";
import { TYPEORM_CONFIG } from "../typeorm.config";
import { getArticles } from "./services/article/article.service";
import { Article } from "../entities/article.entity";
import { Category } from "../entities/category.entity";
import { Author } from "../entities/author.entity";
import { getCategories } from "./services/category/category.service";
import { getAuthors } from "./services/author/author.service";

process.on("uncaughtException", err => {
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err: any) => {
  console.error(err || "An unexpected error occurred.");
  process.exit(1);
});

createConnection(TYPEORM_CONFIG).then(async () => {
  const categoryRepository = getRepository(Category);
  const authorRepository = getRepository(Author);
  const articleRepository = getRepository(Article);
  const categories = await getCategories();
  const authors = await getAuthors();
  const articles = await getArticles();

  for (const category of categories) {
    await categoryRepository.save(new Category(category));
  }

  for (const author of authors) {
    await authorRepository.save(new Author(author));
  }

  for (const article of articles) {
    const category = await categoryRepository.findOne({
      slug: article.category
    });

    const author = await authorRepository.findOne({
      slug: article.author
    });

    if (!category) {
      throw new Error(`Invalid category for article /${article.slug}`);
    }

    if (!author) {
      throw new Error(`Invalid author for article /${article.slug}`);
    }

    await articleRepository.save(
      new Article({
        ...article,
        category,
        author
      })
    );
  }

  console.log("✨ Ingested data successfully");
});
