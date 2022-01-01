<template>
  <div>
    <van-cell
    class="artcle-item"
    :to="{
      name:'article',
      params:{
        articleId:artcles.art_id
      }
    }">
    <div slot="title" class="title van-multi-ellipsis--l3">{{artcles.title}}</div>
    <div slot="label">
      <div class="cover-wrap"
        v-if="artcles.cover.type === 3"
      >
        <div
        v-for="(img,index) in artcles.cover.images"
        :key="index"
        class="cover-wrap-item">
          <van-image
            class="cover-item"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
        <div class="label-wrap">
        <span>{{artcles.aut_name}}</span>
        <span>{{artcles.comm_count}}评论</span>
        <span>{{artcles.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 默认插槽 的名字叫 default 可以省略 -->
    <div slot="default"
    v-if="artcles.cover.type === 1"
    >
      <van-image
        class="rigth-cover"
        fit="cover"
        :src="artcles.cover.images[0]"
      />
    </div>
    </van-cell>
  </div>
</template>

<script>
import '@/utils/day.js'
export default {
  name: 'ArtcleItem',
  props: {
    artcles: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .title{
    font-size: 16px;
    color: #3a3a3a;
}
/deep/ .van-cell__value{
  flex: unset;
  width: 116px;
  height: 73px;
  margin-left:12px ;
}
.rigth-cover{
  width: 116px;
  height: 73px;
}
.cover-wrap{
  display:flex;
  padding: 15px 0 ;
    .cover-wrap-item{
      flex: 1;
      height: 73px;
      &:not(:last-child){
        padding-right:4px ;
      }
      .cover-item{
        width: 100%;
        height: 100%;
    }
}
}
.label-wrap{
  font-size: 11px;
  color: #b4b4b4;
}
.label-wrap span{
  margin-right:12px;
}

</style>
