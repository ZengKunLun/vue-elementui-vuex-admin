<template>
  <div class="public-warp">
    
    <div class="base-table-header">
      <el-button type="primary" icon="el-icon-delete" @click="delManyDialogVisible = true">批量删除</el-button>
      <el-select v-model="province" clearable placeholder="省份" style="width:120px">
        <el-option v-for="item in provinceList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input v-model="searchInput" placeholder="用户名" style="width:360px"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="baseTableSearch">搜索</el-button>
    </div>

    <el-table :data="tableData" border ref="mutipleTable" @selection-change="selectionChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="160"></el-table-column>
      <el-table-column prop="name" label="用户名" width="120"></el-table-column>
      <el-table-column prop="money" label="账户余额(￥)" width="120"></el-table-column>

      <el-table-column label="头像" width="150" align="center">
        <template v-slot="tableData">
          <el-image :src="require('../../assets/img/' + tableData.row.src)" fit="cover"
            style="width: 50px; height: 50px" :preview-src-list="[require('../../assets/img/' + tableData.row.src)]">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址" width="250"></el-table-column>

      <el-table-column label="状态" width="120" align="center">
        <template v-slot="tableData">
          <el-tag :type="tableData.row.state==='成功'?'success':'danger'">{{tableData.row.state}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="注册时间" width="120" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        <template v-slot="tableData">
          <el-button type="text" icon="el-icon-edit" @click="editTable(tableData.$index)">编辑</el-button>

          <el-button type="text" icon="el-icon-delete" @click="delTable(tableData.$index)" style="color:red">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="base-table-pagination">
      <el-pagination :current-page="1" :page-sizes="[1, 2, 3, 4]" :page-size="4"
        layout="total, sizes, prev, pager, next, jumper" :total="4"></el-pagination>
    </div>
    <div style="width: auto; height: 40px;"></div>

    <el-dialog title="是否删除以下用户：" :visible.sync="delManyDialogVisible" width='600px'>
      <el-table :data="selection">
        <el-table-column prop="id" label="ID" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="money" label="账户余额"></el-table-column>
        <el-table-column prop="state" label="状态" width='50px'></el-table-column>
      </el-table>
      <div class="del-many-dialog-btn">
        <el-button @click="delManyDialogVisible = false">取 消</el-button>
        <el-button @click="delMany" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editTableDialogVisible" width='500px'>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div class="edit-table-dialog-btn">
        <el-button @click="editTableDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTableConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'BaseTable',

    data() {
      return {
        tableData: [{
            id: 1,
            name: "张三",
            money: 123,
            address: "广东省东莞市长安镇",
            province: "广东省",
            state: "成功",
            date: "2019-11-1",
            src: "spring.jpg"
          },
          {
            id: 2,
            name: "李四",
            money: 456,
            address: "广东省广州市白云区",
            province: "广东省",
            state: "成功",
            date: "2019-10-11",
            src: "summer.jpg"
          },
          {
            id: 3,
            name: "王五",
            money: 789,
            address: "湖南省长沙市",
            province: "湖南省",
            state: "失败",
            date: "2019-11-11",
            src: "autumn.jpg"
          },
          {
            id: 4,
            name: "赵六",
            money: 1011,
            address: "福建省厦门市鼓浪屿",
            province: "福建省",
            state: "成功",
            date: "2019-10-20",
            src: "winter.jpg"
          }
        ],

        province: "",

        selection: [],

        delManyDialogVisible: false,

        searchInput: "",

        currentRow: "",

        editTableDialogVisible: false,

        editForm: {
          name: "",
          address: ""
        }
      };
    },

    computed: {
      provinceList() {
        let array = [];
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.checkSame(array, this.tableData[i].province) === -1) {
            array.push(this.tableData[i].province);
          }
        }
        return array;
      }
    },

    methods: {
      selectionChange(value) {
        this.selection = value;
      },

      delMany() {
        this.delManyDialogVisible = false;
        for (let i = 0; i < this.selection.length; i++) {
          for (let j = 0; j < this.tableData.length; j++) {
            if (this.selection[i].id === this.tableData[j].id) {
              this.tableData.splice(j, 1);
              break;
            }
          }
        }
      },

      baseTableSearch() {},

      editTable(index) {
        this.currentRow = index;
        this.editForm.name = this.tableData[this.currentRow].name;
        this.editForm.address = this.tableData[this.currentRow].address;
        this.editTableDialogVisible = true;
      },

      editTableConfirm() {
        this.editTableDialogVisible = false;
        this.tableData[this.currentRow].name = this.editForm.name;
        this.tableData[this.currentRow].address = this.editForm.address;
      },

      delTable(index) {
        this.$confirm("是否确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      },

      checkSame(array, item) {
        for (let i = 0; i < array.length; i++) {
          if (array[i] === item) {
            return i;
          }
        }
        return -1;
      }
    }
  };
</script>

<style>
  .base-table-header {
    display: flex;
  }

  .base-table-header>div,
  .base-table-header>button {
    margin: 10px 20px 10px 0;
  }

  .base-table-pagination {
    float: right;
    margin: 10px 0 0 0;
  }

  .del-many-dialog-btn {
    margin: 10px 0 0 0;
    display: flex;
    justify-content: flex-end;
  }

  .edit-table-dialog-btn {
    display: flex;
    justify-content: flex-end;
  }
</style>