const inputText = document.querySelector("#input_text")
const addName = document.querySelector("#add_name")
const removeName = document.querySelector("#remove_name")
const addButton = document.querySelector("#add_button")
const removeButton = document.querySelector("#remove_button")
const printButton = document.querySelector("#print_button")
const list = document.querySelector("#list")
let indice = 0
const checkbox = document.querySelector("input[type=checkbox]")
const listName = document.querySelector("#list_name > p")


addName.addEventListener('click', () => {
  const inputValue = inputText.value.trim()
  if (listName.innerHTML != "") {
    alert('Nome já preenchido')
  } else {
    if (inputValue) {
      listName.innerHTML = `Nome da lista: ${inputValue}`
    } else {
      alert("Preencha o campo!")
    }
  }
  
  inputText.value = ""
  inputText.focus()
})

removeName.addEventListener("click", () => {
  if (listName.innerHTML != "") {
    listName.innerHTML = ""
  } else {
    alert('Não há nome para apagar!')
  }
})

function sortedNumber() {
  const listAll = [...document.querySelectorAll(".list")]
  listAll.forEach((element, indice) => {
    const numberText = element.querySelector('.spn-txt').innerHTML.split(". ")

    const string_1 = (indice + 1) + ". "
    const string_2 = numberText[1]
    const string_3 = string_1 + string_2
    element.querySelector('.spn-txt').innerHTML = string_3
  })
}

addButton.addEventListener("click", addListFunction)

function addListFunction() {
  const inputValue = inputText.value.trim()

  if (inputValue) {
    const liList = document.createElement("li")
    liList.id = `list${indice + 1}`
    liList.className = checkbox.checked ? "list" : ""
    const liLength = document.querySelectorAll(".list").length

    const listItemText = checkbox.checked
      ? `${liLength + 1}. ${inputValue}`
      : inputValue

    liList.innerHTML = `<span class="spn-txt">${listItemText}</span><span class="close"><ion-icon name="close-circle-outline"></ion-icon></span>`
    list.appendChild(liList)
    
    const closeButtons = [...document.querySelectorAll(".close")]

    closeButtons.forEach((element) => {
      element.addEventListener("click", () => {
        element.parentNode.remove()
        if(liList.classList.contains('list')) {
          sortedNumber()
        }
      })
    })

    list.lastElementChild.scrollIntoView()
    indice++
  } else {
    alert("Adicione alguma coisa na lista!")
  }
  inputText.value = ""
  inputText.focus()
}

inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault()
    // Trigger the button element with a click
    addListFunction()
  }
})


removeButton.addEventListener("click", () => {
  if (!list.firstChild) {
    alert("Não tem itens para remover!")
  } else {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }
  }
})

printButton.addEventListener("click", () => {
  // para imprimir a lista de compras
  window.print()
})
