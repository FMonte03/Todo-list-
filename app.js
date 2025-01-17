/*
dueDate
: 
"2024-06-07"
dueTime
: 
"02:12"
priority
: 
"none"
taskName
: 
"Eat Bread
*/
const date = new Date()
let local = date.toLocaleString('en-US', { hour12: false})



let taskID = 0 
let currentList = 'Today'




{

}

const addTask = document.querySelector('.addButton')
const Modal = document.querySelector('.modal')
const taskName = document.querySelector('#taskName')
const dueDate = document.querySelector('#dueDate')
const dueTime = document.querySelector('#dueTime')
const priority = document.querySelector('#priority')

const taskForm = document.querySelector('.taskForm')
const mainList = document.querySelector('.mainList')
const todayButton = document.querySelector('.today')
const  containerTitle = document.querySelector('.h2Title')
const upcomingButton = document.querySelector('.Upcoming')
const overdueButton = document.querySelector('.Overdue')

const mainContainer = document.querySelector('.mainList')
const lowButton = document.querySelector('#low')
const mediumButton = document.querySelector('#medium')
const highButton = document.querySelector('#high')

todayButton.addEventListener('click', todayContainer)
upcomingButton.addEventListener('click', upcomingContainer)
overdueButton.addEventListener('click', overdueContainer)
lowButton.addEventListener('click', lowContainer)
mediumButton.addEventListener('click', mediumContainer)
highButton.addEventListener('click', highContainer)
let tasks = [] 
let today = [] 
let upcoming = [] 
let overdue = [] 
let high = [] 
let medium = [] 
let low = [] 





// Container methods will wipe current conteiner and replace it with tasks of given time slot. 



function clearTaskItems(){
taskElements = document.getElementsByClassName('taskItem')
    for(let i = taskElements.length; i > 0; i--){
        taskElements[taskElements.length -1 ].remove(); 
    }

}

function todayContainer(){
    currentList,containerTitle.innerHTML = 'Today'
    
    clearTaskItems()
    createTaskElementsIteratevely(today)
    
}

function upcomingContainer(){
    currentList,containerTitle.innerHTML = 'Upcoming'
    clearTaskItems()
    createTaskElementsIteratevely(upcoming)
}


function overdueContainer(){
    currentList,containerTitle.innerHTML = 'Overdue'
    clearTaskItems()
    createTaskElementsIteratevely(overdue)
}

function lowContainer(){
    currentList,containerTitle.innerHTML = 'Low'
    clearTaskItems()
    createTaskElementsIteratevely(low)

}

function mediumContainer(){
    currentList,containerTitle.innerHTML = 'Medium'
clearTaskItems()
createTaskElementsIteratevely(medium)}

function highContainer(){
    currentList,containerTitle.innerHTML = 'High'
    clearTaskItems()
    createTaskElementsIteratevely(high)
}


addTask.addEventListener('click', ShowMenu )

function ShowMenu(){
    
    Modal.style.display = 'block'
}



function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
    
function loadTasksFromLocalStorage() {
        const tasksJSON = localStorage.getItem('tasks');
        if (tasksJSON) {
            tasks = JSON.parse(tasksJSON);
        } else {
            tasks = []
        }
    }



loadTasksFromLocalStorage()


taskForm.addEventListener('submit', (taskForm) =>{
    
    getTaskInfo()//whenever a task gets added the storage needs to be updated, 
    hideModal()
    saveTasksToLocalStorage()
    console.log(tasks)
//Once a task is added Main container should reload incase new task goes in container. 
if(currentList == 'Today'){todayContainer()}
else if(currentList == 'Upcoming'){upcomingContainer()}
else if(currentList == 'Overdue'){overdueContainer()}
else if(currentList == 'Low'){lowContainer()}
else if(currentList == 'Medium'){mediumContainer()}
else if(currentList == 'High'){highContainer()}

    taskForm.preventDefault() //stops whole page from reloading on form submit. 
   
   
})

//There are many different types of tasks. tasks var will contain all tasks.

//a task object will be created and placed into task list. Additionally if task is upcoming, today, or overdue it will also at it to the list. 
function getTaskInfo(){
    let task= {} ;
    task.taskName = taskName.value 
    task.dueDate = dueDate.value
    task.dueTime = dueTime.value
    task.priority = priority.value
    task.ID = taskID //task ID will be used to identify same task so when they are deleted, every array will be checked for that task and if found it will be deleted.
    taskID = taskID + 1; 

    if( isOverdue(task.dueTime, task.dueDate)){
        overdue.push(task)
    }

    if( isToday(task.dueDate)){
        today.push(task)
    }

    if( isUpComing(task.dueTime, task.dueDate )){
        upcoming.push(task)
    }
    
    if(task.priority == "Low"){
        low.push(task)
    }
    if(task.priority == "Medium"){
        medium.push(task)
    }
    if(task.priority == "High"){
        high.push(task)
    }
    
    tasks.push(task)
}
/* template: 
div class="taskItem">
                    <div class="taskLeft">
                        <button class="completionButton"></button>
                        <div class="taskText">Task 2</div> 
                        <div class="time notDue"> 20:25</div>
                    </div>
                    
                    <div class="taskRight">
                        <div class="hPriority">High Priority</div>
                        <div class="category">Category</div>
                    </div>
                        
                    </div>
*/ 


