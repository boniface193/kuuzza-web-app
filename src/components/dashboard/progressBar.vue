<template>
    <div class="progress-body" :style="{'height': height, 'background': bgColor, 'border-radius': borderRadius}">
        <div class="progress" :style="{'width': width, 'background': progressColor}"></div>
    </div>
</template>
<script>
export default {
    name: "progressBar",
    props: ["width", "height", "bgColor", "progressColor", "borderRadius"]
}
</script>
<style lang="scss" scoped>
.progress-body{
    width: 100%;
    transition: 1s ease;
    .progress{
        height: 100%;
        border-radius: 5px;
        transition: 1s ease;
    }
}
</style>