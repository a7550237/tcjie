<template>
    <div>
        <Recommend :searchResult="value"></Recommend>
    </div>
</template>
<script>
import Recommend from './components/Recommend'
export default {
    components:{
        Recommend
    },
    data(){
        return{
            
        }
    },
    computed:{
        value(){
            return this.$store.state.searchResult;
        }
    }
}
</script>
