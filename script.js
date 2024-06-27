const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-color");
const clearAll = document.querySelector(".clear-all");
const pickedColor = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copyColor = elem => {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText = "Copied";
  setTimeout(() => elem.innerText = elem.dataset.color, 1000)
}

const showColors = () => {
  if(!pickedColor.length) return;
  colorList.innerHTML = pickedColor.map(color => 
     `<li class="color">
     <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
     <span class="value" data-color="${color}">${color}</span>
  </li>`
    
    ).join("");

    document.querySelector(".picked-colors").classList.remove("hide");
   //Add a click event listener to each color element to copy the color code
    document.querySelectorAll(".color").forEach(li => {
      li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });

}
showColors();

const activateEyeDropper =  () => {
  document.body.style.display = "none";
 setTimeout(async () =>{
  try {
    // Opening the eye dropper and getting selected color
    const eyeDropper = new EyeDropper();
    const {sRGBHex} = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);
    // Adding the color to the list if it doesn't exist
    if(!pickedColor.includes(sRGBHex)) {
      pickedColor.push(sRGBHex)
    localStorage.setItem("picked-colors", JSON.stringify(pickedColor));
    showColors();
    }
   
  } catch (error) {
    console.log("Failed to copy the color code!");
  }

document.body.style.display = "block";
 }, 10);

}

//Clearing all picked colors and updating the local storage
const clearAllColors = () => {
  pickedColor.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColor));
  document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);