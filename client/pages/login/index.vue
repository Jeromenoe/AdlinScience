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
					<v-btn-toggle v-model="toggleBtn" dense style="margin-left:16px; margin-bottom: 6px">
						<v-btn value="login">
							Login
						</v-btn>
						<v-btn value="signup">
							Signup
						</v-btn>
					</v-btn-toggle>
					<v-spacer></v-spacer>
					<v-btn v-if="toggleBtn == 'login'" color="primary" @click="this.login" style="margin-right: 10px; margin-bottom: 8px">Login</v-btn>
					<v-btn v-else color="primary" @click="this.signup" style="margin-right: 10px; margin-bottom: 8px">Signup</v-btn>
				</v-card-actions>
			</v-card>
		</div>
    </div>
</template>

<script>

export default {
    name: "Login",
	transition: 'page',
	data() {
		return {
			pseudo: '',
			password: '',
			toggleBtn: 'login',
		}
	},
	methods: {
		login() {
			this.$store.dispatch('authenticateUser', {
				pseudo: this.pseudo,
				password: this.password,
			})
			.then(() => {
				this.$router.push('/reservation');
			});
		},
		signup() {
			this.$store.dispatch('signupUser', {
				pseudo: this.pseudo,
				password: this.password,
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