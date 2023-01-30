<template>
  <ElCard class="form-card">
    <ElForm :model="formData">
      <ElFormItem lable="Type" prop="type">
        <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
          <ElOption lable="Income" value="INCOME"/>
          <ElOption lable="Outcome" value="OUTCOME"/>
        </ElSelect>
      </ElFormItem>
      <ElFormItem lable="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem lable="Value" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton @click="onSubmit" type="primary">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>

export default {
  name: "MultyForm",
  data: () => ({
    formData: {
      type: 'INCOME',
    comment: '',
    value: 0
    }
  }),
  methods: {
    onSubmit() {

    }
  }
};
</script>

<style scoped>
  .form-card{
    max-width: 500px;
    margin: auto;
  }
  .type-select{
    width: 100%;
  }

</style>