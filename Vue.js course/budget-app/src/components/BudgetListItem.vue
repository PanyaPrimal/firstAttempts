<template>
    <div class="budget-list-item">
      <span class="budget-comment">{{ item.comment }}</span>
      <span class="budget-value">{{ item.value }}</span>
      <ElButton type="danger" size="mini" @click="deleteItem(item.id)">Delete</ElButton>
    </div>
</template>

<script>
  export default {
    name:"BudgetListItem",
    props: {
      listItem: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      item: {
        comment: String,
        value: Number,
      }
    }),
    computed: {},
    methods: {
    deleteItem(id) {
      this.$emit("deleteItem", id);
    }
    }
  }
</script>

<style scoped>

.budget-list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;

}

</style>