<template>
  <div class="publish-container">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="article" :model="article" :rules="formRules" label-width="60px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <!-- <el-tiptap v-model="article.content"></el-tiptap> -->
          <vue-editor v-model="article.content" id="editor" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="channel_id" label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option :label="channel.name" :value="channel.id"  v-for="(channel, index) in channels" :key="index" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'PublishIndex',
  components: {
    // 'el-tiptap': ElementTipTap
    VueEditor
  },
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
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        }
      },
      channels: null,
      channelId: null,
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { mid: 5, max: 30, message: '长度在5-30个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ],
        channel_id: [
          { required: true, message: '请输入文章频道' }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },

    onPublish (draft = false) {
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, this.article, draft).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        })
      }
    },

    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    },

    onSubmit () {
      console.log('submit!')
    },

    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('image', file)

      uploadImage(formData).then(res => {
        console.log(res)
        const url = res.data.data.url // Get url from response
        Editor.insertEmbed(cursorLocation, 'image', url)
        resetUploader()
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadChannels()

    if (this.$route.query.id) {
      this.loadArticle()
    }
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
</style>
