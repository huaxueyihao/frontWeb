<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id"  v-for="(channel, index) in channels" :key="index" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)" :disabled="loading">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{totalCount}} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
        v-loading="loading"
      >
        <el-table-column
          prop="date"
          label="封面"
          >
          <template slot-scope="scope">
            <img class="article-cover" :src="scope.row.cover.images[0]" alt=""/>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="onDeleteArticle(scope.row.id)"
              ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
        >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  data () {
    // 这里存放数据
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [],
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangeDate: null,
      loading: true
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        this.loading = false
      })
    },

    onSubmit () {

    },

    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },

    onDeleteArticle (articleId) {
      this.$confirm('确认删除吗', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已删除'
        })
      })
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.article-cover {
  width: 100px;
  background-size: cover;
}
</style>
