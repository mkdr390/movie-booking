window.castDataList = [];

function renderCastList() {
  const castLister = document.getElementById("cast-lister");
  castLister.innerHTML = "";
  const castList = document.createElement("ul");
  
	window.castDataList.map((castData, index) => {
    const castItem = document.createElement("li");
    const castItemHolder = document.createElement("div");
    castItemHolder.style = "text-align: left;";
    const nameItem = document.createElement("span");
    nameItem.innerHTML = castData.name;
    const closeItem = document.createElement("button");
    closeItem.style = "margin-left: 15px";
    closeItem.innerHTML = "X";
    closeItem.onclick = () => {
       window.castDataList.splice(index, 1);
       renderCastList();
    }
    
    castItemHolder.appendChild(nameItem);
    castItemHolder.appendChild(closeItem);

        castItem.appendChild(castItemHolder);
        castList.appendChild(castItem);
        
        castLister.appendChild(castList);
  })
}


function renderCastInputs() {
	const castHolder = document.getElementById("cast-holder");
  
  const createButton = document.createElement("button");
  createButton.innerHTML = "Add Cast";
  createButton.onclick = () => {
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Cast name";
    
    const imageInput = document.createElement("input");
    imageInput.type = "text";
    imageInput.placeholder = "Cast image";
    
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.onclick = () => {
      
      if (nameInput.value && imageInput.value) {
      
      	window.castDataList.push({ name: nameInput.value, image: imageInput.value });

        renderCastList();
        castHolder.innerHTML = "";
        castHolder.appendChild(createButton);
      }
      
    }
    
    castHolder.innerHTML = '';
    castHolder.appendChild(nameInput);
    castHolder.appendChild(imageInput);
    castHolder.appendChild(saveButton);
  }
  
  castHolder.appendChild(createButton);
}

renderCastInputs();