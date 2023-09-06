<script setup>
import { defineProps } from 'vue'

defineProps({
  quiz: Object,
  action: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th>TITLE</th>
        <th>TYPE</th>
        <th>OPTION</th>
        <th v-if="action">ACTION</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in quiz"
        :key="i"
      >
        <td>{{ item.title }}</td>
        <td>{{ item.type }}</td>
        <td>
          <ul v-if="item.option.length > 0">
            <li
              v-for="(opt, j) in item.option"
              :key="j"
            >
              {{ opt.value }}
            </li>
          </ul>
        </td>
        <td v-if="action">
          <VBtn
            color="error"
            @click="$emit('delete', i)"
            >DELETE</VBtn
          >
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
