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
"Eat Brea
*/
const date = new Date()
let local = date.toLocaleString('en-US', { hour12: false})
console.log(date.toLocaleString('en-US', { hour12: false}))


const addTask = document.querySelector('.addButton')
const Modal = document.querySelector('.modal')
const taskName = document.querySelector('#taskName')
const dueDate = document.querySelector('#dueDate')
const dueTime = document.querySelector('#dueTime')
const priority = document.querySelector('#priority')

const taskForm = document.querySelector('.taskForm')
const mainList = document.querySelector('.mainList')

addTask.addEventListener('click', ShowMenu )

function ShowMenu(){
    
    Modal.style.display = 'block'
}

taskForm.addEventListener('submit', (taskForm) =>{

    getTaskInfo()
    hideModal()
    createTaskElement()
   
    console.log(tasks, today, upcoming, overdue, tasks[0])
    taskForm.preventDefault() //stops whole page from reloading on form submit. 
  
   
})

//There are many different types of tasks. tasks var will contain all tasks.
let tasks = [] 
let today = [] 
let upcoming = [] 
let overdue = [] 
let high = [] 
let medium = [] 
let low = [] 

//a task object will be created and placed into task list. Additionally if task is upcoming, today, or overdue it will also at it to the list. 
function getTaskInfo(){
    let task= {} ;
    task.taskName = taskName.value 
    task.dueDate = dueDate.value
    task.dueTime = dueTime.value
    task.priority = priority.value

    if( isOverdue(task.dueTime, task.dueDate)){
        overdue.push(task)
    }

    if( isToday(task.dueDate)){
        today.push(task)
    }

    if( isUpComing(task.dueTime, task.dueDate )){
        upcoming.push(task)
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




function createTaskElement(){
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
    taskText.innerHTML = tasks[tasks.length - 1].taskName 
    taskLeft.append(taskText)

    let time = document.createElement('div')
    time.classList.add('time')
    time.innerHTML = tasks[tasks.length - 1].dueTime 
    taskLeft.append(time)

    let taskRight = document.createElement('div')
    taskRight.classList.add('taskRight')
    taskItem.append(taskRight)

    let taskPriority = document.createElement('div')
    taskPriority.classList.add('hPriority') //cannot be hardcoded needs to be in accordance to priority value 
    taskPriority.innerHTML = tasks[tasks.length - 1].priority 
    taskRight.append(taskPriority)  
    

    

mainList.append(taskItem)
}


function hideModal(){
    Modal.style.display = 'none'
}

    let currentYear = date.getFullYear()
    let currentDay = date.getDate()
    let currentMonth = date.getMonth()+1 
    let currentTime = local.substring(10,13)+ local.substring(13,16)

 
//if task time and date greater than current time and date than it is overdue.
function isOverdue(taskTime, taskDate){
   
    let taskYear = taskDate.substring(0,4)
    let taskMonth = taskDate.substring(5,7)
    let taskDay = taskDate.substring(8,9)
    
    taskTime = taskTime.replace(':','')
    if(currentYear> taskYear){
        return true
    }
    else if(currentDay> taskDay){
        return true
    }
    else if(currentMonth> taskMonth){
        return true
    }
    else if(currentTime> taskTime){
        return true
    }
    return false


}

function isToday(taskDate){
    let taskYear = taskDate.substring(0,4)
    let taskMonth = taskDate.substring(5,7)
    let taskDay = taskDate.substring(8,10)
    console.log(currentDay,taskDay, taskDate)
    if((currentYear == taskYear )&& (currentDay == taskDay) && (currentMonth == taskMonth) ){
        return true
    }
    return false 
}

function isUpComing(taskTime, taskDate){
    
    let taskYear = taskDate.substring(0,4)
    let taskMonth = taskDate.substring(5,7)
    let taskDay = taskDate.substring(8,9)
     taskTime = taskTime.replace(':','')
    let formatedCurrent = currentTime.replace(':','')
     console.log(taskTime, formatedCurrent)
    if(currentYear< taskYear){
        return true
    }
    else if(currentDay< taskDay){
        return true
    }
    else if(currentMonth< taskMonth){
        return true
    }
    else if(formatedCurrent< taskTime){
        return true
    }
    return false

}

