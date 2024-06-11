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
console.log(date.toLocaleString('en-US', { hour12: false}))


let taskID
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

const mainContainer = document.querySelector('.mailList')

todayButton.addEventListener('click', todayContainer)
upcomingButton.addEventListener('click', upcomingContainer)
overdueButton.addEventListener('click', overdueContainer)

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


addTask.addEventListener('click', ShowMenu )

function ShowMenu(){
    
    Modal.style.display = 'block'
}

taskForm.addEventListener('submit', (taskForm) =>{

    getTaskInfo()
    hideModal()
//Once a task is added Main container should reload incase new task goes in container. 
if(currentList == 'Today'){todayContainer()}
else if(currentList == 'Upcoming'){upcomingContainer()}
else if(currentList == 'Overdue'){overdueContainer()}
    console.log(tasks, today, upcoming, overdue, tasks[0])
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
    taskID = taskID++

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
    

    completionButton.addEventListener('click', ()=>{
        taskItem.remove()

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





let todayTasks = {taskName: "Wakeup", dueDate: '2024-06-10', dueTime:'08:00', priority:'High'}
let todayTasks1 = {taskName: "EatBK", dueDate: '2024-06-10', dueTime:'20:00', priority:'High'}
let todayTasks2 = {taskName: "Sleep", dueDate: '2024-06-10', dueTime:'23:00', priority:'High'}

overdue.push(todayTasks1)
overdue.push(todayTasks2)
today.push(todayTasks)
today.push(todayTasks1)
today.push(todayTasks2)


todayContainer()