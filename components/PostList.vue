<template>
	<div class="post-list">
		<div v-if="loading">Загрузка постов...</div>
		<div v-else-if="error">{{ error }}</div>
		<template v-else>
			<Post v-for="post in displayedPosts" :key="post.id" :post="post" />
			<div v-if="hasMorePosts" class="post-list__load-more">
				<button @click="loadMore" class="load-more-button">
					Загрузить ещё
				</button>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { usePostStore } from '~/store/posts'

const postStore = usePostStore()
const { displayedPosts, loading, error, hasMorePosts } = storeToRefs(postStore)

onMounted(() => {
	postStore.fetchPosts()
})

const loadMore = () => {
	postStore.loadMorePosts()
}
</script>
