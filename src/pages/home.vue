<template>
   <div class="homePage" ref="home" @scroll="pageScroll">
      
      <div class="headerBox" :style="{backgroundColor:`rgba(255,255,255, ${opcity})`}">
         <my-header :opcity="opcity"></my-header>
      </div>
      <div class="page1">
         <div class="layout"></div>
         <div class="content">
            <div class="slogan">
               <p class="bigTxt">每日友米</p>
               <p class="smallTxt">为商户提供最精准的流量和曝光率</p>
               <p class="smallTxt">为用户提供最便捷的赚钱平台</p>
            </div>

            <div class="codeBox flex justify-center">
               <div class="andrDown">
                  <div id="andrCode" ref="andrCode"></div>
                  <div class="btn">安卓下载</div>
               </div>
               <div class="iosDown">
                  <div id="iosCode" ref="iosCode"></div>
                  <div class="btn">IOS下载</div>
               </div>
               <div class="miniProgram">
                  <div id="qrcode" ref="qrcode"></div>
                  <div class="btn">微信小程序</div>
               </div>
            </div>
         </div>
      </div>

      <div class="page2">
         <div class="pageWrap">
            <p class="bigTxt">我们的优势</p>
            <div class="textBox flex">
               <div class="left flex1">
                  <p class="tit">对于广告商:</p>
                  <div class="textCon">
                     1、广告商在发布广告时可以选择兴趣,系统便会将广告推给选择了相同兴趣的用户,让广告 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更精准。<br/><br/>
                     2、广告商发布的问答广告用户浏览过后不会消失,即使有效条数消耗完后,系统也不会立刻 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下架,而是到次日系统跟新时下架,
                        更高的增加广告的曝光量<br/><br/>
                     3、广告商可以根据自己的需求发布区域性的广告,例如饭店做活动,可以发布附近广告;服装 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店清仓甩卖可以发布同城广告等,价格更便宜且效果显著 <br/><br/>
                     4、广告商可以发布好运,用少量的价格获得全平台的曝光
                  </div>
               </div>
               <div class="right flex1">
                  <p class="tit">对于用户:</p>
                  <div class="textCon">
                     1、用户浏览广告既方便又快捷,只需要3-5秒钟就可以轻松浏览一个广告并获得收益,可谓轻 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;松有米。<br/><br/>
                     2、用户通过小程序分享好友,好友浏览广告便会返利给用户,即使用户不浏览广告,用户也可 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以得到不菲的返利,可谓坐享其成<br/><br/>
                     3、用户每邀请一个好友便有一次抽奖机会,奖金最高500,可谓惊喜多多 <br/><br/>
                     4、用户每日签到,连续7天最高可获得奖励100,可谓惊喜连连
                  </div>
               </div>
            </div>
            <div class="balls flex">
               <div class="left flex1 flex">
                  <div class="flow flex1">
                     <div class="ball">
                        <i class="iconfont icon-flow"></i>
                     </div>
                     <p class="title">精准流量</p>
                     <p class="desc">根据兴趣匹配用户</p>
                     <p class="desc">把您的产品推给有需要的人</p>
                  </div>
                  <div class="cdType flex1">
                     <div class="ball">
                        <i class="iconfont icon-adType"></i>
                     </div>
                     <p class="title">多样的广告形式</p>
                     <p class="desc">包含开屏广告,轮播位广告,推荐位广告,问答广告,好运广告等</p>
                  </div>
                  
               </div>
               <div class="right flex1 flex">
                  <div class="highInto flex1">
                     <div class="ball">
                        <i class="iconfont icon-into"></i>
                     </div>
                     <p class="title">高额的收入</p>
                     <p class="desc">海量的广告收益及高额的好友返利</p>
                     <p class="desc">邀请好友还赠送高额奖励抽奖次数</p>
                  </div>
                  <div class="operation flex1">
                     <div class="ball">
                        <i class="iconfont icon-caozuo"></i>
                     </div>
                     <p class="title">快捷的操作</p>
                     <p class="desc">您只需要3-5秒就可以轻松完成一个任务并获得收益</p>
                  </div>
                  
               </div>
            </div>
         </div>
      </div>

      <div class="page3">
         <p class="tit">丰富的广告样式</p>
         <div class="content">
            <div class="tabs flex all-center">
               <div class="tab" :class="{active: index == tabIndex}" 
                     v-for="(item,index) in tabs" :key="index" 
                     @click="tabClick(item,index)">
                     {{item.title}}
               </div>
            </div>
            <div class="con">
               <div class="bg">
                  <img :src="currentImg" alt="">
               </div>
            </div>
         </div>
      </div>
      <p class="foot flex all-center">Copyright © 2020 深圳市篱笆科技有限公司 粤ICP备20026264号-1备案号</p>
   </div>
</template>

<script type="text/ecmascript-6">
import QRCode from 'qrcodejs2'

