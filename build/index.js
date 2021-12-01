"use strict";
var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");
var listaSalva = localStorage.getItem("@listagem_tasks");
var tasks = listaSalva !== null && JSON.parse(listaSalva) || null;
function listarTasks() {
    listElement.innerHTML = "";
    tasks.map(function (item) {
        var todoElement = document.createElement("li");
        var taskText = document.createTextNode(item);
        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        //pegar posição do item que esta no array
        var posicao = tasks.indexOf(item);
        linkElement.setAttribute("onclick", "deleteTask(" + posicao + ")");
        linkElement.setAttribute("style", "margin-left: 10px");
        var linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText);
        todoElement.appendChild(taskText); // colocando dentro da li o taskText
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    });
}
listarTasks();
function addTasks() {
    if (inputElement.value === "") {
        alert('Digite alguma tarefa !');
        return false;
    }
    else {
        var taskDigitada = inputElement.value;
        tasks.push(taskDigitada);
        inputElement.value = "";
        listarTasks();
        saveDados();
    }
}
buttonElement.onclick = addTasks;
function deleteTask(posicao) {
    tasks.splice(posicao, 1),
        listarTasks(),
        saveDados();
}
function saveDados() {
    localStorage.setItem("@listagem_tasks", JSON.stringify(tasks));
}
