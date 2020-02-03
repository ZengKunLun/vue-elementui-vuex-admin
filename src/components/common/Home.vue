<template>
    <div class="home">
        <Header></Header>
        <Sidebar></Sidebar>
        
        <div v-if='fold' class="home-main" style="left:65px">
            <Tag></Tag>
            <div class="home-main-content">
                <transition name="home-main-fade" mode='out-in'>
                    <keep-alive :include='cacheList'>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>

        <div v-else class="home-main" style="left:201px">
            <Tag></Tag>
            <div class="home-main-content">
                <transition name="home-main-fade" mode='out-in'>
                    <keep-alive :include='cacheList'>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../../store/index";
    import router from '../../router/index';
    import {
        mapState
    } from 'vuex';
    import Header from './Header.vue';
    import Sidebar from './Sidebar.vue';
    import Tag from './Tag.vue';

    export default {
        components: {
            Header,
            Sidebar,
            Tag,
        },

        computed: mapState(['name', 'fold', 'tagList', 'cacheList']),

        created() {//页面刷新时将保存在sessionStorage中的vuex state的部分数据再加载回来
            store.commit("protectState");
        },

        beforeRouteEnter(to, from, next) {//路由跳转前判断权限，未成功登录的话会强制跳转回登陆页面
            let name = sessionStorage.getItem('name');
            if (name === undefined || name === '' || name === null) {
                next('/login');
            } else {
                next();
            }
        },
    };
</script>

<style>
    .home-main {
        position: absolute;
        top: 70px;
        right: 0;
        bottom: 0px;
        overflow: auto;
        transition: left 0.4s;
        background-color: #F0F0F0;
    }

    .home-main-content {
        margin: 10px 10px 10px 5px;
    }
</style>