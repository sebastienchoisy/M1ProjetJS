<template>
  <div>
  <el-table
      :data="orders"
      style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
      <div>
        <p class="etat">État: {{ props.row.status }}</p> 
        <p>Détail de la commande: {{ props.row.items }}</p>
        <p>Adresse: {{ props.row.customerName }}</p>
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