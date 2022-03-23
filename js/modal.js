class Modal {
  constructor(id) {
    this.element = document.getElementById(id);
    this.id = id;
    this.closeElements = this.element.querySelectorAll(".modal__close");
    this.headElement = this.element.querySelector(".modal__head");
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
}

// Make the DIV element draggable:
// dragElement(document.getElementById("mydiv"));

// function dragElement(elmnt) {
//   var left = 0,
//     top = 0,
//     pos3 = 0,
//     pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     left = pos3 - e.clientX;
//     top = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = elmnt.offsetTop - top + "px";
//     elmnt.style.left = elmnt.offsetLeft - left + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