import myHeader from "@/components/myHeader"
export default {
   data() {
      return {
         opcity: 0.5,
         tabIndex: 0,
         tabs:[
            {title: '开屏广告',imgUrl:require('../assets/phoneAD.png')},
            {title: '插屏广告',imgUrl:require('../assets/phoneDialog.png')},
            {title: '轮播广告',imgUrl:require('../assets/phoneSwiper.png')},
            {title: '推荐广告',imgUrl:require('../assets/phoneRecommend.png')},
            {title: '问答广告',imgUrl:require('../assets/phoneQS.png')},
            {title: '好运广告',imgUrl:require('../assets/phoneGL.png')}
         ],
         currentImg: require('../assets/phoneAD.png')
      }
   },
   mounted () {
     this.creatQrCode(this.$refs.andrCode)
     this.creatQrCode(this.$refs.iosCode)
     this.creatQrCode(this.$refs.qrcode)
   },
   methods: {
      pageScroll(event){
         if(event.target.scrollTop/80 > 1){
            this.opcity = 1
         }
         this.opcity = 0.5+event.target.scrollTop/1000
      },
      tabClick(item,index){
         this.currentImg = item.imgUrl
         this.tabIndex = index
      },
      creatQrCode(el) {
         var qrcode = new QRCode(el, {
            text: 'https://www.qtshe.com',
            width: 150,
            height: 150,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
         })
      },
      // handleClick(){}
   },
   components: {
      myHeader
   }
}
</script>

<style lang="scss" scoped>
.homePage{
   height: 100%;
   overflow: scroll;
   .headerBox{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      z-index: 99;
   }
   .page1{
      height: 100%;
      overflow: hidden;
      background: url('../assets/timg.jpeg') no-repeat center center;
      background-size: cover;
      position: relative;
      .layout{
         position: absolute;
         left: 0;
         right: 0;
         top: 0;
         bottom: 0;
         z-index: 1;
         background-color: rgba(0,0,0, .3);
      }
      .content{
         position: absolute;
         left: 0;
         right: 0;
         top: 0;
         bottom: 0;
         z-index: 9;
         .slogan{
            margin-top: 160px;
            >p{
               text-align: center;
            }
            .bigTxt{
               font-weight: 600;
               font-size: 68px;
               color: #fff;
            }
            .smallTxt{
               font-size: 24px;
               color: #fff;
               margin-top: 40px;
               &:last-child{
                  margin-top: 20px;
               }
            }
         }
         .codeBox{
            margin-top: 120px;
            .iosDown{
               margin: 0 80px;
            }
            .andrDown, .iosDown, .miniProgram{
               width: 150px;
               .tit{
                  text-align: center;
               }
               .btn{
                  width: 120px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  margin: 30px auto;
                  color: rgba(248, 63, 38, 1);
                  border-radius: 20px;
                  background-color: #fff;
               }
            }
         }
      }
   }
   .page2{
      overflow: hidden;
      background-color: #f2f4f8;
      .pageWrap{
         width: 1300px;
         margin: 0 auto;
         .bigTxt{
            color: #666;
            font-size: 58px;
            text-align: center;
            font-weight: 200;
            line-height: 150px;
            margin-top: 50px;
         }
         .textBox{
            margin-bottom: 70px;
            >div{
               .textCon{
                  line-height: 24px;
               }
            }
            .tit{
               color: #333;
               font-size: 32px;
               line-height: 80px;
            }
            .left{
               margin-right: 20px;
            }
         }
         .balls{
            color:#333;
            margin-bottom: 60px;
            .left .cdType{
               .iconfont{
                  font-size: 42px;
               }
            }
            .right .operation{
               .iconfont{
                  font-size: 42px;
               }
            }
            >div{
               >div{
                  text-align: center;
                  .ball{
                     width: 140px;
                     height: 140px;
                     margin: 0 auto;
                     text-align: center;
                     line-height: 140px;
                     background-color: #D4BA88;
                     border-radius: 50%;
                     .iconfont{
                        color: #fff;
                        font-size: 36px;
                     }
                  }
                  .title{
                     font-size: 32px;
                     line-height: 80px;
                     margin-top: 20px;
                  }
                  .desc{
                     text-align: center;
                     line-height: 24px;
                  }
               }
               
            }
         }
      }
      
   }
   .page3{
      // width: 1300px;
      
      .tit{
         color: #666;
         font-size: 58px;
         text-align: center;
         font-weight: 200;
         line-height: 150px;
         margin-top: 50px;
      }
      .content{
         .tabs{
            border-bottom: 1px solid #eaeaea;
            .tab{
               color: #666;
               margin: 0 40px;
               line-height: 40px;
               cursor: pointer;
               &.active{
                  color: #D4BA88;
                  border-bottom: 2px solid #D4BA88;
               }
            }
         }
         .con{
            width: 1300px;
            margin: 0 auto;
            .bg{
               width: 279px;
               height: 500px;
               margin: 60px auto 80px;
               img{
                  width: 100%;
                  height: 100%;
               }
            }
         }
      }
   }
}
</style>
