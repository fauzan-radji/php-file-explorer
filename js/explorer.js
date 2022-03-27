class Item {
  constructor(type, name, path) {
    this.type = type;
    this.name = name;
    this.path = path;

    this.build();

    this.on("click", (e) => e.preventDefault());

    this.on("contextmenu", (e) => {
      e.preventDefault();

      contextMenu.show(e.pageX, e.pageY);
    });
  }

  parent = itemsGallery;

  build() {
    this.element = document.createElement("a");
    this.element.href =
      this.type !== "directory" ? "./download.php?path=" + this.path : "#";
    this.element.classList.add("icon");
    this.element.classList.add("icon-" + this.type);
    this.element.classList.add("no-wrap");
    this.element.title = this.name;
    this.element.textContent = this.name;

    const li = document.createElement("li");
    li.appendChild(this.element);

    this.parent.appendChild(li);
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
