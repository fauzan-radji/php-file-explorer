const PROCESS_URL = location.href + "/process.php";

// Elements
const pathForm = document.getElementById("path-form");
const pathInput = document.getElementById("path-input");
const infoSpan = document.getElementById("info-span");
const saveButton = document.getElementById("save-btn");
const textContentForm = document.getElementById("text-content-form");
const textContentInput = document.getElementById("text-content");
const pathInputHidden = document.getElementById("path-hidden");

pathForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Send Request and Update Text Content
  infoSpan.textContent = "Processing ...";
  const path = pathInput.value;
  const response = await ajax({
    reqMethod: "GET",
    url: PROCESS_URL + "?path=" + path,
    toObject: true,
  });

  const { error, info } = response;
  if (response.textContent) {
    textContentInput.value = response.textContent;
  }

  if (error) {
    infoSpan.textContent = `Error: ${error}`;
  } else if (info) {
    infoSpan.textContent = "Info: " + info;
    if (info === "Success") {
      saveButton.classList.remove("disabled");
      textContentInput.readonly = false;
    } else if (info === "The Path is a directory") {
      saveButton.classList.add("disabled");
      textContentInput.readonly = true;
    }
    pathInputHidden.value = path;
  }
});

saveButton.addEventListener("click", async () => {
  // Send Data Content to Server
  const data = new FormData(textContentForm);

  const response = await ajax({
    reqMethod: "POST",
    url: PROCESS_URL,
    toObject: true,
    body: data,
  });

  const { error, info } = response;

  if (error) {
    infoSpan.textContent = `Error: ${error}`;
  } else if (info) {
    infoSpan.textContent = "Info: " + info;
  }
});
