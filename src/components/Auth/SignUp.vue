<template>
    <v-row>
        <v-col>
            <v-card width="400" class="mx-auto" style="top: 50%" dark>
                <v-card-title class="pb-0">
                    <!--            <h4>{{ formState === 'signUp' ? 'Sign Up' : 'Confirm Sign Up' }}</h4>-->
                    <h4>Sign Up</h4>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <template>
                            <v-text-field
                                    v-validate="'required|email'"
                                    data-vv-name="email"
                                    data-vv-as="Email"
                                    :error-messages="errors.collect('email')"
                                    v-model="signupForm.email"
                                    label="Email"
                                    prepend-icon="mdi-email"
                            />
                            <v-text-field
                                    v-validate="'required'"
                                    data-vv-name="password"
                                    data-vv-as="Password"
                                    :error-messages="errors.collect('email')"
                                    v-model="signupForm.password"
                                    type="password"
                                    label="Password"
                                    prepend-icon="mdi-lock"
                            />
                            <!--                    <v-text-field-->
                            <!--                            v-model="form.email"-->
                            <!--                            label="Email"-->
                            <!--                            prepend-icon="mdi-email"-->
                            <!--                    />-->
                        </template>
                        <!--                <template v-if="formState === 'confirmSignUp'">-->
                        <!--                    <p>Please enter confirmation code</p>-->
                        <!--                    <v-text-field-->
                        <!--                            v-model="form.authCode"-->
                        <!--                            type="text"-->
                        <!--                            prepend-icon="mdi-lock"-->
                        <!--                            label="Code">-->

                        <!--                    </v-text-field>-->
                        <!--                </template>-->
                        <p class="ma-0 pa-0 toggle" @click="$emit('changeSignUp', 'signIn')">Already sign up? Sign
                            In</p>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="signUp" dark color="grey">Sign Up</v-btn>
                    <!--            <v-btn v-if="formState === 'confirmSignUp'" @click="confirmSignUp" dark color="grey">Confirm Signup</v-btn>-->
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "SignUp",
        props: ['toggle'],
        data() {
            return {
                loading: false,
                signupForm: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions({
                createUser: 'createUser'
            }),
            signUp() {
                const valid =  this.$validator.validate();
                if(!valid) {
                    return;
                }
                const data = this.createUser({
                    email: this.signupForm.email,
                    password: this.signupForm.password
                });

                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
    .toggle {
        cursor: pointer;
    }
</style>