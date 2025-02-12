<template>
  <div class="editor-container">
    <div class="editor" ref="editor"></div>
  </div>
</template>
<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
  name: 'editorComponent',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      quill: null,
      editorContent: '', // 添加: editorContent 来存储编辑器的内容
      options: {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ header: 1 }, { header: 2 }],
              [{ color: [] }, { background: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
              [{ indent: '-1' }, { indent: '+1' }],
              ['link', 'image', 'video'],
            ],
            handlers: {
            }
          },
          imageResize: {}, // 添加: 启用 imageResize 模块
          imageUploader: {
            upload: file => {
              return new Promise((resolve, reject) => {
                const formData = new FormData()
                formData.append('image', file)

                this.$store.getters.http.post('/upload/image', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(res => {
                  resolve(res.data.url)
                }).catch(err => {
                  reject('Upload failed')
                  console.error('Error:', err)
                })
              })
            }
          }
        },
        placeholder: ''
      }
    }
  },
  mounted () {
    console.log(this.content)
    const dom = this.$el.querySelector('.editor')
    this.quill = new Quill(dom, this.options)
    this.quill.root.innerHTML = this.content
    this.editorContent = this.content // 添加: 初始化 editorContent
    this.quill.on('text-change', () => {
      this.editorContent = this.quill.root.innerHTML // 修改: 更新 editorContent
      this.$emit('contentData', this.quill.root.innerHTML)
    })
    this.addQuillTitle()
  },
  methods: {
    addQuillTitle () {
      let titleConfig = {
        'ql-bold': '加粗',
        'ql-italic': '斜体',
        'ql-underline': '下划线',
        'ql-strike': '删除线',
        'ql-header': '标题',
        'ql-color': '文字颜色',
        'ql-background': '背景颜色',
        'ql-list': '列表',
        'ql-align': '对齐方式',
        'ql-link': '插入链接',
        'ql-image': '插入图片',
        'ql-video': '插入视频',
        'ql-indent': '缩进'
      };
      const oToolBar = document.querySelector('.ql-toolbar')
      const aButton = oToolBar.querySelectorAll('button')
      const aSelect = oToolBar.querySelectorAll('select')
      aButton.forEach(function (item) {
        if (item.className === 'ql-script') {
          item.value === 'sub' ? (item.title = '下标') : (item.title = '上标')
        } else if (item.className === 'ql-indent') {
          item.value === '+1' ? (item.title = '向右缩进') : (item.title = '向左缩进')
        } else {
          item.title = titleConfig[item.classList[0]]
        }
      })
      aSelect.forEach(function (item) {
        item.parentNode.title = titleConfig[item.classList[0]]
      })
    },
    getContentData () {
      return this.quill.root.innerHTML
    },
    getEditorContent () {
      return this.editorContent // 添加: 返回 editorContent
    }
  }
}
</script>