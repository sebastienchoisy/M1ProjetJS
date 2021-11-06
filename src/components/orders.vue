<template>
  <div v-if="orders.length">
  <el-table
      :data="orders"
      style="width: 70%;margin: auto;">
    <el-table-column type="expand">
      <template slot-scope="props">
      <div>
          <el-table
          :data="props.row.items">
            <el-table-column
                label="Plat"
                prop="nom">
            </el-table-column>
            <el-table-column
                label="Quantité"
                prop="quantity">
            </el-table-column>
            <el-table-column
                label="prix">
              <template slot-scope="scope">
                <span>{{scope.row.prix}} €</span>
              </template>
            </el-table-column>
          </el-table>
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
        label="prix">
      <template slot-scope="scope">
        <span>{{scope.row.totalCost}} €</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div style="margin-top: 20%;" v-else>
    <h2> Vous n'avez pas encore de commande ! Sélectionner un <router-link to="/restaurants" style="color:dodgerblue;text-decoration: none">restaurant</router-link> pour commander.</h2>
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