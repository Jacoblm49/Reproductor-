const audioSong = document.querySelector(".currentSong");
let audioSource = document.querySelector(".currentSong source");
const button = document.querySelector(".btn");
const playIcon = document.querySelector(".btn i");
const btn = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const songVolume = document.getElementById("volume");
const songName = document.querySelector(".songInfo h2");
const songArtist = document.querySelector(".songInfo h4");
const songImg = document.querySelector(".songInfo img");
const btnActivo = document.querySelector("#activo");
const inputDuracion = document.getElementById("duracion");
const mute = document.getElementById("mute");
const sonar = document.getElementById("sonar");
let isPlaying = false;
let newIndex;
let myPlaylist = document.querySelector(".biblioteca");
let currentSongIndex = 0;
//Funcion para reproducir la cancion
const playlist = [
	{
		id: 1,
		name: "Skyfall",
		artist: "Adele",
		audio: "audio/Adele - Skyfall.mp3",
		image: "img/Skyfall.jpg",
	},
	{
		id: 2,
		name: "Symphony",
		artist: "Clean Bandit",
		audio: "audio/Clean Bandit - Symphony.mp3",
		image: "img/Symphony.jpg",
	},
	{
		id: 3,
		name: "Locked out of heaven",
		artist: "Bruno Mars",
		audio: "audio/Bruno mars - Locked out of heaven.mp3",
		image: "img/Locked out of heaven.jpg",
	},
	{
		id: 4,
		name: "Fiesta pagana",
		artist: "Mago de oz",
		audio: "audio/Mago de oz - Fiesta pagana.mp3",
		image: "img/Fiesta pagana.jpg",
	},
	{
		id: 5,
		name: "Cradles",
		artist: "Sub urban",
		audio: "audio/Sub urban - Cradles.mp3",
		image: "img/Cradles.jpg",
	},
];

const getPlaylist = (canciones) => {
	const songs = canciones.map((song) => {
		return `
        <div class="biblioteca__cancion" id="${song.id}">
            <img src="${song.image}" alt="" />
            <div class="infoBiblioteca">
                <h4>${song.name}</h4>
                <h4>${song.artist} </h4>
            </div>
        </div>
        `;
	});
	myPlaylist.innerHTML = songs.join("");
};
getPlaylist(playlist);

const mysongs = document.querySelectorAll(".biblioteca__cancion");

const playAudio = (index) => {
	currentSongIndex = index;
	currentSong = playlist[index].audio;
	audioSong.src = currentSong;
	audioSource.src = audioSong.src;
	audioSong.play();
	Artista = songArtist.innerText = playlist[index].artist;
	title = songName.innerText = playlist[index].name;
	image = songImg.src = playlist[index].image;
	audioSong.addEventListener("loadedmetadata", () => {
		let minutes = Math.trunc(audioSong.duration / 60);
		let seconds = Math.trunc(audioSong.duration % 60);
		let duracion = (document.querySelector(".duracion").innerText =
			minutes.toString().padStart(2, "0") +
			":" +
			seconds.toString().padStart(2, "0"));
	});
	audioSong.addEventListener("play", () => {
		playIcon.classList.add("fa-pause");
		playIcon.classList.remove("fa-play");
	});
	audioSong.addEventListener("pause", () => {
		playIcon.classList.remove("fa-pause");
		playIcon.classList.add("fa-play");
	});
	mysongs.forEach((song) => {
		song.classList.remove("selected");
	});
	// Adding 'selected' class to the clicked song
	mysongs[index].classList.add("selected");
	document.querySelector(
		"body"
	).style.background = `url("${playlist[index].image}") no-repeat`;
	document.querySelector("body").style.backgroundSize = `cover`;
};

mysongs.forEach((Song, index) => {
	Song.addEventListener("click", () => {
		playAudio(index);
		isPlaying = !isPlaying;
	});
});

audioSong.addEventListener("timeupdate", () => {
	let minutes = Math.trunc(audioSong.currentTime / 60);
	let seconds = Math.trunc(audioSong.currentTime % 60);

	document.querySelector(".current").innerHTML =
		minutes.toString().padStart(2, "0") +
		":" +
		seconds.toString().padStart(2, "0");

	inputDuracion.value = (audioSong.currentTime / audioSong.duration) * 100;
	if (audioSong.currentTime == audioSong.duration) {
		newIndex = (currentSongIndex + 1) % playlist.length;
		playAudio(newIndex);
	}
});

btn2.addEventListener("click", () => {
	newIndex = (currentSongIndex + 1) % playlist.length;
	playAudio(newIndex);
});

btn.addEventListener("click", () => {
	if (audioSong.currentTime <= 10) {
		newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
	} else {
		audioSong.currentTime = 0;
	}
	playAudio(newIndex);
});

button.addEventListener("click", () => {
	//operador ternario
	isPlaying ? audioSong.pause() : audioSong.play();
	//manejo eficiente de una variable boleana
	isPlaying = !isPlaying;
});

songVolume.addEventListener("input", () => {
	let volumeRange = songVolume.value;
	audioSong.volume = volumeRange / 100;
});

songVolume.addEventListener("input", () => {
	let volumeRange = songVolume.value;
	audioSong.volume = volumeRange / 100;
});

inputDuracion.addEventListener("input", () => {
	let duracionRange = inputDuracion.value;
	audioSong.currentTime = (duracionRange / 100) * audioSong.duration;
});

btnActivo.addEventListener("click", () => {
	document.querySelector(".biblioteca").classList.toggle("activo");
});

mute.addEventListener("click", () => {
	audioSong.volume = 0;
	songVolume.value = 0;
});
sonar.addEventListener("click", () => {
	audioSong.volume = 1;
	songVolume.value = 100;
});
