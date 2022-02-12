'use strict';

//be albe to add list delete list
// add list item delete list item
// edit text in both list items and list titles

// ============================
class Kanban {
  constructor() {}
  //add new list
  //add new list item
  //delete list
  //delete list item
  //edit text for target title or list item

  //*****and i think that pretty much it for all the functionalities really
}
// VARS, EVENTS AND NEW INSTANCE
const trello = new Kanban();
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================

const frame = document.querySelector('#frame');
const addListForm = document.querySelector('#add-list-form');
const addListButton = document.querySelector('#add-list-button');

addListButton.addEventListener('click', (e) => {
  if (addListForm.children.length === 1) {
    e.preventDefault();
    console.log(e);
    const form = document.createElement('from');
    form.innerHTML = `
    <input autocomplete="off" placeholder="enter list title" type="text" id="list-input" />
    <div class="popUp">
    <button type="button" id="list-submit">add list</button>
    <button type="button" id="x">X</button>
    </div>`;
    addListForm.appendChild(form);
    listInputKey(form);
    listButton(form);
    listX(form);
    // e.preventDefault();
  }
  draggables = document.querySelectorAll('.draggable');
  dragCointainers = document.querySelectorAll('.item-container');
});

function addNewList(title) {
  let newList = document.createElement('div');
  newList.classList.add('list');
  // newList.classList.add('draggable');
  // newList.draggable = true;

  newList.innerHTML = `
  <h3 class="list-title">${title}</h3>
  <ul class="item-container">
  <li draggable="true" class="list-item draggable">1</li>
  <li draggable="true" class="list-item draggable">2</li>
  <li draggable="true" class="list-item draggable">3</li>
  </ul>
  <form class="add-card-form">
    <button type="button" class="add-card-button">add +</button>
  </form>
  `;
  frame.insertBefore(newList, addListForm);
  draggables = document.querySelectorAll('.draggable');
  dragCointainers = document.querySelectorAll('.item-container');
  // console.log(draggables, dragCointainers);
  // [...dragCointainers].push(newList);
  updateDrags();
  updateDragsContainers();
}

function listInputKey(form) {
  let newListForm = document.querySelector('#list-input');
  newListForm.focus();
  newListForm.addEventListener('keypress', (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      e.preventDefault();
      if (newListForm.value !== '') {
        addListForm.removeChild(form);
        addNewList(newListForm.value);
      }
    }
  });
}

function listButton(form) {
  let newListButton = document.querySelector('#list-submit');
  let newListForm = document.querySelector('#list-input');
  newListButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (newListForm.value !== '') {
      addListForm.removeChild(form);
      addNewList(newListForm.value);
    }
  });
}

function listX(form) {
  const listXOut = document.querySelector('#x');
  listXOut.addEventListener('click', (e) => {
    e.preventDefault();
    addListForm.removeChild(form);
  });
}

//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
// ALL DRAG AND DROP VARS, FUNCTION AND LISTENERS
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//capture all draggable items and containers
let draggables = document.querySelectorAll('.draggable');
let dragCointainers = document.querySelectorAll('.item-container');
updateDrags();
updateDragsContainers();
function updateDrags() {
  // function dragEvents(draggables, dragCointainers) {
  //=============================================
  console.log(dragCointainers);
  console.log(draggables);
  //listen for drag on item
  draggables.forEach((item) => {
    item.addEventListener('dragstart', () => {
      item.classList.add('dragging');
    });
    //listent for drop on item
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });
}
function updateDragsContainers() {
  //listen for drop in cointainer
  dragCointainers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      //target element we'll be drop after(top of)
      const afterElement = getDragAfterElement(container, e.clientY);
      //if do target can grab things other then item and create issues
      const dragItem = document.querySelector('.dragging');
      //if exist drop before elements else just in container
      if (afterElement === null) {
        container.appendChild(dragItem);
      } else {
        console.log(dragItem);
        console.log(afterElement);
        container.insertBefore(dragItem, afterElement);
      }
    });
  });
}

//the container where want to drop into and the position in cointainers list
function getDragAfterElement(container, y) {
  //grab every element we are NOT currently dragging
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  //reduce very useful function used here like never seen before its clever
  return draggableElements.reduce(
    (closest, child) => {
      //really cool funciton info
      const box = child.getBoundingClientRect();
      //to base it on the center of the elements and not its top and bottom
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
//=============================================
// }
