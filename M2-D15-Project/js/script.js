$('#myCarousels').carousel({
    interval: 10000
  })
  
  $('.carousels .carousel-items').each(function(){
      var minPerSlide = 3;
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
              next = $(this).siblings(':first');
            }
          
          next.children(':first-child').clone().appendTo($(this));
        }
  });
  

  document.addEventListener("click", e => {
    let handle
    if (e.target.matches(".handles")) {
      handle = e.target
    } else {
      handle = e.target.closest(".handles")
    }
    if (handle != null) onHandleClick(handle)
  })
  
  const throttleProgressBar = throttle(() => {
    document.querySelectorAll(".progress-bars").forEach(calculateProgressBar)
  }, 250)
  window.addEventListener("resize", throttleProgressBar)
  
  document.querySelectorAll(".progress-bars").forEach(calculateProgressBar)
  
  function calculateProgressBar(progressBar) {
    progressBar.innerHTML = ""
    const slider = progressBar.closest(".rows").querySelector(".sliders")
    const itemCount = slider.children.length
    const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue("--items-per-screen")
    )
    let sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
  
    if (sliderIndex >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1)
      sliderIndex = progressBarItemCount - 1
    }
  
    for (let i = 0; i < progressBarItemCount; i++) {
      const barItem = document.createElement("div")
      barItem.classList.add("progress-items")
      if (i === sliderIndex) {
        barItem.classList.add("active")
      }
      progressBar.append(barItem)
    }
  }
  
  function onHandleClick(handle) {
    const progressBar = handle.closest(".rows").querySelector(".progress-bars")
    const slider = handle.closest(".containers").querySelector(".sliders")
    const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = progressBar.children.length
    if (handle.classList.contains("left-handle")) {
      if (sliderIndex - 1 < 0) {
        slider.style.setProperty("--slider-index", progressBarItemCount - 1)
        progressBar.children[sliderIndex].classList.remove("active")
        progressBar.children[progressBarItemCount - 1].classList.add("active")
      } else {
        slider.style.setProperty("--slider-index", sliderIndex - 1)
        progressBar.children[sliderIndex].classList.remove("active")
        progressBar.children[sliderIndex - 1].classList.add("active")
      }
    }
  
    if (handle.classList.contains("right-handle")) {
      if (sliderIndex + 1 >= progressBarItemCount) {
        slider.style.setProperty("--slider-index", 0)
        progressBar.children[sliderIndex].classList.remove("active")
        progressBar.children[0].classList.add("active")
      } else {
        slider.style.setProperty("--slider-index", sliderIndex + 1)
        progressBar.children[sliderIndex].classList.remove("active")
        progressBar.children[sliderIndex + 1].classList.add("active")
      }
    }
  }
  
  function throttle(cb, delay = 1000) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }
  
    return (...args) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }
  
      cb(...args)
      shouldWait = true
      setTimeout(timeoutFunc, delay)
    }
  }

let globalMovie = [];  
const getResult = (d)=>{
   globalMovie = d;
}

  const getContent = (genre) =>{
    let result = [];
     
    fetch(`https://striveschool-api.herokuapp.com/api/movies/${genre}`, {
                method: "GET",
                headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA3ODg0NDFlYjc2ZDAwMTUxNTAxZjgiLCJpYXQiOjE2NjE3MTE5MzEsImV4cCI6MTY2MjkyMTUzMX0.POicuDG7JzC4m-uBLepp5cyhmtauXrdmnE9e4Tg7OTo"}})
                
                .then(res => res.json()).then(data => getResult(data))
                .catch(err => console.log('post failed:', err));           
                return result;     
    }
  