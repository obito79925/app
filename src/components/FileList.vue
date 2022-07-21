<template>
  <div>
    <div class="fileList" v-for="(item, index) in fileList" :key="index">
      <div class="fileListContent">
        <div class="fileListInformation">
          <img
            :src="item.roaming.imgUrl"
            alt="fileListImg"
          />
          <div class="fileListTitle">
            <span class="topContent">{{ item.roaming.name }}</span>
            <div class="subContent">
              <span class="fileCtime">{{ item.roaming.file_ctime }}</span>
              <div class="fileSrcWrapper">
                <img src="../assets/share.png" alt="share" />
                <span class="fileSrc">{{ item.roaming.file_src }}</span>
              </div>
            </div>
          </div>
        </div>
        <img src="../assets/omit.png" alt="omit" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import timeFormat from '@/utils/timeFormat'
import { defineComponent, onMounted, reactive } from 'vue'
export default defineComponent({
  setup () {
    const fileList = reactive<any>([])
    onMounted(() => {
      fetch('http://drive.kdocs.cn/api/v5/roaming/api/v1/recommended/list')
        .then(res => {
          return res.json()
        })
        .then(res => {
          console.log(res.list)
          fileList.push(...res.list)
          fileList.forEach((item: any) => {
            item.roaming.file_ctime = timeFormat(item.roaming.file_ctime)
          })
        })
    })
    return {
      fileList
    }
  }
})
</script>
<style lang="less">
.fileList {
  display: flex;
  justify-content: center;
  width: 1605px;
  height: 65px;
  margin: 0px 5px 0 235px;
  padding: 0px 20px;
  border-top: 1px solid #e7e9eb;
  &:hover {
    background-color: #f2f5fa;
  }
  img {
    width: 20px;
    height: 20px;
  }
  .fileListContent{
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between
  }
}
.fileListInformation {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
  .fileListTitle {
    display: flex;
    flex-direction: column;
    padding: 5px 0px;
    .topContent {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #3d4757;
      cursor: pointer;
      &:hover {
        color: #058ff7;
      }
    }
    .subContent {
      display: flex;
      flex-direction: row;
      margin-top: 2px;
      font-size: 12px;
      color: #949aae;
      cursor: pointer;
      .fileCtime {
        margin-right: 5px;
      }
      .fileSrcWrapper {
        display: flex;
        flex-direction: row;
        padding: 1px 2px;
        background-color: #eef0f2;
        font-weight: 400;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          width: 14px;
          height: 14px;
          margin-right: 3px;
        }
        &:hover {
          background-color: #e0e4e8;
        }
      }
    }
  }
}
</style>
