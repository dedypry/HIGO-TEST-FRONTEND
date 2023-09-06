<script setup>
import { useFormStore } from '@/store/useFormStore'
import { useRoute } from 'vue-router'
import QuizTable from '@/components/QuizTable.vue'
import route from '@/router/index'
// eslint-disable-next-line import/namespace
import { formatDate } from '@/mixins/string'

const store = useFormStore()
const router = useRoute()

store.getDetailForm(router.params.id)

async function deleteForm() {
  await store.deleteForm(router.params.id)
}
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="d-flex justify-space-between">
        <div>Form Detail</div>
        <div>
          <VBtn
            color="error"
            class="mx-1"
            @click="deleteForm"
            >Delete</VBtn
          >
          <VBtn
            color="warning"
            class="mx-1"
            :to="`/form/edit/${$route.params.id}`"
            >Edit</VBtn
          >
          <VBtn
            class="mx-1"
            :to="{ name: 'survey', params: { id: $route.params.id } }"
            >Link Survey</VBtn
          >
        </div>
      </VCardTitle>
      <VCardText>
        <h4>{{ store.detail.name }}</h4>
        <QuizTable
          :quiz="store.detail.quiz"
          :action="false"
        />
      </VCardText>
    </VCard>
    <VCard class="my-5">
      <VCardTitle class="d-flex justify-space-between">
        <div>List Surveyor</div>
      </VCardTitle>
      <VCardText>
        <h4>{{ store.detail.name }}</h4>
        <VTable>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(item, i) in store.detail.surveyor"
              :key="i"
            >
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ formatDate(item.date) }}</td>
                <td>
                  <VBtn @click="store.setShow(i, !item.detail)">DETAIL</VBtn>
                </td>
              </tr>
              <VTable v-if="item.detail">
                <thead>
                  <tr>
                    <th colspan="2">Quiz</th>
                    <th colspan="2">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(qu, j) in item.quiz"
                    :key="j"
                  >
                    <td colspan="2">{{ qu.title }}</td>
                    <td colspan="2">{{ qu.value }}</td>
                  </tr>
                </tbody>
              </VTable>
            </template>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>
  </div>
</template>
