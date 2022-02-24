<template>
    <div class='container' v-if="mount">
		<div style="width:33%;">
			<v-card >
				<v-toolbar dark color="primary">
					<v-toolbar-title>Connexion</v-toolbar-title>
				</v-toolbar>
				<v-card-text style="padding-bottom: 2px">
					<v-form>
						<v-text-field prepend-icon="mdi-account" name="login" label="Pseudo" type="text"></v-text-field>
						<v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Mot de passe" type="password"></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" to="/" style="margin-right: 10px; margin-bottom: 6px">Login</v-btn>
				</v-card-actions>
			</v-card>
		</div>
    </div>
</template>

<script>
export default {
    name: "Login",
	data() {
		return {
			mount: false
		}
	},
	mounted() {
		this.mount = true;
	}
};
</script>

<style scoped>
.container {
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>