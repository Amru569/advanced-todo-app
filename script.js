let tasks = JSON.parse(localStorage.getItem("neurotasks")) || [];
let filter = "all";

document.addEventListener("DOMContentLoaded",()=>{
 let btn=document.getElementById("addBtn");
 if(btn){
   btn.addEventListener("click",addTask);
   Notification.requestPermission();
 }
 displayTasks();
 loadAI();
 setInterval(checkReminders,60000);
});

function addTask(){
 let text=document.getElementById("taskInput").value;
 let category=document.getElementById("category").value;
 let due=document.getElementById("dueDate").value;

 if(text==""||due=="") return alert("Fill all fields");

 tasks.push({text,category,due,done:false});
 localStorage.setItem("neurotasks",JSON.stringify(tasks));
 document.getElementById("taskInput").value="";
 displayTasks();
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
 if(!document.getElementById("taskList")) return;
 let html="";
 tasks.forEach((t,i)=>{
  if(filter=="completed" && !t.done) return;
  if(filter=="pending" && t.done) return;

  let remain = Math.max(0,Math.floor((new Date(t.due)-new Date())/60000));
  html+=`
  <li class="${t.done?'completed':''}">
   <div>
    <b>${t.text}</b><br>
    <small>${t.category} | ${remain} min left</small>
   </div>
   <span>
    <button onclick="toggle(${i})">✔</button>
    <button onclick="del(${i})">✖</button>
   </span>
  </li>`;
 });
 document.getElementById("taskList").innerHTML=html;
}

function checkReminders(){
 tasks.forEach(t=>{
  if(!t.done && new Date(t.due)<new Date()){
   new Notification("⏰ Task Overdue",{
    body:t.text
   });
  }
 });
}

function loadAI(){
 if(!document.getElementById("aiBox")) return;
 let done=tasks.filter(t=>t.done).length;
 let total=tasks.length;
 let score=total?Math.round(done/total*100):0;
 aiBox.innerHTML=`
 <h3>Focus Score: ${score}%</h3>
 <p>${score>70?"Excellent discipline!":"Let's improve your consistency 💪"}</p>`;
}
