class Item {
  constructor(name, path) {
    this.name = name;
    this.path = encodeURI(path);
  }

  parent = itemsGallery;

  build() {
    this.element = document.createElement("a");
    this.element.href =
      this.type === "directory" ? "#" : "./download.php?path=" + this.path;
    this.element.classList.add("icon");
    this.type === "image"
      ? (this.element.style.backgroundImage = `url(${this.element.href})`)
      : this.element.classList.add("icon-" + this.type);
    this.element.classList.add("no-wrap");
    this.element.title = this.name;
    this.element.textContent = this.name;

    const li = document.createElement("li");
    li.appendChild(this.element);

    this.parent.appendChild(li);

    this.setEventListeners();
  }

  setEventListeners() {
    this.on("click", (e) => e.preventDefault());

    this.on("contextmenu", (e) => {
      e.preventDefault();

      contextMenu.show(e.pageX, e.pageY);
    });
  }

  show() {
    this.element.parentElement.classList.remove("hidden");
  }

  hide() {
    this.element.parentElement.classList.add("hidden");
  }

  on(eventType, listener) {
    this.element.addEventListener(eventType, listener);
  }
}

class Directory extends Item {
  constructor(name, path) {
    super(name, path);
    this.type = "directory";
  }
}

class File_ extends Item {
  constructor(name, path) {
    super(name, path);
    const extension = name.split(".").pop().toLowerCase();
    this.type = iconsName[extension] || "default";
  }
}

class ContextMenu {
  constructor(id) {
    this.element = document.getElementById(id);

    window.addEventListener("click", () => this.hide());
  }

  show(x, y) {
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
    this.element.classList.add("context-menu--show");
  }

  hide() {
    this.element.classList.remove("context-menu--show");
  }
}
