<template>
  <a-layout>
    <a-card>
      <template #title>
        <h2 style="text-align:center">扫码发送文件</h2>
      </template>
      <div style="text-align:center">
        <a-image :width="220" style="border: 2px solid #eee; border-radius: 2px;" :preview="false" :src="qrcode" />
      </div>

      <a-divider />

      <a-list item-layout="horizontal" :data-source="files">
        <template #header>
          <h2>文件列表</h2>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <a-space style="width:50%">
              <file-two-tone />
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </a-space>
            <span>{{ $util.formatBytes(item.size) }}</span>
            <div>
              <a :href="item.url" target="_blank">下载</a>
              <a-button type="link" @click="onDelete(item)">删除</a-button>
            </div>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </a-layout>
</template>

<script setup>
import { $util } from '@/global'
import { FileTwoTone } from '@ant-design/icons-vue';
import QRCode from 'qrcode'

let qrcode = ref('')
let files = ref([]);

$get('/index.php?action=qrcode').then(res => {
  showQrcode(res.result.url)
  files.value = res.result.files
  setTimeout(query, 5e3);
})
const showQrcode = (url) => {
  const opts = {
    width: 400,
    height: 400,
    color: {
      dark: "#000000",
      light: "#ffffff"
    },
    errorCorrectionLevel: 'M'
  }
  QRCode.toDataURL(url, opts).then((v) => {
    qrcode.value = v
  })
}

const query = () => {
  $get('index.php?action=query').then(res => {
    if (res.result.status) {
      files.value = res.result.files
    }
    setTimeout(query, 5e3);
  }).catch((res) => {
    if (res.code == 401) {
      return setTimeout(() => {
        location.reload()
      }, 3e3);
    }
    setTimeout(query, 30e3);
  })
}

const onDelete = (item) => {
  console.log('onDelete', item);
  files.value = files.value.filter(v => v.uid != item.uid)
  $post('/index.php?action=delete', `uid=${item.uid}`).then(res => {
    $message.success(res.message)
  })
}
</script>
