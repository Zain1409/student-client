<template>
    <div class="container">
        <div class="nav-link">
            <router-link to="/">Home</router-link>
            <!-- <router-link :to="{name: 'detail', params: {id: this.$route.params.id}}">Detail</router-link> -->
            <router-link to="/register">Register</router-link>
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>

.nav-link{
    width: 1000px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding-top: 0px;
    margin: auto;
}
a{
    color: rgb(88, 16, 16);
    text-decoration: none;
}
a:hover{
    color: rgb(255, 0, 0);
}
</style>