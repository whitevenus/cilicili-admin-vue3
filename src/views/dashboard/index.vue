<script setup lang="ts">
import InfoCard from '@/components/InfoCard.vue'

const infoCards = [
  {
    icon: 'user',
    title: '新增用户',
    color: '#40c9c6',
    number: 195,
    unit: '位'
  },
  {
    icon: 'chat',
    title: '今日消息',
    color: '#36a3f7',
    number: 99,
    unit: '个'
  },
  {
    icon: 'money-circle',
    title: '营业额',
    color: '#f4516c',
    number: 365454,
    unit: '元'
  },
  {
    icon: 'cart',
    title: '订单数',
    color: '#34bfa3',
    number: 195,
    unit: '个'
  }
]

const option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['w', 'd', 'b']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'w',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'd',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'b',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
}

const option2 = {
  title: {
    text: '基本雷达图'
  },
  legend: {
    data: ['理想分布', '实际分布']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '技术能力', max: 10 },
      { name: '沟通能力', max: 10 },
      { name: '管理能力', max: 10 },
      { name: '产品思维', max: 10 },
      { name: '实战经验', max: 10 }
    ]
  },
  series: [
    {
      name: '理想 vs 实际',
      type: 'radar',
      data: [
        {
          value: [2, 3, 5, 7, 3, 8],
          name: '实际分布'
        },
        {
          value: [10, 10, 10, 10, 10, 10],
          name: '理想分布'
        }
      ]
    }
  ]
}
</script>

<template>
  <t-row :gutter="[16, 16]">
    <t-col v-for="infoCard in infoCards" :key="infoCard.title" :span="3">
      <info-card :info="infoCard"> </info-card>
    </t-col>

    <t-col :span="8">
      <t-card :bordered="false">
        <div style="height: 500px">
          <ECharts ref="chart" :option="option" />
        </div>
      </t-card>
    </t-col>
    <t-col :span="4">
      <t-card :bordered="false">
        <div style="height: 500px">
          <ECharts ref="chart" :option="option2" />
        </div>
      </t-card>
    </t-col>
  </t-row>
</template>

<style scoped></style>
