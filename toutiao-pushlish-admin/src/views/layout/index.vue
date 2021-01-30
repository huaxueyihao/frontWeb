<template>
  <el-container class="layout-contianer">
    <el-aside width="200px" class="aside">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i><div>系统</div>
        </div>

        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="" />
            <span>{{user.name}}</span>
          </div>
          <!-- <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>用户退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
  <!-- <div class='layout-container'>
    <div>顶部导航栏</div>
    <router-view></router-view>
    <div>侧边导航栏</div>
  </div> -->
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  data () {
    // 这里存放数据
    return {
      user: {
        photo: 'https://img04.sogoucdn.com/app/a/100520093/fb41c7c77a2454f7-01eba5833e7e38bc-f23635998ba2ba38fef4a7d7c4da1ff6.jpg',
        name: '哈哈'
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadUserProfile()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.layout-contianer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #002033;
  .aside-menu {
    height: 100%;
  }
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  // background-color: #b3c0d1;

}

.main {
  background-color: #e9eef3;
}

.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

</style>
