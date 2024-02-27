<template>
  <div>
    <div class="tool_box end">
      <el-select v-model="search.status" placeholder="状态" style="width: 100px">
        <el-option label="全部" :value="-1" />
        <el-option label="正常" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <el-input v-model="search.keyword" placeholder="请输入关键字搜索" style="width: 300px" @keyup.enter.native="handleSearch">
        <template #append>
          <el-button @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
    </div>
    <div class="tool_box">
      <el-button-group>
        <el-button @click="handleModify">添加</el-button>
        <el-button @click="handleImport">导入</el-button>
        <el-button @click="handleBatch">批量添加</el-button>
      </el-button-group>
      <el-button-group>
        <el-button @click="batchModify">修改选中</el-button>
        <el-button @click="batchDelete">删除选中</el-button>
      </el-button-group>
    </div>
    <el-table :data="data" style="width: 100%" :border="true" @row-click="rowClick" @row-contextmenu="rowContextmenu" @selection-change="handleSelectionChange">
      <el-table-column prop="id" type="selection" />
      <el-table-column prop="ip" label="IP地址" width="150" center />
      <el-table-column prop="mac" label="MAC地址" width="160" center />
      <el-table-column prop="pxe" label="镜像" width="150" center />
      <el-table-column prop="task" label="方案" center />
      <el-table-column prop="task" label="算法" center />
      <el-table-column prop="task" label="算力" center />
      <el-table-column prop="task" label="功耗" center />
      <el-table-column prop="task" label="超频" center />
      <el-table-column prop="ol" label="状态" width="150" center />
      <el-table-column prop="gpus" label="显卡" />
    </el-table>

    <dlg-modify ref="dlgModify" :callback="getList" />
    <dlg-batch ref="dlgBatch" :callback="getList" />
    <dlg-import ref="dlgImport" :callback="getList" />
    <dlg-detail ref="dlgDetail" :callback="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DlgDetail from "./detail.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import DlgModify from "./modify.vue";
import DlgBatch from "./batch.vue";
import DlgImport from "./import.vue";

const data = ref([]);
const dlgBatch = ref();
const dlgImport = ref();
const dlgDetail = ref();
const dlgModify = ref();
const selected = ref<any[]>([]);
const search = ref({ keyword: "", status: -1 });

const batchDelete = () => {
  if (selected.value.length == 0) {
    ElMessage({ type: "warning", message: "请选择要批量删除的数据!" });
    return;
  }
  ElMessageBox.confirm(`确定要批量删除选中的${selected.value.length}条数据吗?`, "提示", {
    type: "warning",
  }).then(() => {
    const ids = selected.value.map((item: any) => item.id);
    pcApi.batch({ action: "delete", ids: ids }).then(() => {
      ElMessage("操作成功");
      getList();
    });
  });
};
const batchModify = () => {
  if (selected.value.length == 0) {
    ElMessage({ type: "warning", message: "请选择要批量修改的数据!" });
    return;
  }
  const ids = selected.value.map((item: any) => item.id);
  // 根据 idsRef获取数据
  dlgModify.value.showDlg(selected.value[0], ids);
};

const getList = () => {
  const params = Object.assign({}, search.value);
  pcApi.list().then((res) => {
    console.log(res);
    data.value = res.data;
  });
};
const handleSearch = () => {
  console.log(search.value);
  getList();
};
const handleImport = () => {
  dlgImport.value.showDlg();
};
const handleBatch = () => {
  dlgBatch.value.showDlg();
};
const handleModify = () => {
  dlgModify.value.showDlg(null);
};
const rowClick = (row: any) => {
  dlgDetail.value.showDlg(row);
};
const rowContextmenu = (row: any) => {
  ElMessage(`你点击了${row.id}`);
};
const handleSelectionChange = (rows: any) => {
  selected.value = rows;
  console.log(rows);
};
onMounted(() => {
  getList();
});
</script>

<style scoped></style>
