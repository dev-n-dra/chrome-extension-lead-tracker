const inputBtn = document.querySelector('.input-btn')
const tabBtn = document.querySelector('.tab-btn')
const deleteBtn = document.querySelector('.delete-btn')
const inputEl = document.querySelector('.input-el')
const ulEl = document.querySelector('.ul-el')

// initilize an array to store all our leads
let leads = []

// renderLeads function renders the leads inside the leads array to the extension window
function render(items) {
    let listItems = ""
    console.log(listItems)
    for (let i = 0; i < items.length; i++) {

        listItems += ` <li><a href="${items[i]}" target="blank">${items[i]}</a></li> `
    }
    ulEl.innerHTML = listItems
}


inputBtn.addEventListener('click', saveInput)
    // saveInput function save the input leads to the leads array and local storage
function saveInput() {
    if (inputEl.value !== "") {
        leads.push(inputEl.value)
        inputEl.value = ''
        localStorage.setItem("leads", JSON.stringify(leads))
        render(leads)
    }
}
tabBtn.addEventListener('click', saveTab)
    // saveTab function save the current tab to the leads array and local storage
function saveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        render(leads)
    })
}
// this variable is to render the leads stored in local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))
if (leadsFromLocalStorage) {
    leads = leadsFromLocalStorage
    render(leads)
}


deleteBtn.addEventListener('dblclick', deleteAll)
    // deleteAll function delete all the leads from the local storage and the leads array
function deleteAll() {
    localStorage.clear()
    leads = []
    render(leads)
}