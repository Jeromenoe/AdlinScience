<template>
    <div class='container'>
		<div>
			<v-card width="400px">
				<v-toolbar dark color="primary" height="60px">
					<v-toolbar-title>Connexion</v-toolbar-title>
				</v-toolbar>
				<v-card-text style="padding-bottom: 2px">
					<v-form>
						<v-text-field v-model="pseudo" prepend-icon="mdi-account" name="login" label="Pseudo" type="text"></v-text-field>
						<v-text-field v-model="password" id="password" prepend-icon="mdi-lock" name="password" label="Mot de passe" type="password"></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="this.login" style="margin-right: 10px; margin-bottom: 6px">Login</v-btn>
				</v-card-actions>
			</v-card>
		</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
	transition: 'page',
	data() {
		return {
			pseudo: '',
			password: '',
		}
	},
	methods: {
		login() {
			this.$store.dispatch('authenticateUser', {
				pseudo: this.pseudo,
				password: this.password
			})
			.then(() => {
				this.$router.push('/reservation');
			});
		}
	}
};
</script>

<style scoped>
.container {
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 50;
	position: relative
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>