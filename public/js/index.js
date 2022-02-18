const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browse-button");
const fileInput = document.querySelector("#fileinput");
const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const percentDiv = document.querySelector("#percent");
const fileURLInput = document.querySelector("#fileURL");
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyBtn");
const qrCode = document.querySelector("#qr-code")


const host="http://localhost:3000";
const uploadURL = `${host}/api/files`;
// const uploadURL=`/api/files`;
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault()
    if (!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged");

    }
})
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragged");
})
dropZone.addEventListener("drop", (e) => {
    e.preventDefault()
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.table(files);
    if (files.length) {
        fileInput.files = files
        uploadfile()

    }

});


fileInput.addEventListener("change", () => {
    uploadfile()

})
browseBtn.addEventListener("click", () => {
    fileInput.click();
})

copyBtn.addEventListener("click", () => {
    fileURLInput.select();
    document.execCommand("copy")
})

const uploadfile = () => {
    progressContainer.style.display = "block"
    const files = fileInput.files[0]
    const formData = new FormData()
    formData.append("myfile", files)
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.response)
            showLink(JSON.parse(xhr.response))

        }

    };
    xhr.upload.onprogress = updateProgress
    xhr.open("POST", uploadURL)
    xhr.send(formData)

};
const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log(percent)
    bgProgress.style.width = `${percent}%`
    percentDiv.innerText = percent;
    progressBar.style.transform = "scaleX(${percent/100})"
}

const showLink = ({ file: url }) => {
    console.log(url);
    progressContainer.style.display = "none"
    sharingContainer.style.display = "block"
    dropZone.style.display = "none"
    fileURLInput.value = url;
    var qr_code = new QRCode(qrCode, {
        text: url,
        colorDark: "#5868bf",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    })



}


