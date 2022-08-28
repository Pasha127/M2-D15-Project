const titleInput = document.querySelector("#titleInput");
const descriptionInput = document.querySelector("#descriptionInput");
const genreInput = document.querySelector("#genreInput");
const urlInput = document.querySelector("#urlInput");
const addContentBtn = document.querySelector("#addContentBtn");
const body = document.querySelector("body");

const addContent = (content) => {
 
  fetch(`https://striveschool-api.herokuapp.com/api/movies/`, {
    method: "POST",
    headers: {'Content-Type': 'application/json',"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE1MTI1MTgsImV4cCI6MTY2MjcyMjExOH0.YpsgajqhspK1z8A5EyOdHV6kTmpEm1iD9zreNQ2kmxU"}, 
    body: JSON.stringify(content)
  }).then(res => {
    
    console.log("Request complete! response:", res);
  }).catch(err => console.log('post failed:', err));
  clearInputs();  
  createAlert("Submitted Item", "success");
}

const createAlert = (string,color) => {
  const previousAlerts = document.querySelectorAll(".alertBar");
  for(bar of previousAlerts){bar.remove()};
  const alertContainer = document.createElement("div");
  alertContainer.setAttribute("class", "container d-flex justify-content-center");
  const alertBody = document.createElement("div");
  alertBody.setAttribute("class", `alert alert-${color} alertBar`);
  alertBody.setAttribute("role", "alert");
  body.prepend(alertContainer);
  alertContainer.append(alertBody);
  alertBody.innerText = `${string}`;
  setTimeout(function () {alertContainer.remove()}, 5000)

}

const gatherContent = ()=>{
  const content = {name:titleInput.value, description:descriptionInput.value, category:genreInput.value, imageUrl: urlInput.value };
  console.log(content)
  addContent(content)
}

const clearInputs = ()=>{
  titleInput.value = "";
  descriptionInput.value = "";
  genreInput.value = "";
  urlInput.value = "";  
}

window.onload = () =>{
  addContentBtn.addEventListener("click", gatherContent)
  testFetch();
}
const testFetch = () =>{
fetch("https://striveschool-api.herokuapp.com/api/movies/Thriller", {
            method: "GET",
            headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}})
            
            .then(res => res.json()).then(data => console.log(data))
            .catch(err => console.log('post failed:', err));
}