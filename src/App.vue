<template>
  <el-config-provider size="default" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

</script>

<style lang="scss">
#app,
body {
  height: 100vh;
  width: 100%;
}

.flex-box {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;

  &>* {
    width: 1200px;
    padding: 5px;
  }
}


.works {
  width: 1200px;
  padding: 15px;
  position: relative;
}

.work-item {
  position: relative;
  width: 150px;
  height: 65px;
  background: #262b31;
  border-radius: 3px;
  margin-right: 12px;
}


.el-tag {
  cursor: pointer;
}

.tool_box {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  margin-top: 0em;

  &>.el-input {
    width: 180px;
  }

  &>* {
    flex-grow: inherit !important;
    margin-right: 5px;
    margin-bottom: 8px;
    display: inline-flex;
    vertical-align: middle;
  }

  &.end {
    justify-content: flex-end;
  }
}



.el-pagination {
  margin-top: 20px;
}
</style>