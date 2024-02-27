<template>
  <el-dialog :model-value="true" width="780px" :close-on-click-modal="false" title="选择客户" @close="onCancel"
    append-to-body>
    <el-row justify="end" style="margin-bottom: 10px;">
      <el-input v-model:value="query.keyword" style="width: 260px" placeholder="关键字" @keyup.enter="getData">
        <template #append>
          <el-button :icon="Search" @click="getData()" />
        </template>
      </el-input>
    </el-row>
    <el-table :data="data.list" :max-height="400">
      <el-table-column prop="id" label=" 编号" width="70px" />
      <el-table-column prop="name" label="名称" width="220px" />
      <el-table-column prop="areaName" label="分组" width="220px" />
      <el-table-column prop="salesName" label="业务员" />
      <el-table-column prop="techName" label="技术员" />
      <el-table-column prop="id" label="操作" width="60px">
        <template #default="{ row }">
          <el-link type="primary" size="mini" @click="handleSelected(row)">选择</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-pagination background layout="prev, pager, next ,sizes,->" v-model:current-page="query.page"
        v-model:page-size="query.size" :total="data.total" :page-sizes="[20, 50, 100, 200]" @update:current-page="getData"
        @update:page-size="getData" />
    </el-row>
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'; 
import { Search } from '@element-plus/icons';
import { Props } from './dialog';

// interface Emits {
//   (e: 'update:cid', val: number): void;
//   (e: 'update:cname', val: string): void;
// }
// const emit = defineEmits<Emits>();
// let callback: Function;
const props = withDefaults(defineProps<Props>(), {

});

const data = ref({ list: [], total: 0 });
const getData = () => {
  const p = Object.assign({}, query.value);
  customerApi.list(p).then((res: any) => {
    data.value = res.data;
  });
};
const query = ref({ page: 1, size: 50, keyword: "" });

// const showDlg = (_callback: Function) => {
//   callback = _callback;
//   getData();
//   isShow.value = true;
// };
// defineExpose({ showDlg });

const handleSelected = (row: any) => {
  const { id, name } = row
  props.onSuccess({ id, name });
}
onMounted(() => {
  getData();
})
</script>
<style scoped></style>
