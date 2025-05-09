<template>

    <button @click="console.log(content)">show content</button>
    <div class="rich-editor">
        <!-- 工具栏 -->
        <div class="toolbar">
            <el-button @click="insertImage">插入图片</el-button>
            <el-button @click="insertButton">插入按钮</el-button>
            <el-upload action="/api/upload" :show-file-list="false" :on-success="handleUploadSuccess">
                <el-button type="primary">上传图片</el-button>
            </el-upload>
        </div>

        <!-- 可编辑区域 -->
        <div ref="editor" class="editor-content" contenteditable="true" @input="handleInput" @paste="handlePaste"
            @keydown.enter="handleEnter"></div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';

const editor = ref(null);
const content = ref('');

// 处理文本输入
const handleInput = () => {
    content.value = editor.value.innerHTML;
};

// 插入图片
const insertImage = (url) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '200px';
    img.style.maxHeight = '150px';
    range.insertNode(img);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
};



// 插入按钮
const insertButton = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const button = document.createElement('button');
    button.className = 'el-button el-button--primary';
    button.contentEditable = 'false';
    button.textContent = '按钮';
    range.insertNode(button);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
};

// 处理图片上传成功
const handleUploadSuccess = (response) => {
    insertImage(response.url);
};

// 处理粘贴事件
const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (event) => {
                insertImage(event.target.result);
            };
            reader.readAsDataURL(blob);
            e.preventDefault();
            return;
        }
    }
};

// 处理回车键
const handleEnter = (e) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const br = document.createElement('br');
    range.deleteContents();
    range.insertNode(br);
    range.setStartAfter(br);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
    e.preventDefault();
};
</script>

<style scoped>
.rich-editor {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px;
}

.toolbar {
    padding: 5px;
    border-bottom: 1px solid #eee;
}

.editor-content {
    min-height: 100px;
    padding: 10px;
    outline: none;
    overflow-y: auto;
}

.editor-content:focus {
    border-color: #409eff;
}

.editor-content img {
    vertical-align: middle;
    margin: 2px;
}

.editor-content button {
    margin: 2px;
}
</style>