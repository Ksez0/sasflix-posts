import { ref } from 'vue'
import type { Comment } from '~/types/Comment'

export function usePosts() {
	const comments = ref<Comment[]>([])
	const allComments = ref<Comment[]>([])
	const loadingComments = ref(false)
	const commentsError = ref<string | null>(null)
	const showAllComments = ref(false)

	const fetchComments = async (postId: number) => {
		loadingComments.value = true
		try {
			const response = await fetch(
				`https://dummyjson.com/posts/${postId}/comments`
			)
			const data = await response.json()
			allComments.value = data.comments
			comments.value = data.comments.slice(0, 3)
		} catch (error) {
			commentsError.value = 'Failed to fetch comments'
		} finally {
			loadingComments.value = false
		}
	}

	const loadAllComments = () => {
		comments.value = [...allComments.value]
		showAllComments.value = true
	}

	const deleteComment = (commentId: number) => {
		comments.value = comments.value.filter(comment => comment.id !== commentId)
		allComments.value = allComments.value.filter(
			comment => comment.id !== commentId
		)
	}

	return {
		comments,
		allComments,
		loadingComments,
		commentsError,
		showAllComments,
		fetchComments,
		loadAllComments,
		deleteComment,
	}
}
