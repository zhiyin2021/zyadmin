<template>
  <div>
    <el-dialog v-model="isShow" style="width: 300px" :close-oel-click-modal="false" title="查看终端">
      <template #header>
        <el-row>
          <el-button size="small" type="warning" @click="handleModify">修改</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </el-row>
      </template>
   
          <label-value label="IP" :value="model.ip" />
 
          <label-value label="MAC" :value="model.mac" />
       
      
          <label-value label="子网" :value="model.netmask" />
    
          <label-value label="网关" :value="model.gateway" />
     
          <label-value label="主DNS" :value="model.dns1" />
        
          <label-value label="次DNS" :value="model.dns2" />
   
    </el-dialog>
    <dlg-modify ref="dlgModify" :callback="prop.callback" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import DlgModify from "./modify.vue";
import { CallbackProp } from "../../config";

import { ElMessage, ElMessageBox } from "element-plus";

const prop = withDefaults(defineProps<CallbackProp>(), {});
const isShow = ref(false);
const dlgModify = ref();
const model = ref<any>({});
const showDlg = (row: any) => {
  model.value = row;
  // pcApi.detail({ id }).then(res => {
  //     console.log('res.data', res.data);

  isShow.value = true;
  // });
};
const handleModify = () => {
  dlgModify.value.showDlg(model.value);
};
defineExpose({ showDlg });
</script>
