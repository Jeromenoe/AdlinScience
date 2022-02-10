<template>
  <v-app >
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
html {
	font-family: 'Open Sans', sans-serif;
}
body {
	margin: 0;
}
</style>
