 <template>
    <div>
        <div class="ts-detail-title">
            <span>Trade list</span>
       </div>
       <div class="patentts-wrap">
            <div class="patentts-wrap-num">Total transaction records：<span class="numColor">{{totalNum}}</span></div>
       </div>
       <template v-if="count">
       <table v-show="sellShow">
            <thead>
                <th>id</th>
                <th>name</th>
                <th>picture</th>
                <th>introduction</th>
                <th>price</th>
                <th>lave</th>
                <th>sale</th>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td><img :src="item.picture"  width="80px"/></td>
                    <td>{{item.introduction}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.lave}}</td>
                    <td>{{item.sell}}</td>
                </tr>
            </tbody>
       </table>
       <table v-show="!sellShow">
            <thead>
                <th>id</th>
                <th>name</th>
                <th>picture</th>
                <th>introduction</th>
                <th>price</th>
                <th>numbers</th>
                <th>state</th>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td><img :src="item.picture"  width="80px"/></td>
                    <td>{{item.content}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.count}}</td>
                    <td>{{item.state}}</td>
                </tr>
            </tbody>
       </table>
       <p v-show="nocontent" style="text-align:center;margin-top:20px">no data</p>
        <mo-paging 
        :page-index="currentPage" 
        :total="count" 
        :page-size="pageSize" 
        @change="pageChange">
        </mo-paging>
        </template>
    </div>
</template>

<script>
    import MoPaging from 'src/components/common/alertTip'
    import loading from 'src/components/common/loading'
    import Utils from '../../../store/utils.js'
    import { setCookie,getCookie,delCookie } from '../../../store/cookie.js'
    export default {
      data(){
            return{
                transType:'',
                sellShow:true,
                totalNum:0,
                pageSize : 8 , 
                currentPage : 1, 
                count : 0, 
                items : [],
            }
        },
        mounted(){
            this.transType = this.$route.query.role;
            if(this.transType == 'ROLE_USER'){
                this.sellShow = false;
            }else{
                this.sellShow = true;
            }
            this.getFun();
        },
        methods: {
            pageChange (page) {
                this.currentPage = page
                this.getFun()
            },
            getFun(){
                let url = ''
                if(this.transType == 'ROLE_USER'){
                    url = '/listBuyDTO/'+getCookie('username')+'/'+this.pageSize+'/'+this.currentPage+''
                }else{
                    url = '../commodity/obtain/'+getCookie('username')+'/'+this.pageSize+'/'+this.currentPage+''
                }
                this.$axios.get(url)
                .then((response) => {
                    console.log(response)
                    if(response.data.details.totalPages == 0){
                        this.nocontent = true;
                        this.count = 0;
                        this.items = [];
                        return;
                    }else{
                        this.nocontent = false;
                        this.count = response.data.details.totalPages;
                        this.items = response.data.details.content; 
                        this.totalNum = response.data.details.totalElements;
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
            MoPaging
        },
    }
</script>
  
<style lang="stylus" rel ="stylesheet/stylus">
.ts-detail-title
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
.patentts-wrap
    width:100%
    font-size:13px
    margin-top:10px
    color:#666
    box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
    .patentts-wrap-num
        width:100%
        padding:10px
        border-bottom:1px solid #eee
        padding-left:18px
        .numColor
            color:#f56c6c
table
    font-size:14px
    border-collapse: collapse
    border-spacing: 0
    width:100%
    margin-top:30px
    margin-bottom:30px
    th
        font-size:18px
        width:14%
        text-align:center
        font-weight:400
        padding:6px 0px
        color:#43464f
    tr
        width:100%
        border-top:1px solid #ddd
        td
            font-size:15px
            width:14%
            text-align:center
            font-weight:400
            color:#43464f
            padding:4px 0px
            img
                width:80px
                height:40px
    tr:nth-child(odd)
        background:#f9f9f9
    tr:last-child
        border-bottom:1px solid #ddd
</style>
