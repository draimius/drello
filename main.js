'use strict';

//be albe to add list delete list
// add list item delete list item
// edit text in both list items and list titles

// ============================
// class Kanban {
//   constructor() {}
//   //add new list
//   //add new list item
//   //delete list
//   //delete list item
//   //edit text for target title or list item

//   //*****and i think that pretty much it for all the functionalities really
// }
// VARS, EVENTS AND NEW INSTANCE
// const trello = new Kanban();
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
//use in card creating/inserting and related events
let newCardForm = document.querySelector('#card-input');
let addCardForms = document.querySelectorAll('.add-card-form');
let addCardButtons = document.querySelectorAll('.add-card-button');
let cardContianers = document.querySelectorAll('.item-container');

//used in list creating/inserting and related events
let newListButton = document.querySelector('#list-submit');
let newListForm = document.querySelector('#list-input');
let listXOut = document.querySelector('#x');
//=====================================================================================
//=====================================================================================
//=====================================================================================
//the issue is that its not
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=======hold thing is that only one popUp form should exist at a time never multiple
function addCardListener() {
  //adding item to existing list
  addCardButtons = document.querySelectorAll('.add-card-button');

  addCardButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      button.classList.add('adding-card');

      updateDynamicVars();
      let addCardForm = button.parentElement;
      let targetList = addCardForm.parentElement.children[1];
      if (addCardForm.children.length === 1) {
        const popUpCardInput = document.createElement('div');
        popUpCardInput.innerHTML = `
        <input autocomplete="off" placeholder="enter list title" type="text" id="card-input" />
        <div class="popUp">
        </div>`;
        newCardForm = document.querySelector('#card-input');
        addCardForm.appendChild(popUpCardInput);
        document.querySelector('#card-input').focus();
        updateDynamicVars();
        cardClickOut(addCardForm, button);
        cardInputKey(targetList, newCardForm);
        buttonClickOut(addCardForm, button);
        triggerOnList(addCardForm);
      }
    });
  });
}

//value of newCard is not
//================================================
//================================================
//================================================

function cardInputKey(targetList, newCardForm) {
  //isua that event listener is not aplyting to each dif new input
  newCardForm = document.querySelectorAll('#card-input');
  newCardForm.forEach((int) => {
    int.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && int.value !== '') {
        addNewCard(int.value, targetList);
        int.value = '';
      }
    });
  });
  newCardForm = document.querySelector('#card-input');
}

//================================================
function addNewCard(cardText, targetList) {
  const card = document.createElement('li');
  card.draggable = true;
  card.classList.add('list-item');
  card.classList.add('draggable');
  card.textContent = cardText;
  targetList.appendChild(card);
  updateDynamicVars();
}

function buttonClickOut(addCardForm, button) {
  addCardButtons.forEach((btn) => {
    if (btn !== button) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // e.stopPropagation();
        button.classList = 'add-card-button';
        if (addCardForm.children[1]) {
          addCardForm.children[1].remove();
        }
        document.querySelector('#card-input').focus();
      });
    } else {
      btn.removeEventListener('click', buttonClickOut, true);
    }
  });
}

function cardClickOut(addCardForm, button) {
  document.querySelector('body').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.target !== button &&
      e.target !== document.querySelector('#card-input')
    ) {
      button.classList = 'add-card-button';
      if (addCardForm.children[1]) {
        addCardForm.children[1].remove();
      }
    }
  });
}
function triggerOnList(addCardForm) {
  addListButton.addEventListener('click', (e) => {
    if (e.target === addListButton) {
      if (addCardForm.children[1]) {
        addCardForm.children[1].remove();
      }
    }
  });
  addListForm.addEventListener('click', (e) => {
    if (e.target === addListForm) {
      if (addCardForm.children[1]) {
        addCardForm.children[1].remove();
      }
    }
  });
}

///****when i open the form its one /// when i close the form its off */
// let newCardForm = document.querySelector('#card-input');
// let addCardForms = document.querySelectorAll('.add-card-form');
// let addCardButtons = document.querySelectorAll('.add-card-button');
//-have to check all other if target = another button but the one am one we close form
// let cardContianers = document.querySelectorAll('.item-container');
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================

//creates list and appends it
function addNewList(title) {
  let newList = document.createElement('div');
  newList.classList.add('list'); // add <span>...</span> later for deleting list
  newList.innerHTML = `
  <h3 class="list-title">${title}</h3>
  <ul class="item-container">
  </ul>
  <div class="add-card-form">
    <button type="button" class="add-card-button">add +</button>
  </div>
  `;
  frame.insertBefore(newList, addListForm);
  addCardListener();
  updateDynamicVars();
  updateDrags();
  updateDragsContainers();
  newListForm.focus();
  addListForm.scrollIntoView();
}

