async function getsong(){
    let a = await fetch('http://127.0.0.1:5500/response.html');
    let response = await a.text();
    // console.log(response); 

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    console.log(as);
    let songs = [];
    let songName = [];

    for(let i=0; i<as.length;i++){
        let element = as[i];
        // console.log(element)
        if(element.href.endsWith('.mp3')){
            songs.push(element.href);
            songName.push(element.innerText);
        }
    }
    return [songs, songName]
}


async function main(){
   let [songs, songsName] = await getsong();
//    console.log(songs);
//    console.log(songsName)

   let uls = document.querySelector('.songList').getElementsByTagName('ul')[0];

   for (const song of songsName) {
        uls.innerHTML = uls.innerHTML + `<li>
        <img src="svg/music.svg" alt="" width="35px">
        <div class="info">
          <div>${song}</div>
          <div>Kirtan</div>
        </div>
        <div class="playnow">
          <span>Play now</span>
          <img class="invert" src="svg/play.svg" alt="">
        </div>
      </li>`
   }

   let audio = new Audio(songs[0]);
//    audio.play();

   audio.addEventListener('loadeddata',()=>{
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
   })
}

main();