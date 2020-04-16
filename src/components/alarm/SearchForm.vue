<template>
  <div class="alarm-summary-search">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <el-form-item label-width>
        <el-input placeholder disabled v-model="searchContent">
          <el-button slot="append" icon="el-icon-caret-bottom" @click="moreSearch = !moreSearch"></el-button>
        </el-input>
        <div class="search-box" v-if="moreSearch">
          <el-form-item label="恶意IP">
            <el-input v-model="searchForm.sip" placeholder="恶意IP"></el-input>
          </el-form-item>
          <el-form-item label="目的IP">
            <el-input v-model="searchForm.dip" placeholder="目的地IP"></el-input>
          </el-form-item>
          <el-form-item label="告警来源">
            <el-input v-model="searchForm.device_ip" placeholder="告警来源"></el-input>
          </el-form-item>
          <el-form-item label="攻击类型">
            <el-input v-model="searchForm.attack_type" placeholder="攻击类型"></el-input>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          :clearable="false"
          v-model="searchForm.time"
          type="datetimerange"
          value-format="yyyy-MM-dd HH-mm-ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch(true)">查询</el-button>
        <el-button type="primary" @click="onSearch(false)">重置</el-button>
      </el-form-item>
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moreSearch: false,
      searchForm: {
        sip: '',
        dip: '',
        device_ip: '',
        attack_type: '',
        time: []
      }
    }
  },
  computed: {
    searchContent() {
      return (
        this.searchForm.sip +
        ' ' +
        this.searchForm.dip +
        ' ' +
        this.searchForm.device_ip +
        ' ' +
        this.searchForm.attack_type
      )
    }
  },
  methods: {
    onSearch(type) {
      if (!type) {
        this.searchForm = {
          sip: '',
          dip: '',
          device_ip: '',
          attack_type: '',
          time: []
        }
      }
      this.$emit('getSearchForm', this.searchForm)
    }
  },
  mounted() {}
}
</script>

<style  lang="scss">
.alarm-summary-search {
  .search-box {
    position: absolute;
    background: white;
    z-index: 10;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 100%;
    padding-top: 18px;
    overflow: auto;
    .el-form-item {
      display: flex;
      .el-form-item__label {
        width: 95px;
      }
    }
  }
}
</style>
