<template>
    <div class="progress-body">
        <div class="progress" :style="{'width': width}"></div>
    </div>
</template>
<script>
export default {
    name: "progressBar",
    props: ["width"]
}
</script>
<style lang="scss" scoped>
.progress-body{
    background: #EFEFEF;
    height: 8px;
    width: 100%;
    border-radius: 5px;
    transition: 1s ease;
    .progress{
        height: 100%;
        background: #00B944;
        border-radius: 5px;
        transition: 1s ease;
    }
}
</style>