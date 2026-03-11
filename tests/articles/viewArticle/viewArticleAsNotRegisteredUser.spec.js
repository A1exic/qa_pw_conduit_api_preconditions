import { test } from '../../_fixtures/fixtures';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/view/ExternalViewArticlePage';

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(
  async ({ registeredUsers, articlesApi, articleWithoutTags }) => {
    const response = await articlesApi.createArticle(
      articleWithoutTags,
      registeredUsers[0].token,
    );
    const slug = await articlesApi.parseSlugFromResponse(response);
    articleWithoutTags.url = slug;
  },
);

test('View an article as not registered user', async ({
  articleWithoutTags,
  pages,
  registeredUsers,
}) => {
  const page = new ExternalViewArticlePage(pages[1], 2);

  await page.open(articleWithoutTags.url);
  await page.articleHeader.assertTitleIsVisible(articleWithoutTags.title);
  await page.articleContent.assertArticleTextIsVisible(articleWithoutTags.text);
  await page.articleHeader.assertAuthorNameIsVisible(
    registeredUsers[0].username,
  );
});
