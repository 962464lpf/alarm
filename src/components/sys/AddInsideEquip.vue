<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
    <el-form
      ref="addInsideEquip"
      class="my-elem-form"
      :model="form"
      :rules="rules"
      inline
      label-width="120px"
    >
      <el-row v-if="uploadStatus">
        <el-upload
          class="upload-demo"
          :auto-upload="false"
          :limit="1"
          action
          accept=".xls, .xlsx"
          :on-change="fileChange"
          :on-remove="fileRemove"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
        </el-upload>
      </el-row>
      <el-row v-else>
        <el-col :span="12">
          <el-form-item label="资产名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公网IP：" prop="ip">
            <el-input v-model="form.ip"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="私网IP：" prop="ip_private">
            <el-input v-model="form.ip_private"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安全域：" prop="anquanyu">
            <el-input v-model="form.anquanyu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位-部门：" prop="anquanyu">
            <el-input v-model="form.com_dep"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型：" prop="cat">
            <el-input v-model="form.cat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任人：" prop="staff">
            <el-input v-model="form.staff"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否在线：" prop="online">
            <el-switch
              class="my-switch"
              v-model="form.online"
              active-text="在线"
              inactive-text="离线"
              active-color="#95d214"
            ></el-switch>
          </el-form-item>
          <el-form-item label="服务器区：" prop="phone">
            <el-switch
              class="my-switch"
              v-model="form.is_server"
              active-text="是"
              inactive-text="否"
              active-color="#95d214"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  addSingleInsideEquipApi,
  addMoreInsideEquipApi,
  editInsideEquipApi,
} from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    addInsideEquipType: {
      type: String,
    },
    currentRow: {
      type: Object,
    },
  },
  data() {
    return {
      title: '',
      dialogVisible: this.value,
      form: {
        ip: '',
        ip_private: '',
        name: '',
        phone: '',
        anquanyu: '',
        cat: '',
        staff: '',
        com_dep: '',
        online: true,
        is_server: false,
      },
      fileList: [],
      uploadStatus: false,
      rules: {},
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    fileChange(file) {
      this.fileList.push(file.raw)
    },
    fileRemove() {
      this.fileList = []
    },
    confirm() {
      let fd = new FormData()
      let api = null
      if (this.addInsideEquipType === 'more') {
        api = addMoreInsideEquipApi
        fd.append('file', this.fileList[0])
        this.$emit('showNotify')
      } else if (this.addInsideEquipType === 'single') {
        api = addSingleInsideEquipApi
        for (let key in this.form) {
          if (key === 'online' || key === 'is_server') {
            fd.append(key, Number(this.form[key]))
          } else {
            fd.append(key, this.form[key])
          }
        }
      } else {
        api = editInsideEquipApi
        fd.append('id', this.currentRow.id)
        for (let key in this.form) {
          if (key === 'online' || key === 'is_server') {
            fd.append(key, Number(this.form[key]))
          } else {
            fd.append(key, this.form[key])
          }
        }
      }
      this.$emit('postRequest', { fd, api })
      this.handleClose()
    },
  },
  mounted() {
    this.title = '资产录入'
    if (this.addInsideEquipType === 'more') {
      this.uploadStatus = true
    } else if (this.addInsideEquipType === 'single') {
      this.uploadStatus = false
    } else {
      this.uploadStatus = false
      this.title = '修改资产'
      for (let key in this.form) {
        if (key === 'online' || key === 'is_server') {
          this.form[key] = Boolean(this.currentRow[key])
        } else {
          this.form[key] = this.currentRow[key]
        }
      }
    }
  },
}
</script>

<style  lang="scss">
.my-switch {
  .el-switch__label {
    color: #8e8a8a !important;
  }
  .is-active {
    color: #95d214 !important;
  }
}
</style>
