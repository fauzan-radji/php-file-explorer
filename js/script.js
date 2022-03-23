const PROCESS_URL = location.href + "/process.php";
const iconsName = {
  directory: "directory",
  default: "default",

  jpg: "image",
  jpeg: "image",
  png: "image",

  mp4: "video",
  mkv: "video",

  dll: "dll",
  js: "application-javascript",
  zip: "application-zip",
  rar: "rar",
  msi: "msi",
  xml: "application-xml",
  html: "text-html",
  py: "py",
  json: "application-json",
  less: "text-less",
  scss: "scss",
  xlsx: "xlsx",
  php: "php",
  txt: "text",
  svg: "image-svg-xml",
  cpp: "cpp",
  exe: "exe",
  sql: "application-x-sql",
  pptx: "pptx",
  bat: "bat",
  docx: "docx",
  psd: "psd",
  pdf: "application-pdf",
  iso: "iso",
};

const videoPlayer = new VideoPlayer("video-player");

const modal = {
  video: new Modal("video-modal"),
  textarea: new Modal("textarea-modal"),
  image: new Modal("image-modal"),
};

const contextMenu = new ContextMenu("context-menu");

const items = [
  // new Item("directory", "..", contextMenu),
  // new Item("directory", "css", contextMenu),
  // new Item("php", "file.php", contextMenu),
  // new Item("text", "file.txt", contextMenu),
  // new Item(
  //   "text",
  //   "file with a really really long long name without space.txt",
  //   contextMenu
  // ),
];

filterInput.addEventListener("input", () => {
  items.forEach((item) => {
    if (!item.name.toLowerCase().includes(filterInput.value.toLowerCase())) {
      item.hide();
    } else {
      item.show();
    }
  });
});

pathForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Send Request and Update Items
  const path = pathInput.value;
  sendRequest(path).then(updateItems).catch(alert);
});

function sendRequest(path) {
  return new Promise(async (resolve, reject) => {
    const response = await ajax({
      reqMethod: "GET",
      url: PROCESS_URL + "?path=" + path,
      toObject: true,
    });

    if (response.info) {
      resolve(response.children);
    } else if (response.error) {
      reject(response.error);
    }
  });
}

function updateItems(children) {
  itemsGallery.innerHTML = "";
  items.length = 0;

  children.forEach((child) => {
    const { name, path } = child;
    let item;
    let type;

    if (child.type === "directory") {
      type = "directory";
    } else {
      const extension = child.extension.toLowerCase();

      type = extension in iconsName ? iconsName[extension] : "default";
    }

    item = new Item(type, name, path);

    item.on("dblclick", (e) => {
      pathInput.value = item.path;
      sendRequest(item.path).then(updateItems).catch(alert);
    });

    items.push(item);
  });
}

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
