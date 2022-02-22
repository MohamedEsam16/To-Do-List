// CODE EXPLAINED channel

//Select the element'
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST,id;

//get Item from locale storage
let data = localStorage.getItem("TODO");

//check data if is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach((item)=>{
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//clear locale Storage
clear.addEventListener('click',()=>{
    localStorage.clear();
    location.reload()
})

//Show todays Date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us", options);

//add to do function
function addToDo(toDo, id, done, trash) {
  const position = "beforeend";
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `
    <li class="item">
                <i class="fa ${DONE} co" job="complete" id=${id}></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id=${id}></i>
            </li>
    `;

  list.insertAdjacentHTML(position, item);
}
//add an item when user hit enter

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      //add Item from locale storage
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//complete to do
let completeToDo = (element) => {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
};

//remove to do
let removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
};

//target items created dynamically
list.addEventListener("click", (e) => {
  const element = e.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  //add Item from locale storage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});


