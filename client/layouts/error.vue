<template>
  <div class="error-page">
    <h1>Oops, je crois que tu t'es égaré !</h1>
    <p>Tu peux retrouver ton chemin <a href="/">ici</a> !</p>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
