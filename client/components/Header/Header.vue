<template>
    <div class="header-container">
        <header class="the-header">
            <div class="logo">
                <nuxt-link class="adlin-science" tag="img" src="https://res2.weblium.site/res/5f0496880f197a0023468411/60296f80a2ddf40021d44a69_optimized_387.webp" to="/"></nuxt-link>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
};
</script>


<style scoped>
.header-container {
    height: 60px;
	z-index:100;
	position: relative;
}

.the-header {
    width: 100%;
    position: fixed;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(250, 250, 250);
    box-sizing: border-box;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

.logo {
	height: 70px;
}

.adlin-science {
	height: 90%;
	cursor: pointer;
}
</style>