//add list button form popUp
addListButton.addEventListener('click', (e) => {
  if (addListForm.children.length === 1) {
    e.preventDefault();
    e.stopPropagation();

    let popUpListInput = document.createElement('div');
    popUpListInput.innerHTML = `
    <input autocomplete="off" placeholder="enter list title" type="text" id="list-input" />
    <div class="popUp">
    <button type="button" id="list-submit">add list</button>
    <button type="button" id="x">X</button>
    </div>`;
    addListForm.appendChild(popUpListInput);
    updateDynamicVars();
    newListForm.focus();

    //everything after this still evaluating
    listInputKey(popUpListInput);
    listButton(popUpListInput);
    listXButton(popUpListInput);
    listClickOut(popUpListInput); //originally here (testting else where) work fine for actual x function
  }
});

//all three below are listener for specified event and prevent others
//=====================================================================================
//submition button and the enter key both work as inteded maintain focus and create
function listInputKey(popUpListInput) {
  let newListForm = document.querySelector('#list-input');
  newListForm.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();

      if (newListForm.value !== '') {
        // addListForm.removeChild(form);
        addNewList(newListForm.value);
        newListForm.value = '';
      }
    }
  });
}
function listButton(popUpListInput) {
  let newListButton = document.querySelector('#list-submit');
  let newListForm = document.querySelector('#list-input');
  newListButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (newListForm.value !== '') {
      // addListForm.removeChild(form);
      addNewList(newListForm.value);
      newListForm.value = '';
    }
  });
}
//button click exit works fine
//=====================================================================================

function listXButton(popUpListInput) {
  const listXOut = document.querySelector('#x');
  listXOut.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (popUpListInput !== null) {
      addListForm.removeChild(popUpListInput);
      popUpListInput = null;
    }
  });
}
//=====================================================================================

function listClickOut(popUpListInput) {
  const listXOut = document.querySelector('#x');

  document.querySelector('body').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    //either one of the buttons or the popUp text input
    if (
      e.target !== addListForm &&
      e.target !== addListButton &&
      e.target !== newListForm &&
      e.target !== newListButton &&
      e.target !== listXOut
    ) {
      if (addListForm.children.length > 1 && addListForm.children[1]) {
        addListForm.children[1].remove();
        // window.document.removeEventListener('click', listClickOut, true);
      }
      // addListForm.children[1].remove;
      // test = test === undefined ? test
      popUpListInput = null;
    }
  });
  //if the popUp form exist and the e.target !== addlistForm they we remove the popUp and turn of listener
}
//its value for the
// if has to come after the dynamic form is created

//=====================================================================================
//=====================================================================================
//=====================================================================================
//=====================================================================================

//update create all dynamic vars needed
function updateDynamicVars() {
  addCardButtons = document.querySelectorAll('.add-card-button');
  addCardForms = document.querySelectorAll('.add-card-form');
  cardContianers = document.querySelectorAll('.item-container');
  // updateDrags();
  // updateDragsContainers();
  newListButton = document.querySelector('#list-submit');
  newListForm = document.querySelector('#list-input');
  // addCardListener();
  listXOut = document.querySelector('#x');
  // newCardForm = document.querySelector('#card-input');
  // draggables = document.querySelectorAll('.draggable');
  // dragCointainers = document.querySelectorAll('.item-container');
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
// updateDrags();
// updateDragsContainers();
//all below needed to run once the elements were created we running before they were originally
function updateDrags() {
  // function dragEvents(draggables, dragCointainers) {
  //=============================================
  //listen for drag on item
  draggables.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      e.stopPropagation();

      item.classList.add('dragging');
    });
    //listent for drop on item
    item.addEventListener('dragend', (e) => {
      e.stopPropagation();

      item.classList.remove('dragging');
    });
  });
}
function updateDragsContainers() {
  //listen for drop in cointainer
  dragCointainers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();

      //target element we'll be drop after(top of)
      const afterElement = getDragAfterElement(container, e.clientY);
      //if do target can grab things other then item and create issues
      const dragItem = document.querySelector('.dragging');
      //if exist drop before elements else just in container
      console.log(dragItem);
      if (afterElement === null) {
        container.appendChild(dragItem);
      } else {
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
