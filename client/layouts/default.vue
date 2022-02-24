<template>
    <v-app>
        <v-main>
			<div style="height:100%; width:100%">
            <Header />
            <Nuxt />
			</div>
        </v-main>
    </v-app>
</template>

<script>
import Header from "@/components/Header/Header";

export default {
    name: "DefaultLayout",
    components: {
        Header,
    },
	data() {
      return {
        title: 'Adlin Science'
      }
    },
    head() {
      return {
        title: this.title,
      }
    }
};
</script>

<style>
html {
    font-family: "Open Sans", sans-serif;
}
body {
    margin: 0;
}
</style>
