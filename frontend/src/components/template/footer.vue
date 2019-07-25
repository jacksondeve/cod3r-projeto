<template>
    <footer class="footer">
    <span>copyright <strong>cod3r</strong>2015-2019 </span>
</template>

<script>
export default {
    name:'footer'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: #ddd;
        color: #ccc;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>
