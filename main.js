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

const addList = document.querySelector('#add-list-button');
const addItemButtons = document.querySelectorAll('.add-button');
const newCardInput = document.querySelectorAll('.new-card');

// VARS, EVENTS AND NEW INSTANCE
const trello = new Kanban();

addList.addEventListener('click', (e) => {
  console.log('clicky click clak');
  addListPopUp();
});

function addListPopUp() {
  if (![...addList.parentElement.classList].includes('popUp')) {
    addList.parentElement.classList.add('popUp');
    const inputCard = document.createElement('input');
    inputCard.innerHTML = '<input type="text" />';
    addList.appendChild(inputCard, addList);
    //testing
    let xButton = document.createElement('button');
    xButton.innerHTML = '<button>X</button>';
    addList.appendChild(xButton);
    xButton.isner;
  } else {
    console.log('working??');
  }
  //now could just have made with clases that will always apply to make look nice
  // then need way to capture and submit the input text/value
  // and create the list template with value passed in as the list title
  //??popup when clicked (in focus) when we click off it closes if we hit x button it closes
  // else if we hit submit button then that when we make the list with title w/text value
}
// console.log(inputCard);

// ===================================================================
// ===================================================================
// ===================================================================
// ALL DRAG AND DROP VARS, FUNCTION AND LISTENERS
// ===================================================================
//capture all draggable items and containers
const draggables = document.querySelectorAll('.draggable');
const dragCointainers = document.querySelectorAll('.item-container');

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
      container.insertBefore(dragItem, afterElement);
    }
  });
});

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
