<template>
  <el-dialog v-model="isShow" style="width: 620px" :close-oel-click-modal="false" title="批量添加">
    <el-form ref="formRef" :inline="true" :model="model" label-placement="left" label-width="80px">
      <el-form-item label="分组">
        <el-select v-model="model.group_id" placeholder="分组" @change="changeGroup" style="width: 177px">
          <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="model.count" controls-position="right" placeholder="数量" @input="calcIP" />
      </el-form-item>
      <el-form-item label="起始IP">
        <el-input v-model="model.start" placeholder="起始IP" @input="calcIP" />
      </el-form-item>
      <el-form-item label="结束IP">
        <el-input v-model="model.end" placeholder="结束IP" :disabled="true" />
      </el-form-item>
      <el-form-item label="子网" path="netmask">
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
import { ref } from "vue";
import { pcApi } from "@/api/";
import { ElMessage } from "element-plus";
interface Props {
  callback?: Function;
}
const prop = withDefaults(defineProps<Props>(), {
  callback: undefined,
  taskInfo: () => {
    return { mine: [], coin: [], pool: [] };
  },
});

interface BatchParam {
  count?: number;
  start?: string;
  end?: string;
  group?: string;
  netmask?: string;
  gateway?: string;
  dns1?: string;
  dns2?: string;
}
const formRef = ref();
const isShow = ref(false);
const model = ref<BatchParam>({});

const rules: FormRules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "必填字段",
  },
  wallet: {
    required: true,
    trigger: ["blur", "input"],
    message: "必填字段",
  },
};
const showDlg = () => {
  isShow.value = true;
  model.value = { netmask: "255.255.255.0", dns1: "114.114.114.114", dns2: "8.8.8.8" };
};
const doSave = () => {
  const data = { ...model.value };
  pcApi.batch(data).then((res) => {
    if (!res.error) {
      ElMessage.success("保存完成!");
      isShow.value = false;
      if (prop.callback) {
        prop.callback();
      }
    }
  });
};
const calcIP = () => {
  const start = model.value.start;
  const count = model.value.count;
  if (start && count) {
    const arr = start.split(".");
    let last = parseInt(arr[3]);
    let end = "";
    for (let i = 0; i < 3; i++) {
      if (arr[i]) {
        end += arr[i] + ".";
      }
    }
    if (last) {
      if (last > 254) {
        ElMessage.warning("起始IP地址超出范围!");
        return;
      }
      console.log("last=>count", last, count);
      last = last + count - 1;
      if (last > 254) {
        ElMessage.warning("结束IP地址超出范围!");
        return;
      }
      end += last + "";
    }

    //const end = `${arr[0]}.${arr[1]}.${arr[2]}.${last + count - 1}`;
    model.value.end = end;
  }
};
// const doSelectParent = () => {
//   dparent.value.showDlg();
// };
defineExpose({ showDlg });
</script>
<style scoped></style>
