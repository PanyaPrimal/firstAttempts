<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <BudgetListItem
          v-for="(item, prop) in list"
          :key="prop"
          :listItem="item"/>
      </template>
      <ElAlert
        v-else type="info"
        :title="emptyTitle"
        :closable="false"/>
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from './BudgetListItem.vue';

export default {
  name: "BudgetList",
  components: { BudgetListItem },
  props: {
      list: {
          type: Object,
          default: () => ({})
      }
  },
  data: () => ({
      header: "Budget List",
      emptyTitle: "Empty List"
  }),
  computed: {
    isEmpty() {
      return !Object.keys(this.list).length;
    }
  },
  methods: {
    deleteItem(id) {
      this.$emit("deleteItem", id);
    }
  }
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

</style>