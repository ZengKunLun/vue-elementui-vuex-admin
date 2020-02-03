<template>
    <div class="public-warp nothing-warp">
        <p class="nothing-title">
            <span style="color: #F02D2D;">4</span>
            <span style="color: #00FF7F;">0</span>
            <span style="color: #00FFFF;">4</span>
        </p>
        <p class="nothing-text">啊哦~ 你要访问的页面不存在</p>
    </div>
</template>

<script>
    export default {
        name: 'Nothing',
    }
</script>

<style>
    .nothing-warp {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .nothing-title {
        font-size: 160px;
        font-weight: bolder;
    }

    .nothing-text {
        font-size: 30px;
        color: #B5B5B5;
        margin: 0 0 30px 0;
    }
</style>