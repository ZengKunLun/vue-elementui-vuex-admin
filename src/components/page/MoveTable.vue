<template>
    <div class="public-warp">
        <el-row :gutter="40">

            <el-col :span='8'>
                <div class="move-table-list">
                    <p>未来任务</p>
                    <ul id="todo">
                        <li v-for='item in todo'>{{item}}</li>
                    </ul>
                </div>
            </el-col>

            <el-col :span='8'>
                <div class="move-table-list">
                    <p>正在进行</p>
                    <ul id="doing">
                        <li v-for='item in doing'>{{item}}</li>
                    </ul>
                </div>
            </el-col>

            <el-col :span='8'>
                <div class="move-table-list">
                    <p>已完成</p>
                    <ul id="done">
                        <li v-for='item in done'>{{item}}</li>
                    </ul>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import Sortable from 'sortablejs'

    export default {
        name: 'MoveTable',

        data() {
            return {
                todo: ['开发图表组件', '开发拖拽组件', '开发权限测试组件'],
                doing: ['开发登录注册页面', '开发头部组件', '开发表格相关组件', '开发表单相关组件'],
                done: ['初始化项目，生成工程目录，完成相关配置', '开发项目整体框架']
            }
        },

        mounted() {

            new Sortable(this.$el.querySelector('#todo'), {
                group: 'share',//share只是个名字，可以随意取
                animation: 150
            });

            new Sortable(this.$el.querySelector('#doing'), {
                group: 'share',
                animation: 150
            });

            new Sortable(this.$el.querySelector('#done'), {
                group: 'share',
                animation: 150
            });
        },
    }
</script>

<style>
    .move-table-list {
        padding: 15px 10px 20px 10px;
        border-radius: 10px;
        background-color: #EFF1F5;
    }

    .move-table-list>p {
        font-size: 18px;
        font-weight: bold;
    }

    .move-table-list>ul {
        min-height: 400px;
    }

    .move-table-list>ul>li {
        display: block;
        background-color: white;
        padding: 10px;
        margin: 15px 0 0 0;
        border-radius: 5px;
        cursor: pointer;
    }

    .move-table-list>ul>li:hover {
        color: #00BFFF;
    }
</style>