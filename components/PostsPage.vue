<template>
  <main>
    <h1>Page {{ currentPage }}</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <nuxt-link :to="`/${post.slug}`">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
    <nav>
      <nuxt-link v-if="!firstPage" :to="`/page/${currentPage - 1}`">← Previous</nuxt-link>
      <nuxt-link v-if="!lastPage" :to="`/page/${currentPage + 1}`">Next →</nuxt-link>
    </nav>
  </main>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    firstPage: {
      type: Boolean,
      required: true
    },
    lastPage: {
      type: Boolean,
      required: true
    }
  }
}
</script>
