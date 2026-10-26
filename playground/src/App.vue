<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  DanButton,
  DanChat,
  DanChatInput,
  DanConfigProvider,
  DanForm,
  DanFormItem,
  DanGenerationControl,
  DanInput,
  DanModelSelect,
  DanRichText,
  DanSuggestion,
  DanTokenUsage,
  useNamespace,
  type ChatMessageModel,
  type DanFormInstance,
} from '@dan-ui/ui'

const ns = useNamespace('playground')
const tab = ref<'form' | 'chat' | 'editor'>('chat')

const formRef = ref<DanFormInstance>()
const formModel = reactive({
  name: '',
  profile: { email: '' },
})
const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  'profile.email': [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
}

const editorRef = ref<DanFormInstance>()
const editorModel = reactive({
  content: '<p>在 playground 里试试富文本。</p>',
})
const editorRules = {
  content: [{ required: true, message: '请输入正文', trigger: 'blur' }],
}

const messages = ref<ChatMessageModel[]>([
  {
    id: 'welcome',
    role: 'assistant',
    content: '这是 playground 里的假流式对话。',
    status: 'done',
  },
])
const generating = ref(false)
const model = ref('demo-mini')
const timer = ref<number | null>(null)
const tokens = ref({ prompt: 0, completion: 0 })
const modelOptions = [
  { label: 'demo-mini', value: 'demo-mini' },
  { label: 'demo-pro', value: 'demo-pro' },
]

function clearTimer() {
  if (timer.value != null) {
    window.clearInterval(timer.value)
    timer.value = null
  }
}

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function fakeStream(prompt: string) {
  clearTimer()
  generating.value = true
  tokens.value.prompt += prompt.length
  messages.value.push({
    id: uid(),
    role: 'user',
    content: prompt,
    status: 'done',
  })
  const assistantId = uid()
  messages.value.push({
    id: assistantId,
    role: 'assistant',
    content: '',
    status: 'streaming',
    reasoning: '组织回答中',
  })
  const full = `收到「${prompt}」。\n\n这是 **playground** 假流式输出示例。`
  let index = 0
  timer.value = window.setInterval(() => {
    const target = messages.value.find((item) => item.id === assistantId)
    if (!target) return
    if (index >= full.length) {
      target.status = 'done'
      generating.value = false
      clearTimer()
      return
    }
    const chunk = full.slice(index, index + 2)
    target.content += chunk
    tokens.value.completion += chunk.length
    index += 2
  }, 35)
}

function onStop() {
  clearTimer()
  generating.value = false
  const last = [...messages.value]
    .reverse()
    .find((item) => item.role === 'assistant')
  if (last && last.status === 'streaming') last.status = 'stopped'
}

async function onSubmit() {
  const ok = await formRef.value?.validate()
  window.alert(ok ? '校验通过' : '校验失败')
}

async function onEditorSubmit() {
  const ok = await editorRef.value?.validate()
  window.alert(ok ? '校验通过' : '校验失败')
}

async function onImageUpload(file: File) {
  return URL.createObjectURL(file)
}
</script>

<template>
  <DanConfigProvider>
    <main :class="ns.b()">
      <h1>dan-ui playground</h1>
      <div :class="ns.e('tabs')">
        <DanButton
          :type="tab === 'chat' ? 'primary' : 'default'"
          @click="tab = 'chat'"
        >
          AI Chat
        </DanButton>
        <DanButton
          :type="tab === 'form' ? 'primary' : 'default'"
          @click="tab = 'form'"
        >
          Form
        </DanButton>
        <DanButton
          :type="tab === 'editor' ? 'primary' : 'default'"
          @click="tab = 'editor'"
        >
          RichText
        </DanButton>
      </div>

      <section v-if="tab === 'chat'" :class="ns.e('section')">
        <div :class="ns.e('row')">
          <DanModelSelect v-model="model" :options="modelOptions" />
          <DanTokenUsage
            :prompt-tokens="tokens.prompt"
            :completion-tokens="tokens.completion"
          />
          <DanGenerationControl
            :generating="generating"
            @stop="onStop"
            @regenerate="fakeStream('请再回答一次')"
          />
        </div>
        <DanSuggestion
          :items="['介绍 dan-ui', '写一个表单示例']"
          @select="fakeStream"
        />
        <DanChat
          :messages="messages"
          :generating="generating"
          @send="fakeStream"
          @stop="onStop"
        >
          <template #footer>
            <DanChatInput />
          </template>
        </DanChat>
      </section>

      <section v-else-if="tab === 'form'" :class="ns.e('section')">
        <DanForm
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          label-width="72px"
        >
          <DanFormItem label="姓名" prop="name">
            <DanInput v-model="formModel.name" clearable />
          </DanFormItem>
          <DanFormItem label="邮箱" prop="profile.email">
            <DanInput v-model="formModel.profile.email" />
          </DanFormItem>
          <DanFormItem>
            <DanButton type="primary" @click="onSubmit">提交</DanButton>
          </DanFormItem>
        </DanForm>
      </section>

      <section v-else :class="ns.e('section')">
        <DanForm
          ref="editorRef"
          :model="editorModel"
          :rules="editorRules"
          label-width="72px"
        >
          <DanFormItem label="正文" prop="content">
            <DanRichText
              v-model="editorModel.content"
              :on-image-upload="onImageUpload"
            />
          </DanFormItem>
          <DanFormItem>
            <DanButton type="primary" @click="onEditorSubmit">提交</DanButton>
          </DanFormItem>
        </DanForm>
      </section>
    </main>
  </DanConfigProvider>
</template>

<style scoped>
.dan-playground {
  min-height: 100vh;
  margin: 0;
  padding: var(--dan-spacing-xl);
  font-family: var(--dan-font-family);
  color: var(--dan-color-text);
  background:
    radial-gradient(circle at top left, rgb(37 99 235 / 12%), transparent 40%),
    var(--dan-color-bg-muted);
}

h1 {
  margin: 0 0 var(--dan-spacing-md);
  font-size: 28px;
}

.dan-playground__tabs,
.dan-playground__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dan-spacing-sm);
  align-items: center;
  margin-bottom: var(--dan-spacing-md);
}

.dan-playground__section {
  display: grid;
  gap: var(--dan-spacing-md);
  max-width: 920px;
}
</style>
