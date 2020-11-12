<template>
  <div class="alarm-summary-search">
    <el-form :inline="true" label-width="75px" :model="searchForm" ref="searchForm">
      <div class="more-search">
        <el-button
          slot="append"
          class="more-search-btn"
          icon="el-icon-caret-bottom"
          @click.stop="changeMoreSearchStatus"
        >全部</el-button>
        <div class="search-box" v-if="moreSearch">
          <el-form-item label="恶意IP">
            <el-input v-model="searchForm.sip" placeholder="恶意IP"></el-input>
          </el-form-item>
          <el-form-item label="目的IP">
            <el-input v-model="searchForm.dip" placeholder="目的地IP"></el-input>
          </el-form-item>
          <el-form-item label="告警来源">
            <!-- <el-input v-model="searchForm.device_ip" placeholder="告警来源"></el-input> -->
            <el-select v-model="searchForm.device_ip" placeholder="请选择">
              <el-option
                v-for="item in deviceIpList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="攻击类型">
            <el-input v-model="searchForm.attack_type" placeholder="攻击类型"></el-input>
          </el-form-item>
          <el-form-item label="攻击等级" v-if="levelStatus">
            <el-radio-group v-model="searchForm.level">
              <el-radio :label="0">高</el-radio>
              <el-radio :label="1">中</el-radio>
              <el-radio :label="2">低</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="时间" class="date-range">
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
        <el-button type="primary" icon="el-icon-search" @click="onSearch(true)"></el-button>
        <el-button type="primary" @click="onSearch(false)" icon="el-icon-refresh"></el-button>
      </el-form-item>

      <slot class="my-slot"></slot>
    </el-form>
  </div>
</template>

<script>
import { getSafeEquipListApi } from '../../tools/api'
export default {
  props: {
    levelStatus: {
      default: false,
    },
    moreSearchStatus: {},
  },
  watch: {
    moreSearchStatus(val) {
      this.moreSearch = val
    },
  },
  data() {
    return {
      moreSearch: this.moreSearchStatus,
      searchForm: {
        sip: '',
        dip: '',
        device_ip: '',
        attack_type: '',
        time: [],
        level: '',
      },
      deviceIpList: [],
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
    },
  },
  methods: {
    changeMoreSearchStatus() {
      this.$emit('getMoreSearchStatus')
    },
    onSearch(type) {
      if (!type) {
        this.searchForm = {
          sip: '',
          dip: '',
          device_ip: '',
          attack_type: '',
          time: [],
          level: '',
        }
      }
      this.$emit('getSearchForm', this.searchForm)
    },
  },
  mounted() {
    let fd = new FormData()
    fd.append('page', 1)
    fd.append('per_page', 100)
    getSafeEquipListApi(fd).then((res) => {
      let list = res.data
      list.forEach((item) => {
        let obj = {}
        obj.value = item.ip
        obj.label = item.ip
        this.deviceIpList.push(obj)
      })
    })
  },
}
</script>

<style  lang="scss">
.alarm-summary-search {
  .more-search {
    display: inline-block;
    margin-right: 20px;
    .more-search-btn {
      background: transparent;
      border: 1px solid #97e402;
      color: white;
    }
    .search-box {
      position: absolute;
      background: #292e33;
      z-index: 10;
      width: 280px;
      padding-top: 18px;
      overflow: auto;
      // box-shadow: 0 0 8px 2px rgba(191, 191, 191, 0.42);
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
        .el-radio-group {
          .el-radio {
            // margin-right: 10px;
          }
        }
      }
    }
  }

  .el-form-item {
    label {
      color: #97e402;
    }
    .el-button--primary {
      background-color: rgba(159, 239, 0, 0.1) !important;
      border: none;
      color: #97e402;
    }

    .el-form-item__content {
      .el-input__inner {
        background: transparent;
        border: 1px solid #97e402;
      }
      .el-range-editor {
        .el-icon-time {
          color: #97e402;
        }
        input {
          background: transparent;
          color: white;
        }
        .el-range-separator {
          color: white;
        }
      }
    }
  }
}

.el-date-range-picker {
  background: #141d2b;
  border: 1px solid #97e402;
  color: #d5d8de;
  .popper__arrow::after {
    border-bottom-color: #97e402 !important;
  }
  .el-date-range-picker__time-header {
    border-bottom: 1px solid #97e402;
  }
  .el-date-range-picker__editor {
    .el-input__inner {
      background-color: transparent;
      border: none;
    }
  }
  .el-picker-panel__footer {
    background-color: #141d2b !important;
  }
  .el-picker-panel__footer {
    border-top: 1px solid #97e402;
  }
  .el-date-range-picker__content.is-left {
    border-right: 1px solid #97e402;
  }
  .el-date-table td.in-range div {
    background-color: #273852 !important;
  }
  .el-date-table td.available:hover {
    color: #97e402;
  }
  .el-date-table td.start-date span,
  .el-date-table td.end-date span {
    background: #5a8615;
  }
  .el-time-panel {
    background: #0d1119 !important;
    border: 1px solid #97e402;
    .el-time-panel__footer {
      border-top-color: #97e402;
      button {
        background-color: rgba(159, 239, 0, 0.1) !important;
        border: none !important;
        color: #97e402 !important;
      }
    }
    .el-time-spinner__item {
      color: white;
    }
    .el-time-spinner__item:hover {
      color: #97e402;
      background: transparent;
    }
  }

  .el-button,
  .el-button.is-disabled,
  .el-button.is-disabled.is-plain,
  .el-button.is-disabled.is-plain:hover {
    background-color: rgba(159, 239, 0, 0.1) !important;
    border: none !important;
    color: #97e402 !important;
  }

  .el-button--text {
    padding: 7px 15px;
  }
}
.el-dropdown-menu {
  background: #141d2b !important;
  border: 1px solid #97e402;
  .el-dropdown-menu__item {
    color: white;
  }
  .el-dropdown-menu__item:hover {
    background: transparent !important;
    color: #97e402;
  }
  .popper__arrow::after {
    border-bottom-color: #97e402 !important;
  }
}

.el-select-dropdown {
  border: none;
  .el-scrollbar {
    background: #2b2c2d !important;
    color: white !important;
    border: none !important;
    .el-select-dropdown__item {
      color: white !important;
    }
    .el-select-dropdown__item:hover,
    .el-select-dropdown__item.hover {
      color: #97e402 !important;
      background: transparent !important;
    }
  }
}
</style>
