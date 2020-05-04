<template>
   <div class="feedbackWrap flex">
      <div class="left flex-column justify-center">
         <p class="tit">对于广益来说</p>
         <p class="con">我们目的是为了让用户有更高的收益,您有任何好的意见,都可以在此处反馈给我们,请您畅快直言!</p>
      </div>
      <div class="right flex1 flex-column justify-center flex-end">
         <div class="box flex-column">
            <div class="textInput flex1 flex">
               <el-input class="flex1"
                  type="textarea" clearable resize="none"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入您的问题"
                  v-model="form.textarea">
               </el-input>
            </div>
            <div class="imgBox">
               <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.contentImgUrl" :src="form.contentImgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
            </div>
         </div>
         <p class="btn">
            <el-button type="primary" round>提交</el-button>
         </p>
      </div>
   </div>
</template>

<script type="text/ecmascript-6">
export default {
   data() {
      return {
         form:{
            textarea:'',
            contentImgUrl:''
         }
         
      }
   },
   methods: {
      handleAvatarSuccess(res, file) {
        this.form.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
   },
   components: {

   }
}
</script>

<style lang="scss" scoped>

.feedbackWrap{
   width: 1300px;
   min-height:calc(100% - 130px);
   // max-width: 1800px;
   // min-width: 1080px;
   margin: 0 auto;
   --shadow-color-light: #C3913C;
   --shadow-color: #f3f3f3;
   .left{
      width: 300px;
      .tit{
         color: #333;
         font-size: 40px;
         line-height: 50px;
         animation: neon 3s infinite;
      }
      @keyframes neon {
         0%{
            text-shadow: -1px -1px 1px var(--shadow-color-light), 
                        -1px 1px 1px var(--shadow-color-light), 
                        1px -1px 1px var(--shadow-color-light), 
                        1px 1px 1px var(--shadow-color-light), 
                        0 0 3px var(--shadow-color-light), 
                        0 0 10px var(--shadow-color-light), 
                        0 0 20px var(--shadow-color-light), 
                        0 0 30px var(--shadow-color), 
                        0 0 40px var(--shadow-color), 
                        0 0 50px var(--shadow-color), 
                        0 0 70px var(--shadow-color), 
                        0 0 100px var(--shadow-color), 
                        0 0 200px var(--shadow-color);
         }
         50%{
            text-shadow: -1px -1px 1px var(--shadow-color-light), 
                        -1px 1px 1px var(--shadow-color-light), 
                        1px -1px 1px var(--shadow-color-light), 
                        1px 1px 1px var(--shadow-color-light), 
                        0 0 5px var(--shadow-color-light), 
                        0 0 15px var(--shadow-color-light), 
                        0 0 25px var(--shadow-color-light), 
                        0 0 40px var(--shadow-color), 
                        0 0 50px var(--shadow-color), 
                        0 0 60px var(--shadow-color), 
                        0 0 80px var(--shadow-color), 
                        0 0 110px var(--shadow-color), 
                        0 0 210px var(--shadow-color);
         }
         100%{
            text-shadow: -1px -1px 1px var(--shadow-color-light), 
                        -1px 1px 1px var(--shadow-color-light), 
                        1px -1px 1px var(--shadow-color-light), 
                        1px 1px 1px var(--shadow-color-light), 
                        0 0 3px var(--shadow-color-light), 
                        0 0 10px var(--shadow-color-light), 
                        0 0 20px var(--shadow-color-light), 
                        0 0 30px var(--shadow-color), 
                        0 0 40px var(--shadow-color), 
                        0 0 50px var(--shadow-color), 
                        0 0 70px var(--shadow-color), 
                        0 0 100px var(--shadow-color), 
                        0 0 200px var(--shadow-color);
         }
      }
      .con{
         color: #666;
         line-height: 26px;
         margin-top: 30px;
      }
   }
   .right{
      position: relative;
      padding: 40px 0 40px 40px;
      .box{
         height: 80%;
         border-radius: 10px;
         border: 12px solid #999;
         .textInput{
            .el-textarea{
               padding: 10px 0;
               /deep/ .el-textarea__inner{
                  height: 100%!important;
                  border: none!important;
               }
            }
         }
         .imgBox{
            padding: 10px 20px;
            /deep/ .el-upload{
               border: 1px dashed #d9d9d9;
               border-radius: 6px;
               cursor: pointer;
               position: relative;
               overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
               border-color: #409EFF;
            }
            .avatar-uploader-icon {
               font-size: 28px;
               color: #8c939d;
               width: 98px;
               height: 98px;
               line-height: 98px;
               text-align: center;
            }
            .avatar {
               width: 98px;
               height: 98px;
               display: block;
            }
            .contentUrl{
               line-height: 20px;
            }
         }
      }
      .btn{
         position: absolute;
         left: 40px;
         right: 40px;
         bottom: 20px;
         text-align: right;
      }
   }
}
</style>
