<template>
  <div>
    <el-row :gutter="16">

      <el-col :span="7">
        <el-card class="card">
          <div slot="header" class="user-card-header">
            <img src="../../assets/img/user.jpg" alt="用户" class="user-card-img" />
            <div>
              <p v-text="name" class="user-card-name"></p>
              <p v-text="role" class="user-card-role"></p>
            </div>
          </div>
          <p class="user-msg">
            上次登录时间 :
            <span v-text="lastTime"></span>
          </p>
          <p class="user-msg">
            上次登录地点 :
            <span v-text="lastSite"></span>
          </p>
        </el-card>

        <el-card class="card">
          <div slot="header">
            <span>语言占比</span>
          </div>Vue
          <el-progress :percentage="70" color="#42b983"></el-progress>HTML
          <el-progress :percentage="5" color="#f1e05a"></el-progress>CSS
          <el-progress :percentage="10" color="#f56c6c"></el-progress>JavaScript
          <el-progress :percentage="15"></el-progress>
        </el-card>
      </el-col>

      <el-col :span="17">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-card class="card" :body-style="{ padding: '0px', display: 'flex' }">
              <div class="dashboard-msg-icon">
                <i class="el-icon-user"></i>
              </div>
              <div class="dashboard-msg-right">
                <p class="dashboard-msg-top">1234</p>
                <p class="dashboard-msg-bot">用户访问量</p>
              </div>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="card" :body-style="{ padding: '0px', display: 'flex' }">
              <div class="dashboard-msg-icon">
                <i class="el-icon-bell"></i>
              </div>
              <div class="dashboard-msg-right">
                <p class="dashboard-msg-top">13</p>
                <p class="dashboard-msg-bot">系统消息</p>
              </div>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="card" :body-style="{ padding: '0px', display: 'flex' }">
              <div class="dashboard-msg-icon">
                <i class="el-icon-suitcase"></i>
              </div>
              <div class="dashboard-msg-right">
                <p class="dashboard-msg-top">2333</p>
                <p class="dashboard-msg-bot">商品数量</p>
              </div>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card class="card" :body-style="{ padding: '0px', display: 'flex' }">
              <div class="dashboard-msg-icon">
                <i class="el-icon-money"></i>
              </div>
              <div class="dashboard-msg-right">
                <p class="dashboard-msg-top">123456</p>
                <p class="dashboard-msg-bot">销售总额</p>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-card>
          <div slot="header">
            <span>待办事项</span>
            <el-button type="text" @click="addTodo" class="todoList-add">添加</el-button>
          </div>

          <el-table :data="todoList" :show-header="false">
            <el-table-column width="60">
              <template v-slot="todoList">
                <el-checkbox v-model="todoList.row.status"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column>
              <template v-slot="todoList">
                <p :class="{todoListTrue:todoList.row.status}">{{todoList.row.title}}</p>
              </template>
            </el-table-column>

            <el-table-column width="60">
              <i class="el-icon-edit" style="cursor:pointer" @click="editTodo"></i>
              <i class="el-icon-delete" style="cursor:pointer" @click="delTodo"></i>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";

  export default {
    name: 'Dashboard',

    data() {
      return {
        todoList: [{
            title: "今天要修复100个bug",
            status: false
          },
          {
            title: "今天要修复100个bug",
            status: false
          },
          {
            title: "今天要写100行代码加几个bug吧",
            status: false
          },
          {
            title: "今天要修复100个bug",
            status: false
          },
          {
            title: "今天要修复100个bug",
            status: true
          },
          {
            title: "今天要写100行代码加几个bug吧",
            status: true
          }
        ]
      };
    },

    computed: {
      ...mapState(["name", "authority", "lastTime", "lastSite"]),

      role() {
        if (this.authority === "admin") {
          return "管理员";
        } else {
          return "普通用户";
        }
      }
    },
    
    methods: {
      addTodo() {},
      editTodo() {},
      delTodo() {},
    }
  };
</script>

<style>
  .card {
    margin-bottom: 20px;
  }

  .user-card-header {
    display: flex;
    align-items: center;
  }

  .user-card-img {
    height: 120px;
    width: 120px;
    border-radius: 60px;
    overflow: hidden;
    margin: 0 80px 0 10px;
  }

  .user-card-name {
    font-size: 24px;
    font-weight: bold;
  }

  .user-card-role {
    font-size: 16px;
    color: #bebebe;
  }

  .user-msg {
    margin: 0 0 5px 10px;
    color: #bebebe;
  }

  .user-msg>span {
    margin-left: 90px;
  }

  .dashboard-msg-icon {
    height: 80px;
    width: 80px;
    background-color: rgb(45, 140, 240);
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dashboard-msg-right {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dashboard-msg-top {
    font-size: 26px;
    font-weight: bolder;
    color: rgb(45, 140, 240);
  }

  .dashboard-msg-bot {
    font-size: 14px;
    color: #bebebe;
  }

  .todoList-add {
    float: right;
    margin: -10px 20px 0 0;
  }

  .todoListTrue {
    text-decoration: line-through;
    color: #999;
  }
</style>