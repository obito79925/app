<template>
  <div>
    <div class="featureRecommendationWrapper" :class="{ contentShow: isContentShow }">
      <div class="title">
        <div class="titleLeft">
          <span>功能推荐</span>
          <div class="btnRefresh" @click="listRefresh">
            <img src="../assets/refresh.png" alt="refresh" />
            <span>换一批</span>
          </div>
        </div>
        <div class="titleRight" @click="closeRecommend">
          <img src="../assets/close.png" alt="close" />
        </div>
      </div>
      <div class="featureListWrapper">
        <div class="featureList" v-for="item in featureListShow" :key="item.id">
          <div class="listImg">
            <img :src="item.url" alt="img" />
          </div>
          <div class="listContent">
            <span>{{ item.mainTitle }}</span>
            <span>{{ item.subTitle }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomRecommendation" >
      <span @click="openRecommend">功能推荐</span>
    </div>
    <file-list></file-list>
  </div>
</template>
<script lang="ts">
import FileList from '@/components/FileList.vue'
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  components: {
    FileList
  },
  setup () {
    const featureList = ref<any>([])
    const featureListShow = ref<any>([])
    const startNum = ref<number>(0)
    const isClose = ref<boolean>(true)
    const isContentShow = ref<boolean>(false)
    const closeRecommend = () => {
      isClose.value = false
      isContentShow.value = true
    }
    const openRecommend = () => {
      isClose.value = !isClose.value
      isContentShow.value = !isContentShow.value
    }
    const listRefresh = () => {
      startNum.value = startNum.value + 4
      if (startNum.value >= featureList.value.length) {
        startNum.value = 0
        featureListShow.value = featureList.value.slice(startNum.value, startNum.value + 4)
      } else {
        featureListShow.value = featureList.value.slice(startNum.value, startNum.value + 4)
      }
      console.log(featureListShow)
    }
    onMounted(() => {
      fetch('http://drive.kdocs.cn/api/v1/file/list')
        .then(res => {
          return res.json()
        })
        .then(res => {
          featureList.value.push(...res.data)
          listRefresh()
        })
    })
    return {
      featureList,
      featureListShow,
      startNum,
      isClose,
      isContentShow,
      closeRecommend,
      openRecommend,
      listRefresh
    }
  }
})
</script>
<style lang="less">
.featureRecommendationWrapper {
  width: 1605px;
  height: 172px;
  margin: 50px 5px 0 235px;
  padding: 0 20px;
  transition: all 0.3s;
  overflow: hidden;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #767c85;
    height: 22px;
    line-height: 22px;
  }
  .titleLeft {
    display: flex;
    flex-direction: row;
    .btnRefresh {
      display: flex;
      align-items: center;
      margin-left: 15px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      img {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
    .btnRefresh:hover {
      color: #058ff7;
      img{
        transform: translateX(-100%);
        filter: drop-shadow(16px 0px 0 #058ff7);
      }
    }
  }
  .titleRight {
    img {
      width: 16px;
      height: 16px;
    }
    cursor: pointer;
  }
  .featureListWrapper {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    .featureList {
      width: 204px;
      height: 86px;
      display: inline-flex;
      flex-direction: row;
      border: 1px solid #e7e9eb;
      border-radius: 2px;
      cursor: pointer;
      overflow: hidden;
      align-items: center;
      margin-right: 15px;
    }
    .featureList:hover {
      transform: scale(1.03);
    }
    .listImg {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 15px 0 20px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .listContent {
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        font-size: 14px;
        color: #3d4757;
        line-height: 20px;
      }
      span:nth-child(2) {
        font-size: 10px;
        color: #949aae;
        line-height: 15px;
      }
    }
  }
}
.contentShow {
  width: 1605px;
  height: 0px;
}
.bottomRecommendation {
  width: 1605px;
  height: 30px;
  margin: 15px 5px 0 235px;
  padding: 0 20px;
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #058ff7;
  }
}
</style>
