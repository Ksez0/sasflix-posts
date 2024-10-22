import { defineStore } from 'pinia'
import { Post } from '~/types/Post'

const POSTS_PER_PAGE = 5

export const usePostStore = defineStore('posts', {
	state: () => ({
		posts: [] as Post[],
		displayedPosts: [] as Post[],
		loading: false,
		error: null as string | null,
		currentPage: 1,
	}),

	getters: {
		hasMorePosts: state => state.displayedPosts.length < state.posts.length,
	},

	actions: {
		async fetchPosts() {
			this.loading = true
			try {
				const response = await fetch('https://dummyjson.com/posts')
				const data = await response.json()
				this.posts = data.posts
				this.loadMorePosts()
			} catch (error) {
				this.error = 'Failed to fetch posts'
			} finally {
				this.loading = false
			}
		},

		loadMorePosts() {
			const start = (this.currentPage - 1) * POSTS_PER_PAGE
			const end = start + POSTS_PER_PAGE
			const newPosts = this.posts.slice(start, end)
			this.displayedPosts = [...this.displayedPosts, ...newPosts]
			this.currentPage++
		},

		toggleReaction(postId: number, type: 'like' | 'dislike') {
			const post = this.displayedPosts.find(p => p.id === postId)
			if (post) {
				if (type === 'like') {
					post.reactions.likes = post.liked
						? post.reactions.likes - 1
						: post.reactions.likes + 1
					post.liked = !post.liked
					if (post.liked && post.disliked) {
						post.disliked = false
						post.reactions.dislikes--
					}
				} else {
					post.reactions.dislikes = post.disliked
						? post.reactions.dislikes - 1
						: post.reactions.dislikes + 1
					post.disliked = !post.disliked
					if (post.disliked && post.liked) {
						post.liked = false
						post.reactions.likes--
					}
				}
			}
		},
	},
})
