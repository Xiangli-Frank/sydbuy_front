 <template>
  <div>
        <div class="head clearFloat">
            <div class="head-left">
                <img :src="logo"  height ="52px" @click="$router.push('../shopMall')">
                <i class="el-icon-menu" @click="tigc"></i>
            </div>
           
            <div class="head-right clearFloat">
                <img src="../../images/userhead.png" width="28px"/>
                {{user}}
                <i class="username-arr"></i>
                <div class="user-down">
                  <a @click="logout">Logout</a>
                </div>
            </div>
        </div>
        <div class="leftFixed">
            <ul v-show="Buyer">
                <li><a class="adminliColor ca" @click="tofrrr"><i class="el-icon-news"></i>Home page</a></li>
                <li>
                <li><a class="ca" @click="toDetails"><i class="el-icon-news"></i>My account</a></li>
                <li><a class="ca" @click="toRecord"><i class="el-icon-news"></i>Purchase record</a></li>
            </ul>
            <ul v-show="seller">
                <li><a class="adminliColor ca" @click="tofrrr"><i class="el-icon-news"></i>Home page</a></li>
                <li><a class="ca" @click="toDetails"><i class="el-icon-news"></i>My account</a></li>
                 <li><a class="ca" @click="toOrder"><i class="el-icon-news"></i>Order records</a></li>
                <li><a class="ca" @click="toRecord"><i class="el-icon-news"></i>Selling records</a></li>
                <li><a class="ca" @click="toCommodity"><i class="el-icon-news"></i>Commodity shelves</a></li>
            </ul>
            <ul v-show="Administrators">
                <li><a class="adminliColor ca" @click="tofrrr"><i class="el-icon-news"></i>Home page</a></li>
                <li>
                <li><a class="ca" @click="toaccount"><i class="el-icon-news"></i>Account</a></li>
                <li><a class="ca" @click="totransac"><i class="el-icon-news"></i>Successful order</a></li>
            </ul>
        </div>
        <section class="content_container">
            <!--<section class="content">
                <router-link to="/balance/detail" class="content_title_style">ww</router-link>
            </section>-->
        </section>
        <div class="main-container">
            <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import alertTip from 'src/components/common/alertTip'
    import Utils from '../../store/utils.js'
    import { setCookie,getCookie,delCookie } from '../../store/cookie.js'
    import logo from '../../images/img/logo.jpg'
    export default {
      data(){
            return{
                patentlistshow:false,
                tradelistshow:false,
                patentSites:[],
                user:'',
                showAlert: false,
                alertText: null,
                patentSitest:[],
                offon:true,
                patentffon:true,
                tradeffon:true,
                tradeSites:[],
                tradeSitest:[],
                shopCarNums:'',
                Buyer:false,
                seller:true,
                Administrators:false,
                logo:logo,
            }
        },
        mounted(){
            let _this = this;
            $('.leftFixed ul li .ca').click(function(){
                $(this).next().slideToggle(300).parent().siblings().find('ul').slideUp(300);
                $(this).addClass('adminliColor').parent().siblings().find('.ca').removeClass('adminliColor')
                $(this).find('.el-icon-arrow-left').toggleClass('rotate').parents('li').siblings().find('a .el-icon-arrow-left').removeClass('rotate');
            });
            if(this.$route.query.role =="ROLE_USER"){
                this.Buyer = true;
                this.seller = false
                this.Administrators = false
            }else if(this.$route.query.role =="ROLE_MERCHANT"){
                this.Buyer = false;
                this.seller = true
                this.Administrators = false
            }else if(this.$route.query.role =="ROLE_ADMIN"){
                this.Buyer = false;
                this.seller = false
                this.Administrators = true
            }
            this.user = getCookie('username');
            _this.tofrrr();
        },
        components: {
            alertTip,
        },
        computed: {
           
        },
        methods:{
            totransac(){
                this.$router.push({
                  path:'/admin/transactionInfo',
                });
            },
            toDetails(){
                let queryData = {};
                queryData.user = Utils.encrypt(this.user);
                queryData.role = this.$route.query.role;
                this.$router.push({
                  path:'/admin/detail',
                  query:queryData
                });
            },
            toaccount(){
                this.$router.push({
                  path:'/admin/account',
                });
            },
            //订单记录
            toOrder(){
                let queryData = {};
                queryData.role = this.$route.query.role;
                this.$router.push({
                  path:'/admin/order',
                  query:queryData
                });
            },
            //买家/卖家记录
            toRecord(){
                let queryData = {};
                queryData.role = this.$route.query.role;
                this.$router.push({
                  path:'/admin/MyTransaction',
                  query:queryData
                });
            },
            //商品上架
            toCommodity(){
                let queryData = {};
                queryData.role = this.$route.query.role;
                this.$router.push({
                  path:'/admin/shelves',
                  query:queryData
                });
            },
            tofrrr(){
                let queryData = {};
                queryData.user = Utils.encrypt(this.$route.query.username);
                queryData.role = this.$route.query.role;
                this.$router.push({
                  path:'/admin/survey',
                  query:queryData
                });
            },
            //退出登录
            logout(){
                this.$axios.get( '../logout' ).then((response)=>{
                    if(response.data.code==1009){
                        this.$message({
                          message:response.data.msg ,
                          type: 'success',
                        });
                        delCookie('username')
                        this.$router.push('../')
                    }
                }).catch((error)=>{
                    console.log(error);
                });
            },
            tigc(){
                if(this.offon){
                    $('.leftFixed').animate({
                        left:'-252px',
                    },500);
                    $('.main-container').animate({
                        left:'0px',
                    },500);
                    this.offon = !this.offon;
                }else{
                    $('.leftFixed').animate({
                        left:'0px',
                    },500);
                     $('.main-container').animate({
                        left:'252px',
                    },500);
                    this.offon = !this.offon;
                }
                
            },
        }
    }
