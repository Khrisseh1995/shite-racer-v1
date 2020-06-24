const app = require('express')();
const server = app.listen(3000);
const wordsService = require('./words.js');
const firebaseService = require('./firebaseFuncs.js');
// const admin = require("firebase-admin");


const io = require('socket.io').listen(server);
// POST method route
app.post('/test', function (req, res) {
  res.send('POST request to the homepage')
});
const userData = {};
let gameStarted = false;
let userCount = 0;
let wordsRetrieved = false;
let randomWords = '';



console.log("Listening on port 3000");


io.on('connection', (socket) => {

    // firebaseService.addToDatabase();
    console.log("User Has Connected: ");
    firebaseService.addToDatabase();
    socket.on('disconnect', () => {
        userCount--;
        if(!userCount) {
            wordsRetrieved = false;
        }

        console.log('user disconnected');
    });

    socket.on('connect', () => {        
        console.log("A user has connected");
        console.log("Service");


    });

    socket.on('leftGame', (username) => {
        userCount--;
        console.log(userCount);
        if(!userCount) {
            wordsRetrieved = false;
        }
        delete userData[username];
        console.log(userData);
    })

    setInterval(() => {
        socket.broadcast.emit('updatePlayerScores', userData)
    }, 2000);

    socket.on('userJoined', (username) => {
        userCount+=1;        
        console.log(userCount)
        if(userCount >= 1 && !wordsRetrieved) {        
            wordsRetrieved = true;
            console.log("True");
            const {displayWords, splitWords} = wordsService.getWords();
            randomWords = splitWords;
        }
        io.emit('sendWords', randomWords);
        console.log(`User: ${username} has joined the game.`)
        userData[username] = { percentage: 0, readyState: false };
        console.log(userData);
        socket.broadcast.emit('acknowledgeUserConnect', userData);
    })

    socket.on('wordTyped', ({ currentTypedPercent, username }) => {
        userData[username].percentage = currentTypedPercent;
        console.log(`Current word percent is ${currentTypedPercent} by ${username}`)
        if(currentTypedPercent === 100) {
            io.emit('victory', username);            
        }
    })

    socket.on('button_click', (data) => {
        console.log("Button Clicked")
    });

    socket.on('playerReady', (username) => {
        userData[username].readyState = true;
        const allReady = Object.entries(userData).filter(x => !x[1].readyState);
        console.log(allReady);
        if(!allReady.length) {
        
        io.emit('allPlayersReady');    
        let countDown = 4;
        console.log("InitMPORE");
        
        const countDownInterval = setInterval(() => {
            io.emit('countdown', countDown -= 1);
            console.log("Countdown: " + countDown);
            if(countDown <= 1) {
                clearInterval(countDownInterval);
            }
        }, 1000);
        
        }
    
    })


});

