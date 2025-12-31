let tasks = JSON.parse(localStorage.getItem("neurotasks")) || [];
let filter="all";

function addTask(){
 let text=taskInput.value;
 let category=category.value;
 let date=dueDate.value;

 if(text==="") return alert("Enter your thought");

 let priority=text.length>15?"High Focus":"Quick Win";
 tasks.push({text,category,date,priority,done:false});
 localStorage.setItem("neurotasks",JSON.stringify(tasks));
 displayTasks();
 taskInput.value="";
}

function setFilter(f){filter=f;displayTasks();}

function toggle(i){
 tasks[i].done=!tasks[i].done;
 localStorage.setItem("neurotasks",JSON.stringify(tasks));
 displayTasks();
}

function del(i){
 tasks.splice(i,1);
 localStorage.setItem("neurotasks",JSON.stringify(tasks));
 displayTasks();
}

function displayTasks(){
 if(!taskList) return;
 let html="";
 tasks.forEach((t,i)=>{
  if(filter=="completed" && !t.done) return;
  if(filter=="pending" && t.done) return;
  html+=`
   <li class="${t.done?'completed':''}">
   <b>${t.text}</b><br>
   <small>${t.category} | ${t.priority}</small>
   <span>
   <button onclick="toggle(${i})">✔</button>
   <button onclick="del(${i})">✖</button>
   </span></li>`;
 });
 taskList.innerHTML=html;
}

if(document.getElementById("aiBox")){
 let completed=tasks.filter(t=>t.done).length;
 let total=tasks.length;
 let rate= total?Math.round(completed/total*100):0;
 aiBox.innerHTML=`
  <h3>Focus Score : ${rate}%</h3>
  <p>${rate>70?"Excellent discipline":"You need more consistency!"}</p>`;
}

displayTasks();
