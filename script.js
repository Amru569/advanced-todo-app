let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
 let text = taskInput.value.trim();
 if(text==="") return alert("Task cannot be empty");
 let cat = category.value;
 let date = dueDate.value;

 tasks.push({text,cat,date,done:false});
 save();
}

function save(){
 localStorage.setItem("tasks",JSON.stringify(tasks));
 displayTasks();
}

function toggle(i){ tasks[i].done=!tasks[i].done; save(); }
function del(i){ tasks.splice(i,1); save(); }

function edit(i){
 let newTask = prompt("Edit Task",tasks[i].text);
 if(newTask) tasks[i].text=newTask;
 save();
}

function displayTasks(){
 let s = search.value.toLowerCase();
 let sf = statusFilter.value;
 let cf = catFilter.value;
 taskList.innerHTML="";

 tasks.forEach((t,i)=>{
  if(!t.text.toLowerCase().includes(s)) return;
  if(sf=="completed" && !t.done) return;
  if(sf=="pending" && t.done) return;
  if(cf!="all" && t.cat!=cf) return;

  taskList.innerHTML+=`
  <li class="${t.done?'completed':''}">
  ${t.text} - ${t.cat} - ${t.date}
  <button onclick="toggle(${i})">✔</button>
  <button onclick="edit(${i})">✏</button>
  <button onclick="del(${i})">🗑</button>
  </li>`;
 });
}

function toggleDark(){
 document.body.classList.toggle("dark");
}

displayTasks();
