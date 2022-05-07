// utils/fetchPostsMixin.js

export default {
  async asyncData({ $content, params, error }) {
    // We will only show 3 posts per page
    const POSTS_PER_PAGE = 3;

    // Get the page number from the URL, fallback on 1 otherwise.
    const currentPage = parseInt(params.page) || 1

    // We need the total for pagination.
    const totalAmountOfPosts = (await $content()
      .only([])
      .fetch()).length

    // Calculate the last page number.
    const lastPage = Math.ceil(totalAmountOfPosts / POSTS_PER_PAGE);

    // If we try to access a page without posts throw a 404.
    if (currentPage > lastPage) {
      return error({ statusCode: 404, message: 'No articles for this page.' })
    }

    // We want to skip the right amount of posts
    // so we only grab the posts for the current page.
    const offset = POSTS_PER_PAGE * (currentPage - 1)

    // Fetch the posts for the current page
    const today = new Date().valueOf()
    const posts = await $content()
      .only(['slug', 'title', 'date'])
      .where({ date: { $lte: today } })
      .sortBy('date', 'desc')
      .limit(POSTS_PER_PAGE)
      .skip(offset)
      .fetch()

    // Return the posts of the current page with
    // some other convenient properties
    return {
      posts,
      totalAmountOfPosts,
      currentPage,
      firstPage: currentPage === 1,
      lastPage: currentPage === lastPage
    }
  }
}
