let listElement = document.querySelector("#app ul") as HTMLUListElement
let inputElement = document.querySelector("#app input") as HTMLInputElement
let buttonElement = document.querySelector("#app button") as HTMLButtonElement



let listaSalva: (string | null) = localStorage.getItem("@listagem_tasks")
let tasks: string[] = listaSalva !== null && JSON.parse(listaSalva) || null


function listarTasks(){
  listElement.innerHTML = ""
  tasks.map( item => {
    let todoElement = document.createElement("li")
    let taskText = document.createTextNode(item)

    let linkElement = document.createElement("a")
    linkElement.setAttribute("href", "#")

    //pegar posição do item que esta no array
    let posicao = tasks.indexOf(item)

    linkElement.setAttribute("onclick", `deleteTask(${posicao})`)
    linkElement.setAttribute("style", "margin-left: 10px")
    
    let linkText = document.createTextNode("Excluir")
    linkElement.appendChild(linkText)


    todoElement.appendChild(taskText) // colocando dentro da li o taskText
    todoElement.appendChild(linkElement)
    listElement.appendChild(todoElement)
  })
}
listarTasks()


function addTasks(){
  if(inputElement.value === ""){
    alert('Digite alguma tarefa !')
    return false
  }else{
    let taskDigitada: string = inputElement.value
    tasks.push(taskDigitada)
    inputElement.value = ""
    listarTasks()
    saveDados()
  }
  
}

buttonElement.onclick = addTasks


function deleteTask(posicao: number){
  tasks.splice(posicao, 1),
  listarTasks(),
  saveDados()
}


function saveDados(){
  localStorage.setItem("@listagem_tasks", JSON.stringify(tasks))
}