const PDF_FILE_TYPE = "application/pdf";

const dropzoneElement = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const searchButton = document.getElementById("searchBtn");
const fileList = document.getElementById("fileList");
const unfinishedFileTemplate = document.getElementById("unfinishedFileTemplate");
const finishedFileTemplate = document.getElementById("finishedFileTemplate");

searchButton.addEventListener("click", openFileSystem);
fileInput.addEventListener("change", addFiles);
dropzoneElement.addEventListener("dragover", dragOver);
dropzoneElement.addEventListener("dragleave", dragStop);
dropzoneElement.addEventListener("dragend", dragStop);
dropzoneElement.addEventListener("drop", drop);

function openFileSystem() {
  fileInput.click();
}

function dragOver(e) {
  e.preventDefault();
  searchButton.classList.add("pointer-events-none");
  dropzoneElement.classList.add("drag-over");
}

function dragStop() {
  searchButton.classList.remove("pointer-events-none");
  dropzoneElement.classList.remove("drag-over");
}

function drop(e) {
  e.preventDefault();
  const files = e.dataTransfer.files;

  searchButton.classList.remove("pointer-events-none");
  dropzoneElement.classList.remove("drag-over");

  processFiles(files);
}

function addFiles() {
  if (fileInput.files.length) processFiles(fileInput.files);
}

function processFiles(files) {
  [...files].forEach((file) => {
    if (checkFileType(file)) {
      readFile(file);
    } else {
      alert("Wrong file type...");
    }
  });
}

function checkFileType(file) {
  return file.type === PDF_FILE_TYPE;
}

function readFile(file) {
  if (document.querySelector(`li[data-id="${file.lastModified}"]`)) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadstart = () => {
    const fileElement = unfinishedFileTemplate.content.cloneNode(true).querySelector("li");
    const nameElement = fileElement.querySelector("[data-name]");

    fileElement.setAttribute("data-id", file.lastModified);
    nameElement.innerText = file.name;

    fileList.appendChild(fileElement);
  };

  reader.onload = () => {
    uploadFile(file);
  };
}

function uploadFile(file) {
  const formData = new FormData();
  const xhr = new XMLHttpRequest();
  const xhrUpload = xhr.upload;
  const fileElement = document.querySelector(`li[data-id="${file.lastModified}"]`);

  formData.append("pdfFile", file);

  xhr.open("POST", "/upload");

  xhr.onload = () => {
    const finishedFileElement = finishedFileTemplate.content.cloneNode(true).querySelector("li");
    const nameElement = finishedFileElement.querySelector("[data-name]");
    const sizeElement = finishedFileElement.querySelector("[data-size]");

    finishedFileElement.setAttribute("data-id", file.lastModified);
    nameElement.innerText = file.name;
    sizeElement.innerText = bytesToSize(file.size);

    fileElement.replaceWith(finishedFileElement);
  };

  xhrUpload.onprogress = (e) => {
    const { loaded, total } = e;
    const percentageElement = fileElement.querySelector("[data-percentage]");
    const progressBarElement = fileElement.querySelector("[data-progress-bar]");
    const percentageValue = Math.floor((loaded / total) * 100);

    percentageElement.innerText = `${percentageValue}%`;
    progressBarElement.style.width = `${percentageValue}%`;
  };

  xhr.send(formData);
}

function bytesToSize(bytes) {
  const sizes = ["bytes", "kb", "mb", "gb", "tb"];
  const index = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (index === 0) return `${bytes} ${sizes[index]})`;
  return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${sizes[index]}`;
}
