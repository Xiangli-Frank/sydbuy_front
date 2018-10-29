 <template>
    <div>
            <h2 class="welcome">Welcome</h2>
    </div>
</template>

<script>
    import 'echarts/theme/macarons.js'
    import Utils from '../../../store/utils.js'
    import MoPaging from 'src/components/common/alertTip'
    import loading from 'src/components/common/loading'
    import {formatDate} from '../../../store/getters.js';
    export default {
      data(){
            return{

            }
        },
        filters:{
            
        },
        mounted(){
            let _this = this;
        },
        methods: {

        },
        components: {
            MoPaging 
        },
    }
</script>
  
<style lang="stylus" rel ="stylesheet/stylus">
.welcome
    text-align:center
    font-size:90px
    margin-top:280px
</style>