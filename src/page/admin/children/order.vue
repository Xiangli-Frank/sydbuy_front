 <template>
    <div>
        <div class="ts-detail-title">
            <span>Order list</span>
       </div>
       <div class="patentts-wrap">
            <div class="patentts-wrap-num">Order numbers：<span class="numColor">{{totalNum}}</span></div>
       </div>
       <template v-if="count">
       <table>
            <thead>
                <th>id</th>
                <th>name</th>
                <th>buyer</th>
                <th>picture</th>
                <th>introduction</th>
                <th>price</th>
                <th>numbers</th>
                <th>operation</th>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.commodity}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.username}}</td>
                    <td><img :src="item.picture" width="80px" /></td>
                    <td>{{item.content}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.count}}</td>
                    <td><el-button type="primary" @click="ok(item)">OK</el-button><el-button type="warning" @click="cancel(item)">cancel</el-button></td>
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
                totalNum:0,
                pageSize : 8 , 
                currentPage : 1, 
                count : 0, 
                items : [],
                nocontent:false,
            }
        },
        mounted(){
            this.getFun();
        },
        methods: {
        	ok(item){
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
        		this.$axios.post('/commodity/okOrder/'+item.id+'/'+item.commodity+'/'+item.count+'')
                .then((response) => {
                    console.log(response)
                    if(response.data.code == 2005){
                     	this.$message({
	                       message:response.data.msg,
	                       type: 'error',
	                    });
	                    return;
                    }
                    this.$message({
                       message:'OK',
                       type: 'success',
                    });
                    this.getFun();
                })
                .catch(function (response) {
                  console.log(response);
                })    
        	},
        	cancel(item){
        		this.$axios.post('/commodity/cancleOrder/'+item.id+'')
                .then((response) => {
                    console.log(response);
                    this.$message({
                       message:'cancel success',
                       type: 'success',
                    });
                    this.getFun()
                })
                .catch(function (response) {
                  console.log(response);
                })    
        	},
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getFun()
            },
            getFun(){
                this.$axios.get('../commodity/listOrder/'+getCookie('username')+'/'+this.pageSize+'/'+this.currentPage+'')
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
        width:12%
        text-align:center
        font-weight:400
        padding:6px 0px
        color:#43464f
    tr
        width:100%
        border-top:1px solid #ddd
        td
            font-size:15px
            width:12%
            text-align:center
            font-weight:400
            color:#43464f
            padding:4px 0px
            overflow:hidden
            white-space:nowrap
            text-overflow:ellipsis
            img
                width:80px
                height:40px
        td:nth-child(6)
        	width:8%
        td:nth-child(7)
        	width:8%
        td:nth-child(8)
        	width:16%
    tr:nth-child(odd)
        background:#f9f9f9
    tr:last-child
        border-bottom:1px solid #ddd
    button
    	padding: 8px 12px !important
</style>
