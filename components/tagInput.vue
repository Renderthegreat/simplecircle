<template>
<form @submit.prevent="handleSubmit">
 <TagsInputRoot v-model="tags" class="tags-input-root">
      <TagsInputItem v-for="item in tags" :key="item" :value="item" class="tags-input-item">
        <TagsInputItemText class="tags-input-item-text" />
        <TagsInputItemDelete class="tags-input-item-delete">
          <Icon icon="lucide:x" />
        </TagsInputItemDelete>
      </TagsInputItem>
      <TagsInputInput placeholder="Tags..." class="tags-input-input" />
    </TagsInputRoot>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { defineProps, defineEmits, defineModel } from 'vue'
const model = defineModel()
const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const tags = ref([...props.modelValue])

watch(tags, (newTags) => {
  emit('update:modelValue', newTags)
})

const handleSubmit = () => {
	model.value = tags.value
}
</script>

<style>
.tags-input-root {
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 10px;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 480px;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 63px;
  background-color: var(--bg-color-low);
}

.tags-input-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #22c55e;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  color: white;
  margin-right: 0.5rem;
}

.tags-input-item[aria-current='true'] {
  background-color: #15803d;
}

.tags-input-item-text {
  font-size: 0.875rem;
}

.tags-input-item-delete {
  padding: 0.125rem;
  border-radius: 0.25rem;
  background-color: transparent;
  cursor: pointer;
}

.tags-input-item-delete:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.tags-input-input {
  font-size: 0.875rem;
  flex: 1;
  border-radius: 0.25rem;
  color: #15803d;
  background-color: transparent;
  padding-left: 0.1rem;
  outline: none;
  min-width: 100px;
}

.tags-input-input::placeholder {
  color: var(--text-color);
}

.submit-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #15803d;
}
</style>
