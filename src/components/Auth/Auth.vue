<template>
    <div>
        <sign-up @changeSignUp="changeSignUp" :toggle='toggle' v-if="formState === 'signUp'"></sign-up>
        <sign-in @changeSignUp="changeSignUp" v-if="formState === 'signIn'"></sign-in>
    </div>
</template>

<script>
    import SignUp from './SignUp'
    import SignIn from './SignIn'

    export default {
        name: 'app',
        data() {
            return {
                formState: 'signIn'
            }
        },
        methods: {
            toggle() {
                this.formState === 'signUp' ? this.formState = 'signIn' : this.formState = 'signUp'
            },
            changeSignUp(toggleSign) {
                this.formState = toggleSign;
                // if (toggleSign === 'signIn') {
                //     console.log("It's Sign In");
                //     this.formState = 'signUp'
                // }
                // if (toggleSign === 'signUp') {
                //     console.log("It's Sig Up");
                //
                //     this.formState = 'signIn'
                // }
            }
        },
        components: {
            SignUp,
            SignIn
        }
    }
</script>

<style>
    /*.auth {*/
    /*    margin: 0 auto;*/
    /*    width: 460px;*/
    /*}*/
</style>