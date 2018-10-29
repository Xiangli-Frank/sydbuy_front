 <template>
    <div>
      <div class="ts-detail-title">
        <!--标题名-->
        <span>Commodity Shelves</span>
      </div>


      <div class="shelves-wrap clearFloat">
        <!--Commodity name 隐性框-->
        <span  class="ts-detail-span">Commodity Id:</span><el-input v-model="id" placeholder="Commodity Id"></el-input>
      </div>


      <div class="shelves-wrap clearFloat">
        <span  class="ts-detail-span">Commodity name:</span><el-input v-model="name" placeholder="Commodity name"></el-input>
      </div>


      <div class="shelves-wrap clearFloat">
        <span  class="ts-detail-span">Category:</span>
        <!--单项选择框-->
            <el-radio style="float:left" v-model="radio" label="Electronics" border @change="changeRadio">Electronics</el-radio>
            <el-radio style="float:left" v-model="radio" label="Books" border @change="changeRadio">Books</el-radio>
            <el-radio style="float:left" v-model="radio" label="Clothes" border @change="changeRadio">Clothes</el-radio>
            <el-radio style="float:left" v-model="radio" label="Others" border @change="changeRadio">Others</el-radio>
      </div>

       <div class="shelves-wrap clearFloat">
        <span  class="ts-detail-span">Picture:</span>
        <!--<el-upload
                              class="upload-demo"
                              drag
                              action="111"
                              :before-upload="beforeUpload"
                              :on-success="handleSuccess"
                              :on-error="handleError"
                              multiple>
                              <i class="el-icon-upload" style="display: block;"></i>
                              <div class="el-upload__text">Drag the files here，or <em>click upload</em></div>
                              <div class="el-upload__tip" slot="tip" style="margin-top:-20px;">Only upload jpg/png files, and no more than 4MB</div>
                            </el-upload>-->
         <!--文件上传组件-->
        <el-upload
          action="../commodity/upload"
          :on-success="handleSuccess"
          :on-error="handleError"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :disabled="uploadOffon">
          <i class="el-icon-plus" style="vertical-align: super;"></i>
        </el-upload>


         <!-- 嵌套对话框组件-->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>


       </div>
       <div class="shelves-wrap clearFloat">
        <span  class="ts-detail-span">Commodity Introduction:</span><el-input v-model="Introduction" placeholder="Commodity Introduction"></el-input>
       </div>
       <div class="shelves-wrap clearFloat">
        <span  class="ts-detail-span">Price:</span><el-input v-model="price" placeholder="Price"></el-input>
       </div>
       <div class="shelves-wrap clearFloat">
        <span  class="ts-detail-span">Stock:</span><el-input v-model="stock" placeholder="Stock"></el-input>
       </div>
       <div class="button-wrap">
        <el-button type="primary" @click="add">Submit</el-button>
       </div>
    </div>
</template>

<script>
    import { setCookie,getCookie,delCookie } from '../../../store/cookie.js'
    export default {
      data(){
            return{
                uploadOffon:false,
                dialogImageUrl: '',
                dialogVisible: false,
                radio:'bicycle',
                id:'',
                name:'',
                introduction:'',
                price:'',
                stock:'',
                fastdfsUrl:'',
            }
        },
        mounted(){

        },
        methods: {
            handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
              this.dialogImageUrl = file.url;
              this.dialogVisible = true;
            },
            changeRadio(val){
              this.radio = val;
            },
            beforeUpload (file) {
                let fd = new FormData()
                fd.append('file', file)
                this.$axios.post('../commodity/upload', fd)
                .then((response) => {
                    console.log(response)
                    if(response.data.code != 2000){
                        this.$message({
                           message: response.data.msg,
                           type: 'error',
                        });
                        return;
                    }else{
                        this.$message({
                           message: response.data.msg,
                           type: 'success',
                        });
                        this.fastdfsUrl = response.data.details;
                    }
                })
                .catch(function (response) {
                  console.log(response);
                })
                return false
            },
            handleSuccess(response){
              console.log(response)
              if(response.code != 2000){
                  this.$message({
                     message: response.msg,
                     type: 'error',
                  });
                  return;
              }else{
                  this.$message({
                     message: response.msg,
                     type: 'success',
                  });
                  this.fastdfsUrl = response.details;
                  this.uploadOffon = true;
              }
            },
            handleError(){
                this.$message({
                   message: 'Upload failed, please try again.',
                   type: 'error',
                });
            },
            add(){
                if(this.id == ''|| this.name == ''||this.fastdfsUrl == ''||this.introduction==''||this.price ==''||this.stock==''){
                    this.$message({
                       message: 'Please improve information',
                       type: 'warning',
                    });
                    return;
                }
              /*
                          axios.post方法 默认发送数据格式
                          application/json的方式发送的
                          {"name":"david","age":30}

                          axion({
                            url:"地址",
                            method:"post",
                            data:{
                                name:"david",
                                age:30
                            },
                            transformRequest: [function (data) {
                                // Do whatever you want to transform the data
                                let ret = ''
                                for (let it in data) {
                                  // 如果要发送中文 编码
                                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                              }],
                              headers: {
                                'Content-Type':'application/x-www-form-urlencoded'
                              }
                          })

                          发送的数据就是跟表单一样
                          application/x-www-form-urlencoded
                          name=david&age=30
                          */

                this.$axios.post('../commodity/add', {
                "id":this.id,"name":this.name,"username":getCookie('username'),"picture":this.fastdfsUrl,"introduction":this.introduction,"price":this.price,"lave":this.stock,'sell':0,'category':this.radio,
                })
                .then((response) => {
                    console.log(response)
                   if(response.data.code != 2001){
                        this.$message({
                           message: response.data.msg,
                           type: 'error',
                        });
                        return;
                    }else{
                        this.$message({
                           message: response.data.msg,
                           type: 'success',
                        });
                        this.$router.go(0);
                    }
                })
                .catch(function (response) {
                  console.log(response);
                })
            }
        },
        watch: {

        },
        components: {

        },
    }
</script>
  
<style lang="stylus" rel ="stylesheet/stylus">
.ts-detail-title
    width:100%
    height:43px
    border-bottom:1px solid #ddd
    font-size:14px
    margin-bottom:16px
    color:#555
    span
        display:inline-block
        text-align:center
        border-bottom:2px solid #ea4335
        line-height:40px
.shelves-wrap
    width:90%
    margin-top:18px
    .ts-detail-span
        width:190px
        padding-right:16px
        display:inline-block
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        float:left
        font-size:14px
        line-height: 36px
        text-align:right
    .el-input
        float:left
        width:320px
    .upload-demo
        float: left
        width: 320px
.button-wrap
    width:524px
    margin-left:260px
    margin-top:18px
    button
        display:block
</style>
