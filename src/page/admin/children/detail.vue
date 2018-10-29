 <template>
    <div>
       <div class="detail-title">
            <span>My account</span>
       </div>
       <div class="detail-wrap">
            <div class="detail-wrap-div">
                <span class="detail-wrap-div-s1"><span class="spanwi">Account Name：</span><span class="detail-wrap-div-s2">{{username}}</span></span>
            </div>
            <div class="detail-wrap-div">
                <span class="detail-wrap-div-s1"><span class="spanwi">Account role：</span><span class="userstate" :class="{vip:vipoff}">{{userrole}}</span></span> 
            </div>
            </div>
       </div>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    import Utils from '../../../store/utils.js'
    export default {
      data(){
            return{
                username:'',
                userrole:'',
            }
        },
        mounted(){
            this.username = Utils.decrypt(this.$route.query.user);
            this.userrole = this.$route.query.role;
            if(this.userrole == 'ROLE_USER'){
                this.userrole = 'buyer'
            }else if(this.userrole == 'ROLE_MERCHANT'){
                this.userrole = 'seller'
            }else if(this.userrole == 'ROLE_ADMIN'){
                this.userrole = 'admin'
            }
        },
        methods: {
            
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
</style>
