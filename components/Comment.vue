<template>
	<div class="comment">
		<div class="comment__avatar"></div>
		<div class="comment__content">
			<div class="comment__header">
				<span class="comment__username">{{ comment.user.fullName }}</span>
			</div>
			<p class="comment__text">{{ comment.body }}</p>
			<div class="comment__footer">
				<span class="comment__date">Today</span>
				<span
					class="comment__delete"
					@click="handleDelete"
					@mouseenter="isHovered = true"
					@mouseleave="isHovered = false"
				>
					Удалить
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '~/types/Comment'

const props = defineProps<{
	comment: Comment
}>()

const emit = defineEmits<{
	(e: 'delete', id: number): void
}>()

const isHovered = ref(false)

const handleDelete = () => {
	emit('delete', props.comment.id)
}
</script>
