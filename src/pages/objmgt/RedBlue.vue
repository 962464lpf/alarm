<template>
  <div class="red-blue">
    <el-row>
      <el-button type="primary"
                 @click="openAddDialogStatus('blue')">添加蓝队IP</el-button>
      <el-button type="danger"
                 @click="openAddDialogStatus('red')">添加红队IP</el-button>
    </el-row>
    <el-row :gutter="20"
            class="list-content mt10">
      <el-col :span="12">
        <div class="title">
          蓝队IP
          <RedBlueList class="mt10"></RedBlueList>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="title">
          红队IP
          <RedBlueList class="mt10"></RedBlueList>
        </div>
      </el-col>
    </el-row>

    <div v-if="addDialogStatus">
      <AddRedBlueDialog v-model="addDialogStatus"
                        :title="addDialogTitle"
                        @getIP='getIP'></AddRedBlueDialog>
    </div>
  </div>
</template>

<script>
import AddRedBlueDialog from '../../components/whiteBlackList/AddRedBlueDialog'
import RedBlueList from '../../components/whiteBlackList/RedBlueList'
export default {
  components: {
    AddRedBlueDialog,
    RedBlueList
  },
  data () {
    return {
      addDialogStatus: false,
      addDialogTitle: ''
    }
  },
  methods: {
    openAddDialogStatus (type) {
      if (type === 'red') {
        this.addDialogTitle = '添加红队IP'
      } else {
        this.addDialogTitle = '添加蓝IP'
      }
      this.addDialogStatus = true
    },
    getIP (ip) {
      console.log(ip)
    }
  },
  mounted () {

  }
};
</script>

<style scoped lang="scss">
.red-blue {
  .list-content {
    .title {
      text-align: center;
    }
  }
}
</style>