// for future turn this into a for loop that will automatically dynamically generate elemenst based on task lists. so when user selects a list it
// will iterate through the list and generate task elements
let completed  = [] 
//pass task object into function. get TaskId from task object then search all arrays for objects with the same ID and delete them. 
function TaskDelete(taskE){
let allArrays = [tasks,today ,upcoming , overdue ,high ,medium,low ]  
let taskD = JSON.stringify(taskE)
completed.push(taskE)
for(const i of allArrays){
    for(let j in i){
        if(taskD == JSON.stringify(i[j])){       //structure i = array, j = index in array  so ex) today(arrray)[3(index)]
            i.splice(j,1)
        }
        else{}
    }
}

// let i of arr works like the python for i in arr, let j in i works like the python for i in range, one iterates through element the other through index. 
saveTasksToLocalStorage()

}


function createTaskElementsIteratevely(array){
    for(let i in array){
        
        let taskItem = document.createElement('div')
        taskItem.classList.add('taskItem')
    
        

        let taskLeft = document.createElement('div')
        taskLeft.classList.add('taskLeft')
        taskItem.append(taskLeft)

        let completionButton = document.createElement('button')
        completionButton.classList.add('completionButton')
        taskLeft.append(completionButton)

        let taskText = document.createElement('div')
        taskText.classList.add('taskText')
        taskText.innerHTML = array[i].taskName 
        taskLeft.append(taskText)

        let time = document.createElement('div')
        time.classList.add('time')
        time.innerHTML = array[i].dueTime 
        taskLeft.append(time)

        let taskRight = document.createElement('div')
        taskRight.classList.add('taskRight')
        taskItem.append(taskRight)

        let taskPriority = document.createElement('div')
        if(array[i].priority.toLowerCase() == "high"){
            taskPriority.classList.add("hPriority")
            taskPriority.classList.add("Priority")
        }
        else if(array[i].priority.toLowerCase() == "medium"){
            taskPriority.classList.add("mPriority")
            taskPriority.classList.add("Priority")
        }
        else if(array[i].priority.toLowerCase() == "low"){
            taskPriority.classList.add("lPriority")
            taskPriority.classList.add("Priority")
        }
        else{
            taskPriority.classList.add("none")
        }
        taskPriority.innerHTML = array[i].priority + " Priority"
        taskRight.append(taskPriority)  
    
        let date = document.createElement('div')
        date.classList.add('date')
        todaysDate = array[i].dueDate.substring(5,7) +"-"+ array[i].dueDate.substring(8,10)+"-"+ array[i].dueDate.substring(0,4)


        date.innerHTML = todaysDate
        taskRight.append(date)

    completionButton.addEventListener('click', ()=>{
        taskItem.remove()
        TaskDelete(array[i])

    })

mainList.append(taskItem)
    }
}


function hideModal(){
    Modal.style.display = 'none'
}

    let currentYear = date.getFullYear()
    let currentDay = date.getDate()
    let currentMonth = date.getMonth()+1 
    let currentTime = local.substring(11,13)+ local.substring(13,16)
  

 
//if task time and date greater than current time and date than it is overdue.
function isOverdue(taskTime, taskDate){
  
    let taskYear = Number(taskDate.substring(0,4))
    let taskMonth = Number(taskDate.substring(5,7))
    let taskDay = Number(taskDate.substring(8,10))
    let formatedCurrent = currentTime.replace(':','')
    taskTime = taskTime.replace(':','')
        
    if(currentYear> taskYear){
        return true
    }
    
    else if(currentMonth> taskMonth){
        return true
    }                     
    else if(currentDay> taskDay ){
        return true
    }
    else if(currentDay> taskDay && Number(formatedCurrent)> Number(taskTime) )
    
    return false


}

function isToday(taskDate){
    let taskYear = taskDate.substring(0,4)
    let taskMonth = taskDate.substring(5,7)
    let taskDay = taskDate.substring(8,10)
   
    if((currentYear == taskYear )&& (currentDay == taskDay) && (currentMonth == taskMonth) ){
        return true
    }
    return false 
}

function isUpComing(taskTime, taskDate){
    
    let taskYear = Number(taskDate.substring(0,4))
    let taskMonth = Number(taskDate.substring(5,7))
    let taskDay = Number(taskDate.substring(8,10))
     taskTime = taskTime.replace(':','')
    let formatedCurrent = currentTime.replace(':','')
    
    if(currentYear< taskYear){
        return true
    }
    
    else if(currentMonth< taskMonth){
        return true
    }
    else if(currentDay< taskDay ){
        return true
    }
    else if(currentDay = taskDay && Number(formatedCurrent)< Number(taskTime))
    
    return false

}


//Local Storage works in key value pairs, use local storage as if it was a map, use functions localStorage.getItem setItem removeItem




repopulateFeatures()
if(currentList == 'Today'){todayContainer()}
else if(currentList == 'Upcoming'){upcomingContainer()}
else if(currentList == 'Overdue'){overdueContainer()}
else if(currentList == 'Low'){lowContainer()}
else if(currentList == 'Medium'){mediumContainer()}
else if(currentList == 'High'){highContainer()}
function repopulateFeatures(){// readd feature tasks that were removed after page refresh
   for(let task of tasks){
    if( isOverdue(task.dueTime, task.dueDate)){
        overdue.push(task)
    }

    if( isToday(task.dueDate)){
        today.push(task)
    }

    if( isUpComing(task.dueTime, task.dueDate )){
        upcoming.push(task)
    }
    
    if(task.priority == "Low"){
        low.push(task)
    }
    if(task.priority == "Medium"){
        medium.push(task)
    }
    if(task.priority == "High"){
        high.push(task)
    }}
}

