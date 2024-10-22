<template>
	<div class="comments">
		<h1 class="comments__title">
			{{ allComments.length }} {{ commentCountText }}
		</h1>
		<div v-if="loadingComments" class="comments__loading">
			Загрузка комментариев...
		</div>
		<div v-else-if="commentsError" class="comments__error">
			{{ commentsError }}
		</div>
		<template v-else>
			<Comment
				v-for="comment in comments"
				:key="comment.id"
				:comment="comment"
				@delete="handleDeleteComment"
			/>
			<div
				v-if="!showAllComments && allComments.length > 3"
				class="comments__load-more"
			>
				<button @click="loadAllComments" class="load-more-button">
					Показать все
				</button>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePosts } from '~/composables/usePosts'

const props = defineProps<{
	postId: number
}>()

const {
	comments,
	allComments,
	loadingComments,
	commentsError,
	showAllComments,
	fetchComments,
	loadAllComments,
	deleteComment,
} = usePosts()

const commentCountText = computed(() => {
	const count = allComments.value.length
	if (count === 1) return 'комментарий'
	if (count >= 2 && count <= 4) return 'комментария'
	return 'комментариев'
})

const handleDeleteComment = (commentId: number) => {
	deleteComment(commentId)
}

onMounted(async () => {
	await fetchComments(props.postId)
})
</script>
