const playBtn = document.querySelector(".unity-game__playbtn");

playBtn.addEventListener("click", () => {
    document.body.classList.toggle("open-game");
    playBtn.parentNode.removeChild(playBtn);
    UnityLoader.instantiate("unityContainer", "../project_files/TheKey/Build/HTML5 build.json", {onProgress: UnityProgress});
});

