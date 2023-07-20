import Vimeo from '@vimeo/player' ;
import throttle from 'lodash.throttle';

const videoPlayer = document.getElementById('vimeo-player');
const STORAGE_KEY = 'videoplayer-current-time' ;
const player = new Vimeo(videoPlayer) ;
let seconds = localStorage.getItem(STORAGE_KEY);

player.on('timeupdate', throttle(function (data) {
 const savedTime = data.seconds;

 localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTime));
},1000));

player.setCurrentTime(seconds).then(function() {

}).catch(function(error){
    switch(error.name){
        case 'RangeError':
            break;

            default:
                break;
    }
});

