<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             width="60%"
             :before-close="handleClose">
    <el-form ref="addInsideEquip"
             :model="form"
             :rules="rules"
             inline
             label-width="120px">
      <el-row v-if="uploadStatus">
        <el-upload class="upload-demo"
                   :auto-upload="false"
                   :limit="1"
                   action
                   accept=".xls, .xlsx"
                   :on-change="fileChange"
                   :on-remove="fileRemove"
                   :file-list="fileList">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传excel文件</div>
        </el-upload>
      </el-row>
      <el-row v-else>
        <el-col :span="12">
          <el-form-item label="资产名称："
                        prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP："
                        prop="ip">
            <el-input v-model="form.ip"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安全域："
                        prop="anquanyu">
            <el-input v-model="form.anquanyu"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型："
                        prop="cat">
            <el-input v-model="form.cat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任人："
                        prop="staff">
            <el-input v-model="form.staff"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话："
                        prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary"
                 @click="confirm">确定</el-button>
    </span>

  </el-dialog>
</template>

<script>
import { addSingleInsideEquipApi, addMoreInsideEquipApi, editInsideEquipApi } from '../../tools/api'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    addInsideEquipType: {
      type: String
    },
    currentRow: {
      type: Object
    }
  },
  data () {
    return {
      title: '',
      dialogVisible: this.value,
      form: {
        ip: '',
        name: '',
        phone: '',
        anquanyu: '',
        cat: '',
        staff: ''
      },
      fileList: [],
      uploadStatus: false,
      rules: {
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    fileChange (file) {
      this.fileList.push(file.raw)
    },
    fileRemove () {
      this.fileList = []
    },
    confirm () {
      let fd = new FormData()
      let api = null
      if (this.addInsideEquipType === 'more') {
        api = addMoreInsideEquipApi
        fd.append('file', this.fileList[0])
      } else if (this.addInsideEquipType === 'single') {
        api = addSingleInsideEquipApi
        for (let key in this.form) {
          fd.append(key, this.form[key])
        }
      } else {
        api = editInsideEquipApi
        for (let key in this.form) {
          fd.append(key, this.form[key])
        }
      }
      api(fd).then(res => {
        let type = 'success'
        if (res.state !== this.successFlag) {
          type = 'warning'
        } else {
          this.$emit('refresh')
        }
        this.$message({
          type,
          message: res.info
        })
      })
      this.handleClose()
    }

  },
  mounted () {
    this.title = '录入内部设备'
    if (this.addInsideEquipType === 'more') {
      this.uploadStatus = true
    } else if (this.addInsideEquipType === 'single') {
      this.uploadStatus = false
    } else {
      this.uploadStatus = false
      this.title = '修改内部设备'
      for (let key in this.form) {
        this.form[key] = this.currentRow[key]
      }
    }
  }
}
</script>

<style  lang="scss">
</style>
