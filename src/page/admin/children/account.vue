 <template>
    <div>
       <div class="detail-title">
            <span>account</span>
       </div>
       <div class="detail-wrap" v-for="item in items">
            <div class="detail-wrap-div">
                <span class="detail-wrap-div-s1"><span class="spanwi">Account Name：</span><span class="detail-wrap-div-s2">{{item.username}}</span></span> 
                <el-button type="primary" @click="deletes(item)">Delete</el-button>
            </div>
            <div class="detail-wrap-div">
                <span class="detail-wrap-div-s1"><span class="spanwi">Account role：</span><span class="userstate" :class="{vip:vipoff}">{{item.role | role}}</span></span> 
            </div>
       </div>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    export default {
      data(){
            return{
                userrole:'',
                items:[],
            }
        },
        mounted(){
            this.getFun();
        },
        filters:{
            role(val){
                if(val == 'ROLE_USER'){
                    val = 'buyer'
                    return val 
                }else if(val == 'ROLE_MERCHANT'){
                    val = 'seller'
                    return val 
                }else if(val == 'ROLE_ADMIN'){
                    val = 'admin'
                    return val 
                }
            }
        },
        methods: {
            deletes(item){
                this.$axios.delete('../delUser/'+item.username+'')
                .then((response) => {
                    console.log(response)
                    this.$message({
                       message:'Delete success',
                       type: 'success',
                    });
                    this.getFun();
                })
                .catch(function (response) {
                  console.log(response);
                })      
            },
            getFun(){
                this.$axios.get('../user')
                .then((response) => {
                    console.log(response)
                    if(response.data.details == 0){
                        this.nocontent = true;
                        this.items = [];
                        return;
                    }else{
                        this.nocontent = false;
                        this.items = response.data.details; 
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
.detail-title
    width:100%
    height:43px
    border-bottom:1px solid #ddd
    font-size:14px
    color:#555
    span
        display:inline-block
        text-align:center
        border-bottom:2px solid #ea4335
        line-height:40px
.detail-wrap
    width:100%
    padding:13px
    border-left:1px solid #eee
    margin-top:10px
    box-shadow:1px 2px 3px #ccc
    margin-bottom:20px
    .detail-wrap-div
        font-size:15px
        padding:14px 0px
        border-bottom:1px dashed #ddd
        .detail-wrap-div-s1
            color:#444
            display:inline-block
            .spanwi
                text-align:right
                display:inline-block
        .detail-wrap-div-s2
            color:#666
        .userstate
            color:#14cdd7
            display:inline-block
            width:60px
        button
            padding: 8px 12px
            margin-left: 40px
</style>
