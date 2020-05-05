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
    position: fixed;
    bottom:0;
    width: 100%;
    padding: 20px 0;
}
</style>