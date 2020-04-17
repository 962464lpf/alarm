<template>
  <div class="alarm-summary-search">
    <el-form :inline="true" :model="searchForm" ref="searchForm">
      <div class="more-search">
        <!-- <el-input placeholder disabled v-model="searchContent">
          <el-button slot="append" icon="el-icon-caret-bottom" @click="moreSearch = !moreSearch"></el-button>
        </el-input>-->
        <el-button
          slot="append"
          class="more-search-btn"
          icon="el-icon-caret-bottom"
          @click="moreSearch = !moreSearch"
        >全部</el-button>
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
      </div>
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
  .more-search {
    display: inline-block;
    margin-right: 20px;
    .search-box {
      position: absolute;
      background: white;
      z-index: 10;
      width: 250px;
      padding-top: 18px;
      overflow: auto;
      width: 220px;
      box-shadow: 0 0 8px 2px rgba(191, 191, 191, 0.42);
      border-top-left-radius: 0;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      z-index: 100;
      .el-form-item {
        display: flex;
        .el-form-item__label {
          width: 95px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
