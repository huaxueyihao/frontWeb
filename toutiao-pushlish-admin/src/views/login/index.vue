<template>
  <div class="login-container">
    <el-form ref="user" :model="form" label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="user.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="user.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>
</style>
