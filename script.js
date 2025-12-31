let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
 let text = taskInput.value;
 let category = document.getElementById("category").value;
 let date = dueDate.value;

 if(text==="") return alert("Enter a task!");

 tasks.push({text,category,date,done:false});
 localStorage.setItem("tasks",JSON.stringify(tasks));
 taskInput.value="";
 displayTasks();
}

function toggle(i){
 tasks[i].done = !tasks[i].done;
 localStorage.setItem("tasks",JSON.stringify(tasks));
 displayTasks();
}

function del(i){
 tasks.splice(i,1);
 localStorage.setItem("tasks",JSON.stringify(tasks));
 displayTasks();
}

function displayTasks(){
 let list="";
 let filter=document.getElementById("filter").value;

 tasks.forEach((t,i)=>{
  if(filter=="completed" && !t.done) return;
  if(filter=="pending" && t.done) return;

  list+=`
  <li class="${t.done?'completed':''}">
   ${t.text} (${t.category}) - ${t.date}
   <span>
    <button onclick="toggle(${i})">✔</button>
    <button onclick="del(${i})">🗑</button>
   </span>
  </li>`;
 });
 taskList.innerHTML=list;
}

displayTasks();
