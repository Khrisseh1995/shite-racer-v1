<template>
    <v-row>
        <v-col>
            <v-card width="400" class="mx-auto" style="top: 25%" dark :loading="loading">
                <v-card-title class="pb-0">
                    <h4>Login</h4>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                                v-validate="'required|email'"
                                v-model="loginForm.email"
                                data-vv-name="email"
                                data-vv-as="Email"
                                :error-messages="errors.collect('email')"
                                label="Email"
                                prepend-icon="mdi-email"
                        />
                        <v-text-field
                                v-validate="'required'"
                                data-vv-name="password"
                                data-vv-as="Password"
                                :error-messages="errors.collect('password')"
                                v-model="loginForm.password"
                                type="password"
                                label="Password"
                                prepend-icon="mdi-lock"
                        />
                    </v-form>
                    <v-alert v-if="signinError" dense type="error">
                        Details are incorrect
                    </v-alert>
                    <p style="font-size: 14px" @click="$emit('changeSignUp', 'signUp')" class="ma-0 pa-0 toggle">Need an
                        account? Sign Up</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="login" dark color="grey">Login</v-btn>
                </v-card-actions>
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'SignIn',
        data() {
            return {
                loading: false,
                signinError: false,
                loginForm: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions({
                signInUser: 'signInUser'
            }),
            async login() {
                const validator = await this.$validator.validate();
                if (!validator) {
                    return;
                }
                try {
                    // const data = await this.$store.dispatch('signInUser', {
                    //     email: this.loginForm.email,
                    //     password: this.loginForm.password
                    // });
                    const data = await this.signInUser({
                        email: this.loginForm.email,
                        password: this.loginForm.password
                    });
                    await this.$router.push('/home');
                }
                catch(e) {
                    this.signinError = true;
                }

            }
        }
    }

</script>

<style scoped>
    .toggle {
        cursor: pointer;
    }
</style>