"use strict";

// Data for songs
let data = [
    {
        "title": "Death Bed",
        "genre": "Rock",
        "artist": "Powfu",
        "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
        "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
        "id": "1"
    },
    {
        "title": "Bad Liar",
        "genre": "Metal",
        "artist": "Imagine Dragons",
        "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
        "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
        "id": "2"
    },
    {
        "title": "Faded",
        "artist": "Alan Walker",
        "genre": "Rock",
        "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
        "url": "https://samplesongs.netlify.app/Faded.mp3",
        "id": "3"
    },
    {
        "title": "Hate Me",
        "genre": "Metal",
        "artist": "Ellie Goulding",
        "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
        "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
        "id": "4"
    },
    {
        "title": "Solo",
        "genre": "Classic",
        "artist": "Clean Bandit",
        "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
        "url": "https://samplesongs.netlify.app/Solo.mp3",
        "id": "5"
    },
    {
        "title": "Without Me",
        "genre": "EDM",
        "artist": "Halsey",
        "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
        "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
        "id": "6"
    }
]

// Toggle day-night mode
document.getElementById("toggle").addEventListener("change", function () {
    const h1 = document.querySelector('h1');
    if (this.checked) {
        document.body.classList.add("night-mode");
    } else {
        document.body.classList.remove("night-mode");
    }
});

// Selectors
const songs = document.getElementById('songs');
const mySelect = document.getElementById('Genre');
const allPlaylistAdded = document.getElementById('all-playlist-added');
const addPlaylist = document.getElementById('add-playlist');
const title = document.querySelector('#title');
const singer = document.querySelector('#singer');
const img = document.querySelector('img');
const audio = document.querySelector('audio');
const currentPlaylistAdded = document.getElementById('current-playlist-added');
const categories = document.getElementById('categories');
const searchBar = document.getElementById('search-bar');

// Search functionality
document.querySelector('#search').addEventListener('submit', (event) => {
    event.preventDefault();
    if (searchBar.value.trim() != "") {
        if (categories.value == 'song') {
            let song = data.filter(element => element.title.toLowerCase() === searchBar.value.toLowerCase());
            if (song.length != 0) {
                displaySongs(song);
            } else {
                notFoundFunction();
            }
        } else {
            let cP = currentPlaylist[searchBar.value];
            if (cP) {
                currentNode = searchBar.value;
                showPlaylist();
            } else {
                notFoundFunction();
            }
        }
    }
    searchBar.value = "";
});

// Display songs based on genre selection
mySelect.addEventListener("change", () => {
    if (mySelect.value === "All") {
        displaySongs();
    } else {
        let song = data.filter(element => element.genre === mySelect.value);
        displaySongs(song);
    }
});

// Display songs
displaySongs()
function displaySongs(args = data) {
    songs.innerHTML = "";
    args.forEach(element => {
        let p = document.createElement('p');
        p.className = 'song';
        p.textContent = element.title;
        songs.appendChild(p);
    });
}

// Play a song
document.getElementById("songs").addEventListener("click", (event) => play(event));

function play(event) {
    if (title.textContent && title.textContent === event.target.textContent) {
        return;
    }
    if (event.target.classList.contains("song")) {
        let currentTitle = event.target.textContent;
        let [currentData] = data.filter(current => current.title === currentTitle);
        img.src = currentData.artwork;
        title.textContent = currentData.title;
        singer.textContent = currentData.artist;
        audio.src = currentData.url;
        currrentIndex = data.findIndex(element => element.title === currentTitle)
    }
}

// Event listener for the spacebar key
document.addEventListener("keydown", (event) => {
    // Check if the pressed key is the spacebar (keyCode 32)
    if (event.keyCode === 32 && event.target === document.body) {
        event.preventDefault(); // Prevent scrolling the page when pressing space
        // If audio is playing, pause it. Otherwise, play it.
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
});
document.addEventListener('keydown', function (event) {
    if (!document.querySelector('input:focus')) {
        const { keyCode } = event;
        if (keyCode === 37) { // Left arrow
            audio.currentTime -= 5; // Move backward by 5 seconds
        } else if (keyCode === 39) { // Right arrow
            audio.currentTime += 5; // Move forward by 5 seconds
        }
    }
});

// Prev and Next functionality
let currrentIndex = 0;
document.getElementById('prev').addEventListener('click', () => change(-1));
document.getElementById('next').addEventListener('click', () => change(1));
audio.addEventListener('ended', () => change(1));

function change(value) {
    currrentIndex += value;
    if (currrentIndex >= data.length) {
        currrentIndex == data.length - 1;
        return;
    } else if (currrentIndex < 0) {
        currrentIndex = 0;
        return;
    } else {
        let currentData = data.at(currrentIndex);
        img.src = currentData.artwork;
        title.textContent = currentData.title;
        singer.textContent = currentData.artist;
        audio.src = currentData.url;
    }
}

// Playlist section
let currentNode;
let allPlaylist = [];
let currentPlaylist = {};

document.querySelector('#playlist-head').addEventListener('submit', (event) => {
    event.preventDefault();
    let create = document.querySelector('#playlist-create');
    if (create.value && allPlaylist.includes(create.value) == false) {
        let p = document.createElement('p');
        p.className = 'song playlist';
        p.textContent = create.value;
        allPlaylistAdded.appendChild(p);
        allPlaylist.push(create.value);
        currentNode = create.value;
        currentPlaylist[create.value] = [];
        create.value = "";
    }
});

addPlaylist.addEventListener('click', () => {
    if (title.textContent && currentNode && currentPlaylist[currentNode].includes(title.textContent) == false) {
        let p = document.createElement('p');
        p.className = 'song';
        p.textContent = title.textContent;
        currentPlaylistAdded.appendChild(p);
        currentPlaylist[currentNode].push(title.textContent);
    }
});

currentPlaylistAdded.addEventListener("click", (event) => play(event));
currentPlaylistAdded.addEventListener("dblclick", (event) => deleteSong(event));

function deleteSong(event) {
    let targ = event.target;
    currentPlaylist[currentNode] = currentPlaylist[currentNode].filter(element => element != targ.textContent);
    targ.remove();
}

allPlaylistAdded.addEventListener('click', (event) => {
    showPlaylist(event);
});

allPlaylistAdded.addEventListener('dblclick', (event) => {
    deletePlaylist(event);
});

function showPlaylist(event = undefined) {
    if (event) {
        currentNode = event.target.textContent;
    }
    currentPlaylistAdded.innerHTML = "";
    let playlistArray = currentPlaylist[currentNode];
    playlistArray.forEach(element => {
        let p = document.createElement('p');
        p.className = 'song';
        p.textContent = element;
        currentPlaylistAdded.appendChild(p);
    });
}

function deletePlaylist(event) {
    if (event.target.textContent == currentNode) {
        currentNode = undefined;
        currentPlaylistAdded.innerHTML = "";
    }
    delete currentPlaylist[event.target.textContent];
    allPlaylist = allPlaylist.filter(element => event.target.textContent != element);
    event.target.remove();
}

// Function to display 'Not Found' message
function notFoundFunction() {
    const notFound = document.querySelector('.notFound');
    notFound.classList.add("notFoundSecond");
    let code = setInterval(() => {
        notFound.classList.remove("notFoundSecond");
    }, 3000);
}
