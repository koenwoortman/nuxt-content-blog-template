<template>
  <posts-page
    :posts="posts"
    :currentPage="currentPage"
    :firstPage="firstPage"
    :lastPage="lastPage"
  />
</template>

<script>
import fetchPostsMixin from '@/utils/fetchPostsMixin'
import PostsPage from '@/components/PostsPage.vue'

export default {
  components: { PostsPage },
  mixins: [fetchPostsMixin]
}
</script>
