<script setup>
import { reactive, watch } from 'vue'
import { useFormStore } from '@/store/useFormStore'
import QuizTable from '@/components/QuizTable.vue'
import { useRoute } from 'vue-router'

const store = useFormStore()
const route = useRoute()

store.getDetailForm(route.params.id)

const form = reactive({
  name: '',
  quiz: '',
})

watch(
  () => store.detail,
  val => {
    form.name = store.detail.name
    form.quiz = store.detail.quiz
  },
)

let quiz = reactive({
  title: '',
  type: 'field',
  option: [],
  many: false,
})

function addOption() {
  quiz.option.push({
    value: '',
  })
}

function deleteOpt(i) {
  quiz.option.splice(i, 1)
}

function submitQuiz() {
  form.quiz.push({
    title: quiz.title,
    type: quiz.type,
    option: quiz.option,
  })

  clearForm()
}

function clearForm() {
  quiz.title = ''
  quiz.type = ''
  quiz.option = []
  quiz.many = false
}

watch(
  () => quiz.type,
  val => {
    if (val != 'field') {
      quiz.many = true
    } else {
      quiz.many = false
    }
  },
)

function deleteItem(i) {
  form.quiz.splice(i, 1)
}
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>
        <VRow justify="space-between">
          <VCol md="6">
            <p>Create Form</p>
          </VCol>
          <VCol
            md="6"
            class="text-right"
          >
            <VBtn
              @click="store.updateFrom($route.params.id, form)"
              size="small"
              >Save</VBtn
            >
          </VCol>
        </VRow>
      </VCardTitle>

      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              label="Name"
              density="compact"
              v-model="form.name"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            md="8"
          >
            <VTextField
              label="Question"
              density="compact"
              v-model="quiz.title"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VSelect
              label="Type"
              density="compact"
              :items="['field', 'radio-botton', 'check-box', 'select']"
              v-model="quiz.type"
            ></VSelect>
          </VCol>
        </VRow>
        <VRow v-if="quiz.many">
          <VCol
            cols="12"
            class="d-flex justify-space-between"
          >
            <h3>OPTION</h3>
            <VBtn
              @click="addOption"
              color="primary"
              rounded
            >
              ADD OPTIONS
            </VBtn>
          </VCol>
          <VCol
            cols="12"
            v-for="(item, i) in quiz.option"
            :key="i"
          >
            <VRow>
              <VCol cols="10">
                <VTextField
                  label="Question"
                  density="compact"
                  v-model="item.value"
                />
              </VCol>
              <VCol cols="2">
                <VBtn
                  @click="deleteOpt(i)"
                  color="error"
                  rounded
                >
                  <VIcon icon="mdi-trash"
                /></VBtn>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VBtn
              @click="submitQuiz"
              color="success"
              rounded
            >
              SUBMIT
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard class="mt-5">
      <VCardTitle> List Quiz </VCardTitle>
      <VCardText>
        <QuizTable
          :quiz="form.quiz"
          @delete="deleteItem"
        />
      </VCardText>
    </VCard>
  </div>
</template>
