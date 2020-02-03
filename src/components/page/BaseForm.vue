<template>
  <div class="public-warp">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="表单名称">
        <el-input v-model="form.name" style="width:400px"></el-input>
      </el-form-item>

      <el-form-item label="日期时间">
        <el-date-picker v-model="form.dateTime" type="datetime" placeholder="选择日期时间" format="yyyy-M-d H:m:s"
          value-format="yyyy年M月d日H时m分s秒"></el-date-picker>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="form.brand" placeholder="请选择">
          <el-option v-for="item in brandList" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="城市级联">
        <el-cascader :options="cityList" v-model="form.city"></el-cascader>
      </el-form-item>

      <el-form-item label="选择开关">
        <el-switch v-model="form.switch"></el-switch>
      </el-form-item>

      <el-form-item label="产品类型">
        <el-checkbox-group v-model="form.product">
          <el-checkbox v-for="item in productList" :label="item.value">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="国家">
        <el-radio-group v-model="form.country">
          <el-radio v-for="item in countryList" :label="item.value">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文本框">
        <el-input type="textarea" rows="8" style="width:600px" v-model="form.text"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitDialogVisible = true">表单提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="请确认表单信息：" :visible.sync="submitDialogVisible" width="500px">
      <div class="submitDialogText">
        <p>
          <span>表单名称：</span>
          {{form.name}}
        </p>
        <p>
          <span>日期时间：</span>
          {{form.dateTime}}
        </p>
        <p>
          <span>品牌：</span>
          {{getBrand}}
        </p>
        <p>
          <span>城市：</span>
          {{getCity}}
        </p>
        <p>
          <span>选择开关：</span>
          {{form.switch?'开':'关'}}
        </p>
        <p>
          <span>产品类型：</span>
          {{getProduct}}
        </p>
        <p>
          <span>国家：</span>
          {{getCountry}}
        </p>
        <p>
          <span>文本框：</span>
          {{form.text}}
        </p>
      </div>

      <div class="base-form-dialog-btn">
        <el-button @click="submitDialogVisible = false">取 消</el-button>
        <el-button @click="submitConfirm" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'BaseForm',

    data() {
      return {
        form: {
          name: "",
          dateTime: "",
          brand: "",
          city: [],
          switch: false,
          product: ["phone", "computer"],
          country: "China",
          text: ""
        },

        brandList: [{
            name: "华为",
            value: "huaWei"
          },
          {
            name: "小米",
            value: "xiaoMi"
          },
          {
            name: "苹果",
            value: "apple"
          }
        ],

        cityList: [{
            value: "zheJiang",
            label: "浙江",
            children: [{
                value: "hangZhou",
                label: "杭州",
                children: [{
                    value: "yuHang",
                    label: "余杭"
                  },
                  {
                    value: "binJiang",
                    label: "滨江"
                  }
                ]
              },
              {
                value: "huZhou",
                label: "湖州",
                children: [{
                    value: "changXing",
                    label: "长兴"
                  },
                  {
                    value: "wuXing",
                    label: "吴兴"
                  }
                ]
              }
            ]
          },
          {
            value: "heNan",
            label: "河南",
            children: [{
                value: "xingYang",
                label: "信阳",
                children: [{
                    value: "shangCheng",
                    label: "商城"
                  },
                  {
                    value: "huangChuan",
                    label: "潢川"
                  }
                ]
              },
              {
                value: "zhengZhou",
                label: "郑州",
                children: [{
                    value: "zhongMou",
                    label: "中牟"
                  },
                  {
                    value: "dengFeng",
                    label: "登封"
                  }
                ]
              }
            ]
          }
        ],

        productList: [{
            name: "手机",
            value: "phone"
          },
          {
            name: "电脑",
            value: "computer"
          },
          {
            name: "平板电脑",
            value: "pad"
          }
        ],

        countryList: [{
            name: "中国",
            value: "China"
          },
          {
            name: "美国",
            value: "America"
          },
          {
            name: "欧盟",
            value: "EU"
          }
        ],

        submitDialogVisible: false
      };
    },

    computed: {
      getBrand() {
        for (let i = 0; i < this.brandList.length; i++) {
          if (this.brandList[i].value === this.form.brand) {
            return this.brandList[i].name;
          }
        }
      },

      getCity() {
        let city = "",
          currentCityList = this.cityList;
        for (let i = 0; i < this.form.city.length; i++) {
          for (let j = 0; j < currentCityList.length; j++) {
            if (this.form.city[i] === currentCityList[j].value) {
              city += currentCityList[j].label + " ";
              currentCityList = currentCityList[j].children;
              break;
            }
          }
        }
        return city;
      },

      getProduct() {
        let product = "";
        for (let i = 0; i < this.form.product.length; i++) {
          for (let j = 0; j < this.productList.length; j++) {
            if (this.form.product[i] === this.productList[j].value) {
              product += this.productList[j].name + " ";
              break;
            }
          }
        }
        return product;
      },

      getCountry() {
        for (let i = 0; i < this.countryList.length; i++) {
          if (this.countryList[i].value === this.form.country) {
            return this.countryList[i].name;
          }
        }
      }
    },

    methods: {
      submitConfirm() {
        this.$message({
          message: "表单提交成功！",
          type: "success"
        });
      }
    }
  };
</script>

<style>
  .submitDialogText {
    margin: -25px 0 15px 0;
  }

  .submitDialogText>p {
    margin: 5px 0 5px 0;
  }

  .submitDialogText>p>span {
    font-size: 16px;
    font-weight: bold;
  }

  .base-form-dialog-btn {
    display: flex;
    justify-content: flex-end;
  }
</style>