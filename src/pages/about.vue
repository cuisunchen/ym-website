<template>
   <div class="contactPage">
      <div class="banner flex all-center">
         <div class="tit">
            <p class="ch">关于我们</p>
            <p class="en">About Us</p>
         </div>
      </div>
      <div class="contactMain">
         <div class="content flex">
            <div class="img">
               <img src="../assets/us_img2.jpg" alt="">
            </div>
            <div class="text flex1 flex all-center">
               <p>每日友米可为企业、政府和非营利性组织等提供一站式的网站服务。无论是创建个人网站、企业门户网站、还是电子商务网站，腾讯云都可根据您的需求提供对应的网站服务，解决您在建站及运营过程中的所有问题，同时保证网站的安全性和可用性，有效地降低网站开发、运营以及运维方面成本。</p>
            </div>
         </div>

         <div class="content flex">
            <div class="text flex1 flex-column justify-center">
               <p> 联系我们 </p>
               <p class="tel">电话: 13325674876</p>
               <p class="wechat">微信: youzhuan009</p>
               <p class="email">邮箱: youzhuan009@163.com</p>
            </div>
            <div class="img">
               <img src="../assets/us_img1.jpg" alt="">
            </div>
         </div>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   data() {
      return {

      }
   },
   methods: {

   },
   components: {

   }
}
</script>

<style lang="scss" scoped>
.contactPage{
   width: 100%;
   .banner{
      color: #606060;
      height: 320px;
      line-height: 50px;
      text-align: center;
      background: url('../assets/nav_img4.jpg') no-repeat;
      background-size: cover;
      .ch{
         font-size: 36px;
         letter-spacing: 5px;
      }
      .en{
         font-size: 20px;
         letter-spacing: 3px;
      }
   }
   .contactMain{
      .content{
         width: 1200px;
         margin: 60px auto;
         .img{
            width: 500px;
            height: 500px;
            img{
               width: 100%;
               height: 100%
            }
         }
         .text{
            p{
               padding: 0 50px;
               font-size: 20px;
               line-height: 40px;
            }
         }
      }
   }
   
}
</style>
