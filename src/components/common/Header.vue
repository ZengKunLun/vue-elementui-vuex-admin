<template>
    <div class="header">
        <div class="header-left">
            <div class="fold-btn" @click='foldChange()'>
                <i class="el-icon-s-unfold" v-if='fold'></i>
                <i class="el-icon-s-fold" v-else></i>
            </div>
            <p class="logo"> 后 台 管 理 系 统 </p>
        </div>

        <div class="header-right">
            <div class="bell-warp">
                <el-tooltip effect='dark' :content='messageCount?`有${messageCount}条消息`:`消息中心`' placement='bottom'>
                    <router-link to="/message">
                        <img class="bell" src="../../assets/img/bell.svg" alt="消息中心">
                    </router-link>
                </el-tooltip>
                <div class="bell-red"></div>
            </div>

            <div class="user-img">
                <img src="../../assets/img/user.jpg" alt="用户头像">
            </div>

            <el-dropdown class="name" @command='nameCommand'>
                <p v-text='name'></p>
                <i class="el-icon-caret-bottom"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='github'>github</el-dropdown-item>
                    <el-dropdown-item command='loginOut'>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import store from "../../store/index";
    import router from '../../router/index';
    import {
        mapState
    } from 'vuex';

    export default {
        methods: {
            foldChange() {
                store.commit("foldChange");
            },

            nameCommand(command) {
                if (command === 'loginOut') {
                    store.commit("loginOut");
                    this.$router.push('/login');
                }

                if (command === 'github') {
                    window.open("https://github.com/ZengKunLun/vue-elementui-vuex-admin");
                }
            }
        },

        computed: mapState(['fold', 'messageCount', 'name']),

        mounted() {
            if (!store.state.messageCount) {
                document.querySelector('.bell-red').style.display = 'none';
            }
            if (window.innerWidth < 1300) {
                setTimeout(() => {
                    this.foldChange();
                }, 100);
            }
        },
    };
</script>

<style>
    .header {
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: steelblue;
    }

    .header-left,
    .header-right {
        display: flex;
        align-items: center;
    }

    .fold-btn {
        height: 70px;
        width: 70px;
        cursor: pointer;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo {
        font-size: 22px;
        font-weight: bold;
        margin-top: -3px;
    }

    .bell-warp {
        display: flex;
        margin-right: 30px;
    }

    .bell {
        height: 30px;
        margin: 10px 10px 0 10px;
    }

    .bell-red {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: red;
        margin: 10px 0 0 -20px;
    }

    .user-img {
        height: 60px;
        width: 60px;
        border-radius: 30px;
        overflow: hidden;
        margin: 0 30px 0 0;
    }

    .user-img>img {
        height: 100%;
        width: 100%;
    }

    .name {
        margin: 0 30px 0 0;
        font-size: 20px;
        color: black;
        cursor: pointer;
        display: flex;
    }

    .name>p {
        font-size: 16px;
    }
</style>