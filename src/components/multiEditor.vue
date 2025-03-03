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
      init: true,
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
              'image': this.imageHandler // 修改: 添加图片处理逻辑
            }
          },
        },
        placeholder: ''
      }
    }
  },
  watch: {
    content (newValue) {
      if (this.init){
        this.quill.root.innerHTML = newValue
        this.init = false
      }
    }
  },
  mounted () {
    console.log(this.content)
    const dom = this.$el.querySelector('.editor')
    this.quill = new Quill(dom, this.options)
    this.quill.root.innerHTML = this.content
    this.editorContent = this.content // 添加: 初始化 editorContent
    this.quill.on ('text-change', () => {
      this.editorContent = this.quill.root.innerHTML
      this.$emit('contentData', this.editorContent)
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
    imageHandler () {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = () => {
        const file = input.files[0];
        if (file) {
          const Width = 600;
          const resize = (width, height) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            height = Math.round((Width / width) * height);
            width = Width;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            return canvas.toDataURL(file.type);
          }
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            const width = img.width;
            const height = img.height;
            const resizedImage = resize(width, height);
            this.uploadImage(resizedImage);
          };
        }
      }
    },
    async uploadImage (base64Image) {
      try {
        const response = await this.$store.getters.http.post('/api/tool/image', base64Image, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        const url = response.data.data; // 假设服务器返回的 JSON 中包含图片的 URL
        this.insertToEditor(url);
      } catch (error) {
        console.error('Error uploading image:', error);
        this.$notify({
          type: 'error',
          title: '错误',
          message: '图片上传失败',
        });
      }
    },
    insertToEditor (url) {
      const range = this.quill.getSelection();
      const index = range ? range.index : this.quill.getLength();
      this.quill.insertEmbed(index, 'image', url, Quill.sources.USER);
      this.quill.setSelection(index + 1, Quill.sources.SILENT);

      // 获取插入的图片元素
      const img = this.quill.root.querySelector('img[src="' + url + '"]');
      if (img) {
        img.style.maxWidth = '100%';
        this.editorContent = this.quill.root.innerHTML
        this.$emit('contentData', this.editorContent)
        console.log(this.editorContent)
      }
    }
    }
}
</script>