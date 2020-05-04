<template>
<footer>
    {{copyright}}
    </footer>    
</template>
<script>
export default {
    data(){
        return{
            copyright:"copyright MiruTsai 2020"
        }
    }
}
</script>
<style scoped>
footer{
    text-align: center;
    background-color: #222;
    color:#fff;
    padding: 50px 0;    
}
</style>