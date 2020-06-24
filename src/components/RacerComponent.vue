<template>
    <div>
        <v-row>
            <h1 class="mb-2">WPM: {{isNaN(Math.ceil(getAPM)) ? 0 : Math.ceil(getAPM)}}</h1>
            <v-spacer></v-spacer>
            <h1>Timer: {{Math.floor(currentTime / 60)}}:{{getSomeTime}}</h1>
        </v-row>
        <v-row justify="end">

        </v-row>

        <template
                v-for="(player, index) in Object.entries(connectedPlayers)">
            <v-progress-linear

                    class="mb-2"
                    :key="index"
                    :color="colors[Math.ceil(Math.random() * colors.length)]"
                    height="20"
                    :buffer-value="player[1].percentage"
                    stream
            >
            </v-progress-linear>
        </template>


        <!--        <v-row class="mt-2 pt-2">-->

        <v-card v-if="randomWords" dark :style="{borderColor: 'red'}" :elevation="errorElev">
            <v-banner
            >
                <template v-if="randomWords" v-for="(words, index) in randomWords">
                    <b :id="`color ${index}`" :style="{color: colorChanged[index]}">{{words}}</b>
                </template>


            </v-banner>
        </v-card>


        <v-text-field outlined
                      autofocus
                      :error="showError"
                      placeholder="Type Shit Here"
                      class="mt-2 pt-1"
                      :value="currentWord"
                      @input="someEvent($event)"
        >

        </v-text-field>
        <!--        </v-row>-->
        <!--        <v-row class="mt-0 pt-0">-->
        <v-btn @click="$router.push('/home')" color="error">Surrender</v-btn>
        <!--                <v-btn class="mr-2" dark @click="connectedPlayers['something'] = 'hi'">Socket</v-btn>-->
        <!--                <v-btn class="mr-2" dark @click.stop="dialog = true">Show Dialog</v-btn>-->
        <!--        </v-row>-->
        <template>

        </template>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Game Over :(</v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="$router.push('/home')"
                    >
                        Go Home
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

       <v-dialog v-model="completeModal"
                 max-width="400">
                 <v-card>
           <v-card-title class="headline">You Win!</v-card-title>
           <v-card-text>
               
           </v-card-text>
            <v-card-actions>
                 <v-btn
                            color="green darken-1"
                            text
                            @click="$router.push('/home')"
                    >
                        Go Home
                 </v-btn>
            </v-card-actions>
                 </v-card>
        </v-dialog>

        <!-- <v-dialog
                persistent
                v-model="completeModal"
                max-width="400"
        >
            <v-card>
                <v-card-title class="headline">Waiting for game to start</v-card-title>
                <v-card-text>
                    <template v-for="(player, index) in Object.entries(connectedPlayers)">

                        <v-alert v-if="!player[1].readyState"
                                :key="index"
                                 icon="mdi-close-circle-outline"
                                 dense
                                 outlined
                                 type="error"
                        >
                            {{player[0]}}
                        </v-alert>
                        <v-alert v-else
                        :key="index"
                                    dense outlined
                                 type="success"
                        >
                            {{player[0]}}
                        </v-alert>

                    </template>
                    <template v-if="allPlayersReady">
                        Game starting in: {{countdownTimer}}
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1"
                           text
                           @click="$router.push('/home')"
                    >
                        Leave
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="$socket.client.emit('playerReady', user)"
                    >
                        Ready
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->

        <v-dialog
                persistent
                v-model="playerDialog"
                max-width="400"
        >
            <v-card>
                <v-card-title class="headline">Waiting for game to start</v-card-title>
                <v-card-text>
                    <template v-for="(player, index) in Object.entries(connectedPlayers)">

                        <v-alert v-if="!player[1].readyState"
                                :key="index"
                                 icon="mdi-close-circle-outline"
                                 dense
                                 outlined
                                 type="error"
                        >
                            {{player[0]}}
                        </v-alert>
                        <v-alert v-else
                        :key="index"
                                    dense outlined
                                 type="success"
                        >
                            {{player[0]}}
                        </v-alert>

                    </template>
                    <template v-if="allPlayersReady">
                        Game starting in: {{countdownTimer}}
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1"
                           text
                           @click="$router.push('/home')"
                    >
                        Leave
                    </v-btn>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="$socket.client.emit('playerReady', user)"
                    >
                        Ready
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import * as randomWords from 'random-words';
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'RacerComponent',

        data: () => ({
            colors: ["blue", "black", "purple", "red", "green", "yellow"],
            dialog: false,
            timePassed: 0,
            currentTime: 120,
            wpm: 0,
            showError: false,
            currentTypedPercent: 0,
            completeModal: false,
            colorChanged: [],
            someData: [],
            someCounter: 0,
            currentWord: "",
            modifier: 1,
            wordCounter: 0,
            timerStarted: false,
            errorElev: 0,
            counter: 1,
            connectedPlayers: {},
            playerDialog: true,
            allPlayersReady: false,
            countdownTimer: 3,
            percentageCounter: 0,
            currentPercent: 0,
            randomWords: null
        }),
        sockets: {
            victory() {                
                console.log("Chris HAs Won :D");
                this.completeModal = true;
            },
            connect() {                
                console.log('socket connected')
            },
            acknowledgeUserConnect(val) {
                console.log("Connect");
                this.connectedPlayers = {...val}
            },
            updatePlayerScores(val) {
                this.connectedPlayers = {...val};

            },
            allPlayersReady() {
                console.log("Ready");
                this.allPlayersReady = true;
            },
            countdown(val) {
                console.log(val);
                this.countdownTimer = val;
            },
            sendWords(words) {
                console.log("Send");
                this.randomWords = words;
                this.randomWords.flat(1).forEach(x => {
                    this.colorChanged.push("white");
                });
            }
        },
        mounted() {
            this.makeWords();
            this.connectedPlayers[this.user] = {'percentage': 0, readyState: false};
            this.userHasJoinedServer()
        }
        ,
        destroyed() {
            this.$socket.client.emit('leftGame', this.user);
        }
        ,
        watch: {
            currentTime() {
                if (this.currentTime === 0) {
                    // this.dialog = true;
                    // clearInterval(this.counter);
                }
            }
            ,
            countdownTimer() {
                if (this.countdownTimer === 1) {
                    this.playerDialog = false;
                    this.initGame();
                }
            }
            ,
            currentTypedPercent() {
                if (this.currentTypedPercent === 100 && this.wordCounter === this.colorChanged.length) {
                    console.log("Hi ^.^");
                }
            }
        },
        methods: {
            initGame() {
                this.makeWords();
                this.counter = setInterval(() => {
                    this.currentTime -= 1;
                }, 500);

                setInterval(() => {
                    this.timePassed += 1;
                }, 1000);
            },
            userHasJoinedServer() {
                this.$socket.client.emit('userJoined', this.user)
            },
            makeWords() {
                this.someData = randomWords({exactly: 10})
            },
            resetShit() {
                this.makeWords();
                this.wordCounter = 0;
                this.someCounter = 0;
                this.modifier = 1;
                this.currentWord = "";
                this.colorChanged.fill("white", 0, this.colorChanged.length);
                this.currentTypedPercent = 0;
                this.currentTime = 120;
                this.timePassed = 0;
                this.timerStarted = false;
            },
            someEvent(event) {

                if (event.keyCode == 8 || event.keyCode == 46) {
                    return;
                }

                const currentCheck = this.randomWords.length / 100;
                const getWordLength = this.randomWords.filter(x => x !== ' ');
                console.log(getWordLength);
                console.log(getWordLength.length);


                console.log(getWordLength);
                console.log(currentCheck * this.modifier);
                console.log(this.someCounter);
                if (this.someCounter >= currentCheck * this.modifier) {
                    this.currentTypedPercent = this.modifier;
                    this.modifier++;
                }
                if (this.someCounter > ((this.randomWords.length - 99) / 100 * this.someCounter)) {
                    this.currentTypedPercent = this.someCounter;
                }
                this.$socket.client.emit('wordTyped', {
                    'currentTypedPercent': this.currentPercent,
                    'username': this.user
                });
                const lastWord = event[event.length - 1];
                console.log(event);
                // if(this.getNoSpaces[this.currentPercent] === event) {
                //     this.currentPercent++;
                //     console.log("It Is ^.^")
                // }

                // if(this.randomWords[this.someCounter] !== ' ') {
                //     if(this.getNoSpaces[this.percentageCounter]);
                //     this.percentageCounter++;
                //     this.currentPercent = (this.percentageCounter / getWordLength.length) * 100;
                // }

                if (lastWord === " " && this.randomWords[this.someCounter] === " ") {
                    this.currentWord = "";
                    this.wordCounter++;
                    this.someCounter++;
                    this.showError = false;
                    this.errorElev = 0;


                } else if (this.randomWords[this.someCounter] === lastWord) {
                    this.currentWord = event;
                    this.percentageCounter++;
                    this.currentPercent = (this.percentageCounter / getWordLength.length) * 100;
                    this.$set(this.colorChanged, this.someCounter, "#00FF00");
                    this.someCounter++;
                    this.showError = false;
                    this.errorElev = 0;
                } else {
                    this.showError = true;
                    this.errorElev = 18;
                }
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ]),
            getNoSpaces() {
                return this.randomWords.filter(x => x !== ' ');
            }
            ,
            getSomeTime() {
                return Math.floor(this.currentTime / 2) % 60 < 1 ? "00" : Math.ceil(this.currentTime / 2);
            },
            getAPM() {
                if (this.countdownTimer > 1) {
                    return 0;
                }
                return this.wordCounter / (this.timePassed / 60);
            }
        }
    }

</script>

<style>
    .v-text-field {
        color: white;
    }

    .v-banner {
        font-size: 24px;
        font-family: "Candara Header";
    }
</style>
