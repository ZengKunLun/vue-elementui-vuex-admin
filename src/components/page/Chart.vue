<template>
  <div class="public-warp">
    <el-row :gutter="20">
      <el-col :span="12">
        <p style="font-size:24px;">折线图</p>
        <canvas id="lineChart" style="margin:0 0 30px 0"></canvas>

        <p style="font-size:24px;">柱状图</p>
        <canvas id="barChart" style="margin:30px 0 0 0"></canvas>
      </el-col>

      <el-col :span="12">
        <p style="font-size:24px;">极地图</p>
        <canvas id="polarAreaChart" style="margin:0 0 30px 0"></canvas>

        <p style="font-size:24px;">圈图</p>
        <canvas id="doughnutChart" style="margin:30px 0 0 0"></canvas>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "Chart",

  data() {
    return {};
  },

  mounted() {
    let lineChart = new Chart(document.getElementById("lineChart"), {
      type: "line",

      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],

        datasets: [
          {
            label: "line1",
            backgroundColor: "#54FF9F",
            borderColor: "#54FF9F",
            borderWidth: 2,
            pointStyle: "circle",
            data: [65, 59, 0, 81, 56, 10, 40, 22, 32, 54, 10, 30],
            fill: "false"
          },
          {
            label: "line2",
            backgroundColor: "#1E90FF",
            borderColor: "#1E90FF",
            borderWidth: 2,
            pointStyle: "circle",
            data: [60, 50, 10, 80, 50, 20, 40, 20, 30, 50, 20, 30],
            fill: "false"
          }
        ]
      },

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    let barChart = new Chart(document.getElementById("barChart"), {
      type: "bar",

      data: {
        labels: ["January", "February", "March", "April"],

        datasets: [
          {
            label: "bar1",
            backgroundColor: "rgba(225,10,10,0.3)",
            borderColor: "rgba(225,103,110,1)",
            borderWidth: 1,
            data: [65, 59, 30, 81]
          },
          {
            label: "bar2",
            backgroundColor: "#FF0000",
            borderColor: "#FF0000",
            borderWidth: 1,
            data: [56, 50, 40, 22]
          },
          {
            label: "bar3",
            backgroundColor: "#FFC125",
            borderColor: "#FFC125",
            borderWidth: 1,
            data: [32, 54, 30, 30]
          }
        ]
      },

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    let doughnutChart = new Chart(document.getElementById("doughnutChart"), {
      type: "doughnut",

      data: {
        labels: ["January", "February", "March", "April"],

        datasets: [
          {
            backgroundColor: ["#FF0000", "#00BFFF", "#FFFF00", "#90EE90"],
            borderColor: "#1C1C1C",
            borderWidth: 1,
            data: [65, 59, 30, 81]
          },
          {
            backgroundColor: ["#FF0000", "#00BFFF", "#FFFF00", "#90EE90"],
            borderColor: "#1C1C1C",
            borderWidth: 1,
            data: [56, 50, 40, 22]
          },
          {
            backgroundColor: ["#FF0000", "#00BFFF", "#FFFF00", "#90EE90"],
            borderColor: "#1C1C1C",
            borderWidth: 1,
            data: [32, 54, 30, 30]
          }
        ]
      },
    });

    let polarAreaChart = new Chart(document.getElementById("polarAreaChart"), {
      type: "polarArea",

      data: {
        labels: ["January", "February", "March", "April"],

        datasets: [
          {
            backgroundColor: ["#FF0000", "#00BFFF", "#FFFF00", "#90EE90"],
            borderColor: "#1C1C1C",
            borderWidth: 1,
            data: [65, 59, 30, 81]
          }
        ]
      },
    });
  }
};
</script>