<template>
  <a-layout>
    <a-card>
      <template #title>
        <h2 style="text-align:center">文件上传</h2>
      </template>

      <a-alert
        v-if="errorMessage"
        message="发生错误"
        :description="errorMessage"
        type="error"
        show-icon
      />
      <a-upload-dragger v-else name="file" :multiple="true" :showUploadList="false" :action="uploadUrl" @change="onChange">
        <p class="ant-upload-drag-icon">
          <cloud-upload-outlined />
        </p>
        <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p class="ant-upload-hint">文件大小不能超过10MB，支持文件类型：doc、docx、pdf、ppt、pptx、jpg、jpeg、png</p>
      </a-upload-dragger>
    </a-card>
  </a-layout>
</template>

<script setup>
import { CloudUploadOutlined } from '@ant-design/icons-vue';

let errorMessage = ref('')
const route = useRoute()
const taskid = route.query.taskid
if (!taskid) {
  errorMessage = '二维码已失效'
}

const uploadUrl = `/index.php?action=upload&taskid=${taskid}`
const key = 'updatable';
const onChange = (info) => {
  const status = info.file.status;
  const res = info.file.response
  if (status === 'uploading') {
    $message.loading({
      content: `上传中 ${parseInt(info.file.percent)}%`,
      key
    })
  } else if (status === 'done') {
    if (res.code === 200) {
      $message.success({
        content: res.message,
        key
      })
    } else {
      $message.error({
        content: res.message,
        key
      })
    }
  } else if (status === 'error') {
    $message.error({
      content: res.message,
      key
    })
  }
};
</script>
