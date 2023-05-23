let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const inputDel = document.querySelector("#input-delete")
const inputTab = document.querySelector("#input-tab")

let getItem = JSON.parse(localStorage.getItem("myLeads"))

if(getItem) {
  myLeads = getItem
  render(myLeads)
}

inputTab.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      render(myLeads)
  })
})

function render(leads) {
  let items = ""
  for(let i = 0; i < leads.length; i++){
   items += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`
  }
  ulEl.innerHTML = items
}

inputDel.addEventListener("click", function(){
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function(){
  if(inputEl.value == ""){
    alert("Valor inválido")
  } else {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  }
})


