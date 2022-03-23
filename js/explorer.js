class Item {
  constructor(type, name, contextMenu) {
    this.type = type;
    this.name = name;

    this.build();
  }

  parent = itemsGallery;

  build() {
    this.element = document.createElement("a");
    this.element.href = "#";
    this.element.classList.add("icon");
    this.element.classList.add("icon-" + this.type);
    this.element.classList.add("no-wrap");
    this.element.title = this.name;
    this.element.textContent = this.name;

    const li = document.createElement("li");
    li.appendChild(this.element);

    this.parent.appendChild(li);

    this.element.addEventListener("click", (e) => e.preventDefault());

    this.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      contextMenu.show(e.clientX, e.clientY);
    });
  }

  show() {
    this.element.parentElement.classList.remove("hidden");
  }

  hide() {
    this.element.parentElement.classList.add("hidden");
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
