<template>
  <div class="container flex">
    <div class="header flex-box">
      <div class="header-container">
        <el-menu :default-active="activePath" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
          <template v-for="(item, i) in routes" :key="i">
            <el-menu-item v-if="!item.meta?.hide" :index="item.path" style="margin-left: 10px">
              {{ item.meta?.title }}
            </el-menu-item>
          </template>
          <div class="flex-grow"></div>
          <el-sub-menu index="2">
            <template #title>Admin</template>
            <el-menu-item @click="changePwd">修改密码</el-menu-item>
            <el-menu-item @click="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <div class="content flex-box">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
const routes = useRouter().options.routes;
const activePath = computed(() => useRoute().path);
const logout = () => {

}
const changePwd = () => {

}
</script>
 
<style lang="scss" scoped> .container {
   height: 100vh;
   min-width: 1200px;
   margin: 0px auto;
   flex-direction: column;

   &>.header {
     height: 55px;
     background-color: #22262b;

     &>.header-container {
       position: relative;
     }
   }

   &>.content {
     flex: 1;
     padding-top: 10px;
     background-color: #222;
     overflow: auto;
   }
 }
</style>