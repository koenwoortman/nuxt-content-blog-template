<template>
  <article>
    <h1>{{ post.title }}</h1>

    <nav>
      <ul>
        <li v-for="link of post.toc" :key="link.id">
          <nuxt-link :to="`#${link.id}`">{{ link.text }}</nuxt-link>
        </li>
      </ul>
    </nav>

    <nuxt-content :document="post" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const slug = params.slug
    const post = await $content(slug).fetch()

    return { post }
  },
  head() {
    return {
      title: `${this.post.title} | My Blog`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        }
      ]
    }
  },
}
</script>
