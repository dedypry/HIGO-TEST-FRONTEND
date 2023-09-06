<script setup>
import { useFormStore } from '@/store/useFormStore'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const store = useFormStore()
const route = useRoute()

const form = reactive({
  name: '',
  email: '',
})

function submit(data) {
  form.quiz = data.quiz
  store.storeSurveyor(route.params.id, form)
}

store.getDetailForm(route.params.id)
</script>

<template>
  <div>
    <VRow>
      <VCol cols="2" />
      <VCol cols="8">
        <VCard
          title="Survey"
          class="my-5"
        >
          <VCardText>
            <VRow>
              <VCol cols="6">
                <VTextField
                  v-model="form.name"
                  label="Name"
                  density="compact"
                  variant="underlined"
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-model="form.email"
                  label="Email"
                  density="compact"
                  variant="underlined"
                />
              </VCol>
              <VCol
                v-for="(item, i) in store.detail.quiz"
                :key="i"
                cols="12"
              >
                <h3 class="my-2">{{ item.title }}</h3>

                <VTextField
                  v-if="item.type == 'field'"
                  v-model="item.value"
                  density="compact"
                  variant="underlined"
                />

                <VCombobox
                  v-if="item.type == 'select'"
                  v-model="item.value"
                  :items="item.option.map(e => e.value)"
                  density="compact"
                  variant="underlined"
                />

                <VRadioGroup v-if="item.type == 'radio-botton'">
                  <VRadio
                    v-for="(vl, i) in item.option"
                    :key="i"
                    v-model="item.value"
                    :label="vl.value"
                    :value="vl.value"
                  />
                </VRadioGroup>

                <div v-if="item.type == 'check-box'">
                  <VCheckbox
                    v-for="(vl, i) in item.option"
                    :key="i"
                    v-model="item.value"
                    :value="vl.value"
                    :label="vl.value"
                  />
                </div>
              </VCol>
              <VCol
                cols="12"
                class="my-5"
              >
                <VBtn
                  color="primary"
                  @click="submit(store.detail)"
                >
                  SUBMIT
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="2" />
    </VRow>
  </div>
</template>
