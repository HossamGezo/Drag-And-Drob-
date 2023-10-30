let input = document.querySelector(".main-box input");
let add = document.querySelector(".main-box .add");
let boxs = document.querySelectorAll(".box");
// Global Varaible To Use It As Array Of Items 
let items;
// Global Variable To Take Element From DragStart And ComeBack Null At DragEnd
let drag = null;
// I Will Take This Variable From Drop EventListener Line 117 To Use It At DragEnd EventListener Line 96
let boxIndex;
// I Will Take This Varaible From DragStart EventListener Line 96 To Use It At DragEnd EventListener Line 101
let itemInnerText;
// I Will Take This Variable From DragStart EventListener Line 96 To Use It Many Times At DragEnd
let dragParentIndex;


// Array Of Tasks
let myTasks = [
  {
    id: 1,
    arrayOfTasks: [],
  },
  {
    id: 2,
    arrayOfTasks: [],
  },
  {
    id: 3,
    arrayOfTasks: [],
  },
  {
    id: 4,
    arrayOfTasks: [],
  },
];

// localStorage.clear();
// ------------------------------------------------------------------------------------------------- 

// Get Data From Local Storage If It Exist 
if (localStorage.getItem("task")) {
  myTasks = JSON.parse(localStorage.getItem("task"));
  readData();
}

// Add To Array Function
function addToArray() {
  if (input.value !== "") {
    // Push Task To Array Of Tasks
    myTasks[0].arrayOfTasks.push(input.value);
    // Add Array Of Tasks To Local Storage
    addToLocalStorage();
    // Read Data From Array Of Tasks
    readData();
    // Clear Input Value
    clearInput();
  }
}

// Add To Local Storage Function 
function addToLocalStorage() {
  localStorage.setItem("task", JSON.stringify(myTasks));
}

// Clear Inputs
function clearInput() {
  input.value = "";
}

// Read Data Function 
function readData() {
  boxs.forEach((box, index) => {
    box.innerHTML = `
      <h2>box</h2>
    `;
    for (let i = 0; i < myTasks[index].arrayOfTasks.length; ++i) {
      box.innerHTML += `
        <div class="item" draggable="true"">${myTasks[index].arrayOfTasks[i]}</div>
      `;
    }
  });
};

// Add Click Event
add.addEventListener("click", () => {
  // Add To Array Of Tasks
  addToArray();
  // Drag Item Function
  dragItem();
});

// Drag Item Function
function dragItem() {
  // ---------- Draggable
  let items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      drag = item;
      itemInnerText = drag.innerText.toLowerCase();
      dragParentIndex = +drag.parentElement.getAttribute("data-id");
      item.style.opacity = "0.5";
    });
    item.addEventListener("dragend", () => {
      // Update Array Of Tasks
      for (let i = 0; i < myTasks[dragParentIndex].arrayOfTasks.length; ++i) {
        if (myTasks[dragParentIndex].arrayOfTasks[i] === itemInnerText) {
          myTasks[dragParentIndex].arrayOfTasks.splice(i, 1);
        }
      }
      myTasks[boxIndex].arrayOfTasks.push(drag.innerText.toLowerCase());
      // Update Local Storage
      addToLocalStorage();
      // Restart Drag And Item Styling
      drag = null;
      item.style.opacity = "1";
    });
    boxs.forEach((box, index) => {
      box.addEventListener("dragover", (ele) => {
        ele.preventDefault();
        box.style.cssText = `
          background-color: #484583;
          color: white;
        `;
      });
      box.addEventListener("dragleave", () => {
        box.style.cssText = `
        background-color: white;
        color: black;
      `;
      });
      box.addEventListener("drop", () => {
        boxIndex = index;
        // Append Drag Item To The Target Box
        box.append(drag);
        // Restart Box Style
        box.style.cssText = `
        background-color: white;
        color: black;
      `;
      });
    });
  });
};

dragItem();

// Good Box Shadow

// box-shadow: 0 4px 20px -5px rgba(8,52,82,.12),0 20px 30px rgba(8,52,82,.08)!important;