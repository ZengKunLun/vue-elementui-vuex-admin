<template>
  <div class="login-warp">
    <div class="login-main">

      <p class="login-title">后 台 管 理 系 统</p>

      <el-form>
        <el-form-item>
          <el-input placeholder="用户名" v-model="name" class="login-input" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="密 码 ： " type="password" @keyup.enter.native="submit()" v-model="password"
            class="login-input" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>

      <el-button @click="submit()" type="primary" plain class="login-btn">登 录</el-button>
      <p class="login-tips">管理员：admin，123456;普通用户：123456，123456</p>

    </div>
  </div>
</template>

<script>
  import store from "../../store/index";
  import router from '../../router/index';

  export default {
    data() {
      return {
        name: "admin",
        password: "123456",
        authority:'',
        lastTime:'',
        lastSite:'',
      };
    },

    methods: {
      submit() {
        if (this.check(this.name, this.password)) {
          this.succeed();
          let userForm = {
            name: this.name,
            authority: this.authority,
            lastTime: this.lastTime,
            lastSite: this.lastSite,
          }
          store.commit("loginSucceed", userForm);
          this.$router.push('./dashboard');
        } else {
          this.error();
        }
      },

      check(name, password) {
        if (name === "admin" && password === "123456") {
          this.authority='admin';
          this.lastTime='2020.1.1';
          this.lastSite='湖州';
          return true;
        } else if (name === "123456" && password === "123456") {
          this.authority='nomal';
          this.lastTime='2020.1.1';
          this.lastSite='湖州';
          return true;
        } else {
          return false;
        }
      },

      succeed() {
        this.$notify.success({
          title: "登录成功",
          message: "欢迎进入后台管理系统"
        });
      },
      
      error() {
        this.$notify.error({
          title: "错误",
          message: "用户名或密码错误"
        });
      }
    }
  };
</script>

<style>
  .login-warp {
    position: relative;
    height: 100%;
    width: 100%;
    background-image: url(../../assets/img/login.jpg);
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-main {
    height: 300px;
    width: 400px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(219, 213, 213, 0.5);
  }

  .login-title {
    font-size: 24px;
    color: white;
    margin: -10px 0 20px 0;
  }

  .login-input {
    width: 300px;
  }

  .login-input>input {
    text-align: center;
  }

  .login-btn {
    width: 300px;
  }

  .login-tips {
    margin: 20px 0 0 0;
    font-size: 12px;
    color: white;
  }
</style>