const btnSendMsg = document.getElementById("btnSendMsg");

btnSendMsg.addEventListener("click", (e) => {
    const loader = document.querySelector("#loadSendMsg > div");
    loader.style.display = "block";
    // TODO Request Ajax
});