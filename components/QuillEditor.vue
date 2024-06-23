<template>
	<div>
		<div ref="quillEditor" class="quill-editor"></div>
	</div>
</template>

<script>
import Quill from 'quill';
import { ref, watch } from 'vue'
import { defineProps, defineEmits, defineModel } from 'vue'


export default {
	mounted() {
		this.initializeQuill();
		this.$emit('update:modelValue', {
			update: this.update,
			html: ""
		});
	},
	methods: {
		update(string) {
			this.quill.clipboard.dangerouslyPasteHTML(0, string); // Maybe update to be safe if needed.
		},
		initializeQuill() {
			this.quill = new Quill(this.$refs.quillEditor, {
				theme: 'snow',
				modules: {
					toolbar: [
						['bold', 'italic', 'underline'],
						['blockquote', 'code-block'],
						[{ 'header': 1 }, { 'header': 2 }],
						[{ 'list': 'ordered' }, { 'list': 'bullet' }],
						[{ 'script': 'sub' }, { 'script': 'super' }],
						[{ 'indent': '-1' }, { 'indent': '+1' }],
						[{ 'direction': 'rtl' }],
						[{ 'size': ['small', false, 'large', 'huge'] }],
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
						[{ 'color': [] }, { 'background': [] }],
						[{ 'font': [] }],
						[{ 'align': [] }],
						['clean']
					]
				}
			});

			this.quill.on('text-change', () => {
				const html = this.quill.getSemanticHTML();
				this.$emit('update:modelValue', {
					update: this.update,
					html
				});
			});

			if (this.value) {
				this.quill.root.innerHTML = this.value;
			}
		},
	},
}
</script>

<style scoped>
.quill-editor {
	background-color: var(--bg-color);
	color: var(--text-color);
	border: 1px solid var(--rlc-color);
}

.ql-toolbar .ql-button {
	color: var(--accent-color);
}

.ql-toolbar .ql-button:hover {
	color: var(--accent-color-hover);
}
</style>

<style>
.ql-picker-options span {
	background-color: var(--bg-color);
	color: var(--text-color);
	padding: 0px;
}
</style>