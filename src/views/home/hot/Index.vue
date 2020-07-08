<template>
    <div>
        <Hot :searchResult="value"></Hot>
    </div>
</template>
<script>
import Hot from './components/Hot'
export default {
    components:{
        Hot
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
