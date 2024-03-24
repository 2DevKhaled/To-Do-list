let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".task-area");
let submitRest = document.querySelector(".btn-rest");
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();
submit.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value == "";
  }
});
submitRest.addEventListener('click' , function(){
  taskDiv.innerHTML = ""; 
  window.localStorage.removeItem("tasks");
})
taskDiv.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("delete") ||
    e.target.classList.contains("ri-delete-bin-fill")
  ) {
    // remove element from page
    e.target.parentElement.remove();
    // remove  task From local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if(e.target.classList.contains("task")){
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(value) {
  // Task Data
  const task = {
    id: Date.now(),
    title: value,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementToPageFrom(arrayOfTasks);
  addDataToLocalStorage(arrayOfTasks);
}
function addElementToPageFrom(arr) {
  taskDiv.innerHTML = "";
  arr.forEach((task) => {
    let div = document.createElement("div");
    if (task.completed) {
      div.className = "task done";
    }
    div.className = "task";
    div.setAttribute("data-id", task.id);
    let taskTitle = document.createElement("p");
    taskTitle.appendChild(document.createTextNode(task.title));
    taskTitle.className = "taskTitle";
    div.appendChild(taskTitle);
    let del = document.createElement("i");
    del.className = "ri-delete-bin-fill";
    div.appendChild(del);
    taskDiv.appendChild(div);
  });
}
function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}
function deleteTaskWith(taskId) {
  // For Explain Only
/*  for (let i = 0; i < arrayOfTasks.length; i++) {
    console.log(`${arrayOfTasks[i].id}==${taskId}`);
  }*/
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}
function toggleStatusTaskWith(taskId){
  for(let i=0;i<arrayOfTasks.length; i++){
    if(arrayOfTasks[i].id = taskId){
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true)  : (arrayOfTasks[i].completed = false) ;
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}