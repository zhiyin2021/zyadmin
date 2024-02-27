<template>
  <el-dialog :model-value="true" width="560px" :close-on-click-modal="false" title="选择用户" @close="onCancel"
    append-to-body>
    <el-row justify="end" style="margin-bottom: 10px;">
      <el-input v-model:value="keyword" style="width: 260px" placeholder="关键字" @keyup.enter="getList">
        <template #append>
          <el-button :icon="Search" @click="getList()" />
        </template>
      </el-input>
    </el-row>
    <el-table :data="list" :max-height="400" :border="true">
      <el-table-column prop="name" label="名称" width="100px" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="id" label="操作" width="70px">
        <template #default="{ row }">
          <el-link type="primary" @click="handleSelected(row)">选择</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script setup lang="ts"> 
import { Search } from '@element-plus/icons';
import { Props } from './dialog';

const list = ref([]);
const keyword = ref('');
const props = withDefaults(defineProps<Props>(), {

});
const getList = () => {
  userApi.list({ type: 1, size: 999, keyword: keyword.value }).then((res: any) => {
    list.value = res.data.list;
    console.log("user.list", list.value)
  });
};
 
const handleSelected = (row: any) => {
  const { id, name } = row
  props.onSuccess({ id, name })
}
onMounted(() => {
  getList()
})
</script>
<style scoped></style>
