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
    taskForm.preventDefault()
   
})

//There are many different types of tasks. tasks var will contain all tasks.
let tasks = [] 
let today = [] 
let upcoming = [] 
let completed = [] 
let high = [] 
let medium = [] 
let low = [] 


function getTaskInfo(){
    let task= {} ;
    task.taskName = taskName.value 
    task.dueDate = dueDate.value
    task.dueTime = dueTime.value
    task.priority = priority.value

    
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