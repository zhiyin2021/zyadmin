<template>
  <el-dialog v-model="isShow" style="width: 300px" :close-oel-click-modal="false" title="编辑终端">
    <el-form ref="formRef" :model="model" label-placement="left" label-width="80px">
      <el-form-item label="分组">
        <el-select v-model="model.group" placeholder="选择分组" />
      </el-form-item>
      <el-form-item v-if="!isBatch" label="IP">
        <el-input v-model="model.ip" placeholder="IP地址" />
      </el-form-item>
      <el-form-item v-if="!isBatch" label="MAC">
        <el-input v-model="model.mac" placeholder="MAC地址" />
      </el-form-item>
      <el-form-item label="子网" path="mask">
        <el-input v-model="model.netmask" placeholder="子网掩码" />
      </el-form-item>
      <el-form-item label="网关">
        <el-input v-model="model.gateway" placeholder="默认网关" />
      </el-form-item>
      <el-form-item label="主DNS" path="dns1">
        <el-input v-model="model.dns1" placeholder="主DNS" />
      </el-form-item>
      <el-form-item label="次DNS">
        <el-input v-model="model.dns2" placeholder="次DNS" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button round type="primary" @click="doSave"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";

interface Props {
  callback?: Function;
}
const prop = withDefaults(defineProps<Props>(), {
  callback: undefined,
  taskInfo: () => {
    return { mine: [], coin: [], pool: [] };
  },
});

interface ModifyParam {
  id: number;
  ip?: string;
  mac?: string;
  group?: string;
  netmask?: string;
  gateway?: string;
  dns1?: string;
  dns2?: string;
  action?: string;
  ids?: any;
  status?: number;
}
const formRef = ref();
const isShow = ref(false);
const model = ref<ModifyParam>({ id: 0 });
const isBatch = ref(false);

const showDlg = (row: any, ids: any) => {
  if (row == null) {
    row = {
      netmask: "255.255.255.0",
      dns1: "114.114.114.114",
      dns2: "8.8.8.8",
    };
  }
  isShow.value = true;
  console.log("showDlg", row, ids);
  model.value = { ...row };
  model.value.ids = ids;
  isBatch.value = ids?.length > 1;
};
const doSave = () => {
  const data = { ...model.value };
  if (isBatch.value) {
    data.action = "modify";
    pcApi.batch(data).then((res) => {
      ElMessage.success("保存完成!");
      isShow.value = false;
      if (prop.callback) {
        prop.callback();
      }
    });
  } else {
    pcApi.modify(data).then((res) => {
      ElMessage.success("保存完成!");
      isShow.value = false;
      if (prop.callback) {
        prop.callback();
      }
    });
  }
};
// const doSelectParent = () => {
//   dparent.value.showDlg();
// };
defineExpose({ showDlg });
</script>
<style scoped></style>
