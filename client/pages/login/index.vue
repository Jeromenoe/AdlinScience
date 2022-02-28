<template>
    <div class='container'>
        <div tabindex="0" @keydown.enter="enterBtn">
            <v-card width="400px">
                <v-toolbar dark color="primary" height="60px">
                    <v-toolbar-title>Connexion</v-toolbar-title>
                </v-toolbar>
                <v-card-text style="padding-bottom: 2px">
                    <v-form>
                        <v-text-field 
						v-model="pseudo" 
						prepend-icon="mdi-account" 
						name="login" 
						label="Pseudo" 
						type="text" 
						:rules="rules.pseudo" 
						required></v-text-field>
                        <v-text-field 
						v-model="password" 
						id="password" 
						prepend-icon="mdi-lock" 
						name="password" 
						label="Mot de passe" 
						type="password" 
						:rules="rules.password" 
						required></v-text-field>
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
                    <v-btn 
					v-if="toggleBtn == 'login'" 
					color="primary" 
					@click="this.login" style="margin-right: 10px; margin-bottom: 8px" 
					:disabled="!formIsValid">Login</v-btn>
                    <v-btn 
					v-else color="primary" 
					@click="this.signup" 
					style="margin-right: 10px; margin-bottom: 8px" 
					:disabled="!formIsValid">Signup</v-btn>
                </v-card-actions>
                <v-snackbar v-model="snackbar" :timeout="timeout" top right style="top:80px;">
                    {{ text }}
                    <template v-slot:action="{ attrs }">
                        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    transition: "page",
    data() {
        return {
            pseudo: "",
            password: "",
            toggleBtn: "login",
            rules: {
                pseudo: [
                    (val) => (val || "").length > 0 || "Le champ est requis",
                ],
                password: [
                    (val) => (val || "").length > 4 || "5 caractères minimum",
                ],
            },
			snackbar: false,
			text: 'My timeout is set to 2000.',
			timeout: 2000,
        };
    },
    methods: {
        login() {
            this.$store
                .dispatch("authenticateUser", {
                    pseudo: this.pseudo,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push("/reservation");
                })
				.catch((e) => {
					this.text = "Pseudo ou mot de passe incorrects"
					this.snackbar = true;
				});
        },
        signup() {
            this.$store
                .dispatch("signupUser", {
                    pseudo: this.pseudo,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push("/reservation");
                })
				.catch((e) => {
					this.text = "Le pseudo existe déjà"
					this.snackbar = true;
				});;
        },
		enterBtn() {
			if (this.formIsValid) {
				this.toggleBtn == 'login' ? this.login() : this.signup()
			}
		}
    },
    computed: {
        formIsValid() {
            let validPseudo = true;
            let validPassword = true;
            if (this.pseudo.length > 10 || this.pseudo.length < 1) {
                validPseudo = false;
            }
            if (this.password.length < 5) {
                validPassword = false;
            }
            return validPseudo && validPassword;
        },
    },
};
</script>

<style scoped>
.container {
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
    position: relative;
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