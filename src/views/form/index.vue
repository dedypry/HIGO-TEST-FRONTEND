<script setup>
import { useFormStore } from '@/store/useFormStore'
import Actions from '@/components/button/Actions.vue'

const store = useFormStore()

store.getForm()
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>
        <VRow justify="space-between">
          <VCol md="6">
            <p>List Form</p>
          </VCol>
          <VCol
            md="6"
            class="text-right"
          >
            <VBtn
              to="/form/create"
              size="small"
              >Create Form</VBtn
            >
          </VCol>
        </VRow>
      </VCardTitle>

      <VCardSubtitle>
        <SearchBar />
      </VCardSubtitle>

      <VCardText>
        <VTable>
          <thead>
            <tr>
              <th>NAME</th>
              <th>STATUS</th>
              <th>SURVEYOR</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in store.form"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.surveyor.length }}</td>
              <td>
                <Actions
                  :edit="`/form/edit/${item._id}`"
                  :detail="`/form/detail/${item._id}`"
                  @delete="store.deleteForm(item._id)"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
        <!-- <Pagination :length="pageNumber(data)" /> -->
      </VCardText>
    </VCard>
  </div>
</template>
