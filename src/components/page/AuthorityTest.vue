<template>
    <div class="public-warp">
        <div v-if="authority === 'admin'" class="authority-test-warp">
            <p class="admin-title">
                管理员权限页面
            </p>
            <p class="admin-text">
                只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，普通用户账号想进来都会跳到403页面，重新用管理员账号登录才有权限。
                想尝试一下，请<el-button type="text" @click='loginOut'>退出登录</el-button>，输入普通用户账号，再进来试试看。
            </p>
        </div>

        <div v-else class="authority-test-warp">
            <p class="normal-title">
                <span style="color: #F02D2D;">4</span>
                <span style="color: #00FF7F;">0</span>
                <span style="color: #00FFFF;">3</span>
            </p>
            <p class="normal-text">啊哦~ 你没有权限访问该页面哦</p>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";
    import router from '../../router/index';
    import store from "../../store/index";

    export default {
        name: 'AuthorityTest',

        data() {
            return {}
        },

        computed: mapState(["authority"]),

        methods: {
            loginOut() {
                store.commit("loginOut");
                this.$router.push('/login');
            }
        },
    }
</script>

<style>
    .authority-test-warp {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .admin-title {
        font-size: 30px;
        font-weight: bolder;
        margin: 30px 0 40px 0;

    }

    .admin-text {
        max-width: 800px;
        margin: 0 0 40px 0;
    }

    .normal-title {
        font-size: 160px;
        font-weight: bolder;
    }

    .normal-text {
        font-size: 30px;
        color: #B5B5B5;
        margin: 0 0 30px 0;
    }
</style>