<template>
    <div class="sidebar">
        <el-menu :default-active='nowRoute' class="el-menu-vertical-demo sidebar-menu" :collapse="fold"
            background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <el-menu-item @click="setTagAndCache('/dashboard', '系统首页')" index="/dashboard">
                <i class="el-icon-s-home"></i>
                <span slot="title">系统首页</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/baseTable', '基础表格')" index="/baseTable">
                <i class="el-icon-tickets"></i>
                <span slot="title">基础表格</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/message', '消息中心')" index="/message">
                <i class="el-icon-chat-line-round"></i>
                <span slot="title">消息中心</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/baseForm', '基本表单')" index="/baseForm">
                <i class="el-icon-document"></i>
                <span slot="title">基本表单</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/chart', '图表')" index="/chart">
                <i class="el-icon-pie-chart"></i>
                <span slot="title">图表</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/moveTable', '拖拽列表')" index="/moveTable">
                <i class="el-icon-rank"></i>
                <span slot="title">拖拽列表</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/authorityTest', '权限测试')" index="/authorityTest">
                <i class="el-icon-user"></i>
                <span slot="title">权限测试</span>
            </el-menu-item>

            <el-menu-item @click="setTagAndCache('/nothing', '404页面')" index="/nothing">
                <i class="el-icon-warning-outline"></i>
                <span slot="title">404页面</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import store from "../../store/index";
    import {
        mapState
    } from 'vuex';

    export default {
        data() {
            return {
                pathMatchName: [{
                    path: '/dashboard',
                    name: 'Dashboard'
                }, {
                    path: '/baseTable',
                    name: 'BaseTable'
                }, {
                    path: '/message',
                    name: 'Message'
                }, {
                    path: '/baseForm',
                    name: 'BaseForm'
                }, {
                    path: '/chart',
                    name: 'Chart'
                }, {
                    path: '/moveTable',
                    name: 'MoveTable'
                }, {
                    path: '/authorityTest',
                    name: 'AuthorityTest'
                }, {
                    path: '/nothing',
                    name: 'Nothing'
                }, ],
            }
        },

        computed: {
            nowRoute() {
                return this.$route.path;
            },

            ...mapState(['fold', 'tagList']),
        },

        methods: {
            setTagAndCache(path, title) {
                for (let i = 0; i < this.tagList.length; i++) {
                    if (this.tagList[i].path === path) {
                        return;
                    }
                }

                for (let i = 0; i < this.pathMatchName.length; i++) {
                    if (this.pathMatchName[i].path === path) {
                        store.commit("setCache", this.pathMatchName[i].name);
                        break;
                    }
                }

                let tagForm = {
                    path: path,
                    title: title,
                }
                store.commit("setTag", tagForm);
            }
        },

    }
</script>

<style>
    .sidebar {
        position: absolute;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-menu {
        height: 100%;
        padding: 10px 0 0 0;
    }

    .sidebar-menu:not(.el-menu--collapse) {
        width: 200px;
    }
</style>