</script>
  
<style lang="stylus" rel ="stylesheet/stylus">
.main-container
    padding:1%
    min-width:980px
.head
    width:100%
    height:52px
    position:fixed
    z-index:999
    background:rgb(55,61,65)
    border-bottom:4px solid #2A4053
    min-width:980px
    .head-left-nav
        width:auto
        float:left
        height:100%
        line-height:50px
        ul
            width:100%
            li:hover
                color:#14cdd7
                background:rgb(67,74,80)
            li
                float:left
                width:60px
                text-align:center
                font-size:14px
                color:#fff
                position:relative
                cursor:pointer
                input
                    height:24px
                    width:190px
                    border-radius:20px
                    font-size:13px
                    padding-left:10px
                    outline:none
                i
                    width:19px
                    height:19px
                    display:inline-block
                    background:url('../../images/search4.png') no-repeat
                    cursor:pointer
                    position:absolute
                    right:4px 
                    top:16px
                    background-size:90%
    .head-left
        width:252px
        float:left
        height:100%
        i
            float:right
            margin-right:14px
            margin-top:14px
            font-size:21px
            color:#fff
            cursor:pointer
        img
            display:block
            cursor:pointer
            float:left
    .head-right:hover .user-down
        opacity:1
        top:50px
        visibility:inherit
    .head-right
        float:right
        width:150px
        height:100%
        margin-right:20px
        font-size:13px
        line-height:52px
        color:#fff
        position:relative
        img
            display:block
            float:left
            margin-top:12px
            margin-right:6px
        .user-down
            width:100%
            position:absolute
            top:20px
            left:0px
            box-shadow:0px 2px 2px #ccc
            background:#42485b
            transition:0.4s
            visibility:hidden
            opacity:0
            a
                font-size:13px
                color:#fff
                display:block
                padding:0 6px
                height:42px
                line-height:42px
                text-align:center
                cursor:pointer
            a:hover
                background:rgba(0,0,0,0.2)
    .head-right:hover .username-arr
        transform:rotate(180deg)
       .username-arr
          width: 0
          height: 0
          border-left: 4px dashed transparent
          border-top: 4px solid #fff
          border-right: 4px dashed transparent
          display: inline-block
          position: absolute
          right: 20px
          top: 24px
          _top: 4px
          transition: all .25s
          vertical-align: top
          font-size: 0
          line-height: 0
          transition: 0.2s
.leftFixed
    width:252px
    height:auto
    position:fixed
    bottom:0px
    top:52px
    left:0px
    background:rgb(55,61,65)
    ul
        width:100%
        li
            display: block
            margin: 0
            padding: 0
            border: 0
            background: #42485b
        .adminliColor
            background:#14cdd7
        li:hover
            background:#14cdd7
        a
            display: block
            position: relative
            margin: 0
            border: 0
            padding: 15px 15px
            padding-left: 20px
            color: #fff
            text-decoration: none
            font-size: 12px
            font-weight: normal
            text-transform: uppercase
            cursor:pointer
            i
                color:#fff
                margin-left:-2px
                margin-right:10px
                margin-top:2px
            .el-icon-arrow-left
                float:right
                margin-right:16px
                transition:0.1s ease
            .rotate
                transform:rotate(-90deg)
        .menu-ul
            display: none
            list-style: none
            clear: both
            margin: 0
            padding: 0
            font-size: 13px
            background: #f1f1f1
            position: initial
            height: auto
            width: 100%
            li 
                position: initial
                float: none
                width: 100%
                height: 100%
                border-radius: 0px
                background: rgba(0,0,0,.8)
                margin-left: 0px
                opacity: 1
                a:hover
                    background:rgba(68, 72, 91, 0.7)

.main-container
    position: absolute
    left: 250px
    right: 0px
    top: 50px
    bottom: 0px
    z-index: 998
    width: auto
    overflow: hidden
    overflow-y: auto
    box-sizing: border-box
    min-width: 980px
    background: #fff
    padding-bottom: 200px
    color:#555
.shoppingcar
    display:inline-block
    cursor:pointer
    position:absolute
    right:200px
    top:10px
    border:1px solid #fff
    color:#fff
    padding:6px 16px
    font-size:13px
    border-radius:4px
</style>
