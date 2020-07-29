import { createConnection, getRepository } from "typeorm";
import { TYPEORM_CONFIG } from "../typeorm.config";
import { getArticles } from "./services/fs/article.service";
import { Article } from "../entities/article.entity";
import { Category } from "../entities/category.entity";
import { Author } from "../entities/author.entity";
import { getCategories } from "./services/fs/category.service";
import { getAuthors } from "./services/fs/author.service";

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

    if (!category || !author) throw new Error("Missing category");

    await articleRepository.save(
      new Article({
        ...article,
        category,
        author
      })
    );
  }

  console.log("DONE");
});
