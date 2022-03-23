const PROCESS_URL = location.href + "/process.php";
const videoPlayer = new VideoPlayer("video-player");

const modal = {
  video: new Modal("video-modal"),
  textarea: new Modal("textarea-modal"),
  image: new Modal("image-modal"),
};

const contextMenu = new ContextMenu("context-menu");

const items = [
  new Item("directory", "..", contextMenu),
  new Item("directory", "css", contextMenu),
  new Item("php", "file.php", contextMenu),
  new Item("text", "file.txt", contextMenu),
  new Item(
    "text",
    "file with a really really long long name without space.txt",
    contextMenu
  ),
];

filterInput.addEventListener("input", () => {
  items.forEach((item) => {
    if (!item.name.includes(filterInput.value)) {
      item.hide();
    } else {
      item.show();
    }
  });
});

// pathForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   // Send Request and Update Text Content
//   infoSpan.textContent = "Processing ...";
//   const path = pathInput.value;
//   const response = await ajax({
//     reqMethod: "GET",
//     url: PROCESS_URL + "?path=" + path,
//     toObject: true,
//   });

//   const { error, info } = response;
//   if (response.textContent) {
//     textContentInput.value = response.textContent;
//   }

//   if (error) {
//     infoSpan.innerHTML = `Error: ${error}`;
//   } else if (info) {
//     infoSpan.textContent = "Info: " + info;
//     if (info === "Success") {
//       saveButton.classList.remove("btn-disabled");
//       downloadButton.classList.remove("btn-disabled");
//       downloadButton.download = response.filename;
//       textContentInput.readOnly = false;
//     } else if (info === "The Path is a directory") {
//       saveButton.classList.add("btn-disabled");
//       downloadButton.classList.add("btn-disabled");
//       textContentInput.readOnly = true;
//     }
//     pathInputHidden.value = path;
//   }
// });

// saveButton.addEventListener("click", async () => {
//   // Send Data Content to Server
//   const data = new FormData(textContentForm);

//   const response = await ajax({
//     reqMethod: "POST",
//     url: PROCESS_URL,
//     toObject: true,
//     body: data,
//   });

//   const { error, info } = response;

//   if (error) {
//     infoSpan.textContent = `Error: ${error}`;
//   } else if (info) {
//     infoSpan.textContent = "Info: " + info;
//   }
// });
