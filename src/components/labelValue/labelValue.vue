<template>
  <div class="zy-label">
    <slot name="label">
      <b>{{ prop.label }} : </b>
    </slot>
    <slot name="value">
      <pre> {{ prop.value }} </pre>
    </slot>
  </div>
</template>

<script setup lang="ts">
//138.210
//208.49
//320.15

//147.56


// 867
interface Props {
  label?: string;
  value?: any;
}
const prop = withDefaults(defineProps<Props>(), {
  label: '',
  value: ''
});

</script>

<style scoped lang="scss">
.zy-label {
  line-height: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  margin: 5px 0px;
  color: var(--el-text-color-regular);

  &>b {
    min-width: 80px;
    text-align: right;
    word-wrap: normal;
    white-space: nowrap;
    margin-right: 5px;
  }

  &>pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0px;
  }
}
</style>
