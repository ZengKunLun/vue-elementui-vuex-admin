<template>
  <div v-if="showTag" class="tag-warp">
    <ul class="tag-list">
      <li v-for="(item, index) in tagList" class="tag">
        <router-link :to="item.path" v-text="item.title"></router-link>
        <i @click="closeTag(index)" class="el-icon-close close-tag"></i>
      </li>
    </ul>

    <div class="tag-btn">
      <el-button @click="closeOther(nowTag)" type="primary">关闭其他</el-button>
      <el-button @click="closeAll" type="primary">关闭所有</el-button>
    </div>
  </div>
</template>

<script>
  import route from "../../router/index";
  import store from "../../store/index";
  import {
    mapMutations,
    mapState
  } from "vuex";

  export default {
    computed: {
      ...mapState(["tagList"]),

      showTag() {
        return this.tagList.length > 0;
      },

      nowTag() {
        return this.$route.path;
      }
    },

    watch: {
      $route() {
        setTimeout(this.tagColor(), 50); //在已被打开过的，即在标签列表中已有标签的数个页面内部切换时
      },                                 //updated（）不会被调用，因为没有数据跟新

      tagList: function () {
        store.commit("newCacheList");
      }
    },

    methods: {
      ...mapMutations(["closeTag", "closeOther", "closeAll"]),

      tagColor() { //给当前页面对应的标签标色
        if (this.tagList.length > 0) {
          let tag = document.querySelectorAll(".tag");
          for (let i = 0; i < tag.length; i++) {
            if (tag[i].firstChild.getAttribute("href") === '#' + this.$route.path) {
              tag[i].style.backgroundColor = "#98FB98";
            } else {
              tag[i].style.backgroundColor = "white";
            }
          }
        }
      }
    },

    mounted() { //保证刷新后当前页面对应的标签任然有色
      this.tagColor();
    },

    updated() {
      sessionStorage.setItem(
        "tagList",
        JSON.stringify({
          tagList: this.tagList
        })//保证sessionStorage中的tagList是最新的，
      );  //这样页面刷新时可以直接调用其中的tagList来恢复vuex state中的tagList

      this.tagColor();//存在数据改变（比如添加了新标签）的同时路由不变的情况
    },                //比如，先将所有标签关闭，再点击左侧导航栏中当前页面的按钮
  };
</script>

<style>
  .tag-warp {
    height: 32px;
    box-shadow: 0 5px 10px #ddd;
    background-color: white;
  }

  .tag-list {
    display: flex;
  }

  .tag {
    height: 28px;
    padding: 0 5px 0 7px;
    margin: 1px 5px 1px 5px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  .close-tag {
    font-size: 14px;
    cursor: pointer;
  }

  .tag-btn {
    position: absolute;
    top: 0;
    right: 5px;
  }

  .tag-btn>button {
    height: 30px;
    margin: 1px 0 0 0;
    font-size: 12px;
  }

  .tag-btn>button>span {
    margin: 0 -8px 0 -8px;
    position: relative;
    top: -4px;
  }
</style>