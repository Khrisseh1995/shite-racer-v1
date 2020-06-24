<template>
    <v-app>
        <v-app-bar
                dark
                app
        >

            <v-toolbar-items>
                <v-btn to="/">Home</v-btn>
                <v-btn to="/racer" text>Race</v-btn>
                <v-spacer></v-spacer>
            </v-toolbar-items>
            <!-- Test Commit -->
            <v-spacer></v-spacer>
            <v-btn v-if="user === null" to="/login">Login</v-btn>
            <v-menu left v-else top :offset-x="true">
                <template v-slot:activator="{ on }">
                    <v-avatar v-on="on" size="40" class="mr-1 avatar" color="indigo">
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-avatar>
                </template>

                <v-list>
                    <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            @click="$store.dispatch('signOutUser')"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

        <v-content>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        name: 'App',
        data: () => ({
            items: [
                {title: 'Logout'},
            ],
        }),
        methods: {
            ...mapActions({
                signOutUser: 'signOutUser'
            })
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        }
    };
</script>

<style scoped>
    .avatar {
        cursor: pointer;
    }
</style>
