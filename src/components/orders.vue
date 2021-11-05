<template>
  <div>
  <el-table
      :data="orders"
      style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
      <div>
        <el-descriptions title="Détail de la commande">
            <el-descriptions-item label="Etat">{{ props.row.status }}</el-descriptions-item>
            <el-descriptions-item label="Address">{{ props.row.customerName }}</el-descriptions-item>
        </el-descriptions>
        <div v-for="item in props.row.items" :key="item.id">
           Plat: {{ item.nom }} --- Prix: {{ item.prix }} 
        </div>
      </div>
     </template>
    </el-table-column>
    <el-table-column
        label="Date"
        prop="date">
    </el-table-column>
    <el-table-column
        label="Nom du restaurant"
        prop="restaurantName">
    </el-table-column>
    <el-table-column
        label="prix"
        prop="totalCost">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: "orders",
  data: function(){
    return {
      orders: this.$store.state.order.orders,
    }
  }
}
</script>

<style scoped>
.etat{
  color:#2c3e50;
}
</style>