import * as bugApi from "./bugApi";
console.log("application loaded - v2");

// (() => {
let bugsList;

function createBugItem(bug) {
  const bugItem = document.createElement("li");
  bugItem.innerText = bug.name;
  return bugItem;
}

function appendBugItem(bugItem) {
  bugsList.appendChild(bugItem);
}

async function loadBugs() {
  const bugs = await bugApi.getAll();
  bugs
    .map((bug) => createBugItem(bug))
    .forEach((bugItem) => appendBugItem(bugItem));
}

async function onBtnAddNewClick() {
  const newBugName = document.getElementById("txtNewBugName").value;
  const newBug = await bugApi.save(newBugName);
  const newBugItem = createBugItem(newBug);
  appendBugItem(newBugItem);
}
function onDocumentLoad() {
  bugsList = document.getElementById("bugsList");
  console.log(bugsList);
  const btnAddNew = document.getElementById("btnAddNew");
  btnAddNew.addEventListener("click", onBtnAddNewClick);
  loadBugs();
}

window.addEventListener("load", onDocumentLoad);
// })()
