
<template>
  <div>
    <div class="editor" style="height: 1000px"></div>
  </div>
</template>

<script>
import Quill from 'quill'
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

              ['link','image','video'],

              [
                { table: 'TD' },
                { 'table-insert-row': 'TIR' },
                { 'table-insert-column': 'TIC' },
                { 'table-delete-row': 'TDR' },
                { 'table-delete-column': 'TDC' }
              ],

            ],
            handlers: {
              table: function () {
                this.quill.getModule('table').insertTable(2, 3)
              },
              'table-insert-row': function () {
                this.quill.getModule('table').insertRowBelow()
              },
              'table-insert-column': function () {
                this.quill.getModule('table').insertColumnRight()
              },
              'table-delete-row': function () {
                this.quill.getModule('table').deleteRow()
              },
              'table-delete-column': function () {
                this.quill.getModule('table').deleteColumn()
              }
            }
          },
          table: true
        },
        placeholder: ''
      }
    }
  },
  mounted () {
    console.log(this.content)
    const dom = this.$el.querySelector('.editor')
    this.quill = new Quill(dom, this.options)
    // this.quill.setContents(this.content)
    // debugger
    this.quill.root.innerHTML = this.content
    // debugger
    this.quill.on('text-change', () => {
      //   console.log(this.quill.getContents())
      //   this.$emit('contentData', this.quill.getContents())
      //   console.log(this.quill.root.innerHTML)
      this.$emit('contentData', this.quill.root.innerHTML)
    })
    this.$el.querySelector(
      '.ql-table-insert-row'
    ).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="master_svg0_152_6483"><rect x="0" y="0" width="24" height="24" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_152_6483)"><g><path d="M10,3C10.552,3,11,3.448,11,4L11,20C11,20.552,10.552,21,10,21L4,21C3.448,21,3,20.552,3,20L3,4C3,3.448,3.448,3,4,3L10,3ZM9,5L5,5L5,19L9,19L9,5ZM18,7C20.761,7,23,9.239,23,12C23,14.761,20.761,17,18,17C15.239,17,13,14.761,13,12C13,9.239,15.239,7,18,7ZM19,9L17,9L17,10.998999999999999L15,11L15,13L17,12.999L17,15L19,15L19,12.999L21,13L21,11L19,10.998999999999999L19,9Z" fill="#444444" fill-opacity="1"/></g></g></svg>'
    this.$el.querySelector(
      '.ql-table-insert-column'
    ).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="master_svg0_152_6487"><rect x="0" y="0" width="24" height="24" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_152_6487)"><g><path d="M12,13C14.761,13,17,15.239,17,18C17,20.761,14.761,23,12,23C9.239,23,7,20.761,7,18C7,15.239,9.239,13,12,13ZM13,15L11,15L11,16.999000000000002L9,17L9,19L11,18.999000000000002L11,21L13,21L13,18.999000000000002L15,19L15,17L13,16.999000000000002L13,15ZM20,3C20.552,3,21,3.448,21,4L21,10C21,10.552,20.552,11,20,11L4,11C3.448,11,3,10.552,3,10L3,4C3,3.448,3.448,3,4,3L20,3ZM5,5L5,9L19,9L19,5L5,5Z" fill="#444444" fill-opacity="1"/></g></g></svg>'
    this.$el.querySelector(
      '.ql-table-delete-row'
    ).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="master_svg0_152_6479"><rect x="0" y="0" width="24" height="24" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_152_6479)"><g><path d="M20,3C20.552,3,21,3.448,21,4L21,20C21,20.552,20.552,21,20,21L14,21C13.448,21,13,20.552,13,20L13,4C13,3.448,13.448,3,14,3L20,3ZM19,5L15,5L15,19L19,19L19,5ZM6,7C8.761,7,11,9.239,11,12C11,14.761,8.761,17,6,17C3.239,17,1,14.761,1,12C1,9.239,3.239,7,6,7ZM7,9L5,9L5,10.998999999999999L3,11L3,13L5,12.999L5,15L7,15L7,12.999L9,13L9,11L7,10.998999999999999L7,9Z" fill="#444444" fill-opacity="1"/></g></g></svg>'
    this.$el.querySelector(
      '.ql-table-delete-column'
    ).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="master_svg0_152_6491"><rect x="0" y="0" width="24" height="24" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_152_6491)"><g><path d="M20,13C20.552,13,21,13.448,21,14L21,20C21,20.552,20.552,21,20,21L4,21C3.448,21,3,20.552,3,20L3,14C3,13.448,3.448,13,4,13L20,13ZM19,15L5,15L5,19L19,19L19,15ZM12,1C14.761,1,17,3.239,17,6C17,8.761,14.761,11,12,11C9.239,11,7,8.761,7,6C7,3.239,9.239,1,12,1ZM13,3L11,3L11,4.9990000000000006L9,5L9,7L11,6.999L11,9L13,9L13,6.999L15,7L15,5L13,4.9990000000000006L13,3Z" fill="#444444" fill-opacity="1"/></g></g></svg>'
    this.addQuillTitle()
  },
  activated () {
    this.quill.setContents({})
  },
  methods: {
    addQuillTitle () {
      let titleConfig;
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
      return this.quill.getContents()
    }
  }
}
</script>
<style>
</style>