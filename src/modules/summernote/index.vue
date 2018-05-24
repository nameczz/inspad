<template>
	<div>
		<div :id="id" class="summernote" hight="300">
		</div>
	</div>

</template>
<script>
import $ from 'jquery'
require('popper.js')
require('md/summernote/js/src/modal.js')
require('md/summernote/js/src/dropdown.js')
require('md/summernote/js/src/tooltip.js')
require('bootstrap/dist/css/bootstrap.css')
require('font-awesome/css/font-awesome.css')
require('summernote/dist/summernote.css')
require('summernote')
export default {
    props: {
        id: {
            type: String,
            default: 'summernote'
        },
        content: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 300
        }
    },
    mounted() {
        console.log(this.content)
        this.createEditor()
    },
    activated() {
        this.createEditor()
    },
    watch: {
        content(val) {
            console.log(val)
            this.setCode(val)
        }
    },
    methods: {
        createEditor() {
            $(`#${this.id}`).summernote({
                height: this.height,
                fontSize: 14,
                callbacks: {
                    onImageUpload: function (files) {
                        // upload image to server and create imgNode...
                        console.log(files)
                        // let node = document.createElement('img')
                        // node.src = imgUrl

                        // $(id).summernote('insertNode', node)
                    }
                },
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol']],
                    ['insert', ['link', 'picture']],
                    ['undo', ['undo']],
                    ['redo', ['redo']],
                    ['fullscreen', ['fullscreen']]
                ]
            })
            this.setCode(this.content)
        },
        getCode() {
            return $(`#${this.id}`).summernote('code')
        },
        setCode(val) {
            $(`#${this.id}`).summernote('code', val)
        },
        getCodeWithoutTag() {
            let html = $(`#${this.id}`).summernote('code');
            let dom = document.createElement("DIV");
            html = html.replace(/<br>/g, '\r');
            html = html.replace(/<\/p>/g, '\n');
            dom.innerHTML = html;
            const plain_text = (dom.textContent || dom.innerText);

            return plain_text
        },
        uploadThumbSuccess(url, file) {
            console.log(url)
            console.log(file)
            $(`#${this.id}`).summernote(
                'insertImage',
                `${process.env.WEBSITE_URL}${url}`,
                file.name
            )
        }
    }
}
</script>
<style lang="scss">
.upload {
  position: absolute;
  top: 20px;
  right: 0;
  z-index: 1000;
}
.note-editable {
  padding: 30px !important;
}
ul {
  li {
    list-style: disc;
  }
}

ol {
  li {
    list-style: decimal;
  }
}
</style>
