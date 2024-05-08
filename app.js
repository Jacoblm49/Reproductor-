const song = document.querySelector('.currentSong')
const button = document.querySelector('.btn')
// const btn =document.querySelector('.btn1')
const songVolume = document.getElementById('volume')
const songName = document.querySelector('.songInfo h2')
const songArtist = document.querySelector('.songInfo h4')
const btnPlay = document.querySelector('.fa-play');
const btnPause = document.querySelector('.fa-pause');
const btnLibrary = document.querySelector('#library');
const libraryContainer = document.querySelector(".containerLibrary");

const myPlaylist = document.querySelector(".library__songs");
const cancionActual = document.querySelector('.song');



// DESPLEGAR MENU DE LIBRERIA
btnLibrary.addEventListener('click', () => {

    libraryContainer.classList.toggle("active");
})

// ARREGLO CON LAS CANCIONES
let playlist = [
    {
        id: 1,
        artist: "Limp Bizkit",
        name: "Break Stuff",
        audio: 'Audio/Limp Bizkit Break Stuff Official Music Video',
        image: 'img/BreakStuff.jpg'
    },
    {
        id: 2,
        artist: "System Of a Down",
        name: "Toxicity",
        audio: 'Audio/System Of A Down  Toxicity Official HD Video.mp3',
        image: 'img/Toxicity.jpg'
    },
    {
        id: 3,
        artist: "Deftones",
        name: "Engine No 9",
        audio: 'Audio/Engine No 9.mp3',
        image: 'img/Engine No9.jpg'
    },
    {
        id: 4,
        artist: "Linkin Park",
        name: "In The End",
        audio: 'Audio/In The End Official HD Music Video  Linkin Park (1).mp3',
        image: 'img/In the end.jpg'
    },
    {
        id: 5,
        artist: "Linkin Park",
        name: "One Step Closer",
        audio: 'Audio/Linkin Park  One Step Closer HQ.mp3',
        image: 'img/One Step Closer.jpg'
    },
    {
        id: 6,
        artist: "Linkin Park",
        name: "Given Up",
        audio: 'Audio/Given Up -Linkin Park.mp3',
        image: 'img/Given Up.png'
    }
]


const getPlaylist = (canciones) => {

    const songs = canciones.map((song) => {
        return `
        <div class="library__songs__song" id="${song.id}">
            <img src="${song.image}" alt=""/>
            <div class="library__songs__song-info">
                <p>${song.name}</p>
                <p>${song.artist}</p>
            </div>
        </div>`     
    })
    myPlaylist.innerHTML = songs.join(' ');
}

getPlaylist(playlist)

const mysongs = document.querySelectorAll(".library__songs__song");
for(let i = 0;i<mysongs.length;i++){
    mysongs[i].addEventListener('click',()=>{
        console.log(`name: ${playlist[i].name} \nartis: ${playlist[i].artist} \naudio: ${playlist[i].audio}`);
        // console.log(cancionActual);  
        let sourceSong = playlist[i].audio;
        console.log(sourceSong);
        cancionActual.innerHTML=`
            <div class="song">
            <audio class="currentSong">
                <source src="${sourceSong}" type="audio/mpeg"  title=" ${playlist[i].name} ">
            </audio>
            <section class="playerContainer">
                <div class="songInfo">
                    <div class="songInfo-img">
                        <img src="${playlist[i].image}" alt="">
                    </div>
                    <h2>${playlist[i].name}</h2>
                    <h4>${playlist[i].artist}</h4>
                </div>
            </section>
        </div>
        `        
    })
}

let isPlaying = false;

button.addEventListener('click', () => {

    if (isPlaying == false) {
        song.play()
        isPlaying = true;
        // console.log("Play")

    } else {
        song.pause();
        isPlaying = false;
        // console.log("Paused");
    }
    let title = songName.innerText = song.childNodes[1].title;
    let guion = title.indexOf("-")
    // console.log(guion)
    title = songName.innerText = song.childNodes[1].title.slice((guion + 1), -1);
    let Artist = songArtist.innerText = song.childNodes[1].title.slice(0, (guion - 2) + 2);
})

// PAUSAR Y DESPAUSAR LA CANCION CON LOS BOTONES DEL CONTROL
button.addEventListener('click', () => {
    btnPlay.classList.toggle("active");
    btnPause.classList.toggle("active");
})


// CONTROL DEL VOLUMEN
songVolume.addEventListener('input', () => {
    let volumeRange = songVolume.value;
    song.volume = volumeRange / 100;
})