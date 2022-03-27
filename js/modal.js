class Modal {
  constructor(id) {
    this.element = document.getElementById(id);
    this.id = id;
    this.closeElements = this.element.querySelectorAll(".modal__close");
    this.headElement = this.element.querySelector(".modal__head");
    this.titleElement = this.headElement.querySelector(".modal__title");
    this.boxElement = this.element.querySelector(".modal__box");

    this.closeElements.forEach((el) =>
      el.addEventListener("click", () => this.hide())
    );

    // drag functionality
    this.headElement.addEventListener("mousedown", (e) => {
      this.mouseStart.x = e.clientX;
      this.mouseStart.y = e.clientY;
      this.ismousedown = true;
    });

    this.element.addEventListener("mouseup", (e) => {
      if (this.ismousedown) {
        this.ismousedown = false;

        this.position.x += e.clientX - this.mouseStart.x;
        this.position.y += e.clientY - this.mouseStart.y;
      }
    });

    this.element.addEventListener("mousemove", (e) => {
      if (this.ismousedown) {
        const deltaX = e.clientX - this.mouseStart.x;
        const deltaY = e.clientY - this.mouseStart.y;

        this.boxElement.style.left = this.position.x + deltaX + "px";
        this.boxElement.style.top = this.position.y + deltaY + "px";
      }
    });
  }

  ismousedown = false;

  mouseStart = {
    x: 0,
    y: 0,
  };

  position = {
    x: 0,
    y: 0,
  };

  show() {
    this.element.classList.add("modal--show");
  }

  hide() {
    this.element.classList.remove("modal--show");
  }

  set title(titleText) {
    this.titleElement.textContent = titleText;
  }
}
