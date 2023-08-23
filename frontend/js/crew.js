window.crewDataList = [];

function renderCrewList() {
  const crewLister = document.getElementById("crew-lister");
  crewLister.innerHTML = "";
  const crewList = document.createElement("ul");
  
	window.crewDataList.map((crewData, index) => {
    const crewItem = document.createElement("li");
    const crewItemHolder = document.createElement("div");
    crewItemHolder.style = "text-align: left;";
    const nameItem = document.createElement("span");
    nameItem.innerHTML = crewData.name;
    const closeItem = document.createElement("button");
    closeItem.style = "margin-left: 15px";
    closeItem.innerHTML = "X";
    closeItem.onclick = () => {
       window.crewDataList.splice(index, 1);
       renderCrewList();
    }
    
    crewItemHolder.appendChild(nameItem);
    crewItemHolder.appendChild(closeItem);

        crewItem.appendChild(crewItemHolder);
        crewList.appendChild(crewItem);
        
        crewLister.appendChild(crewList);
  })
}


function renderCrewInputs() {
	const crewHolder = document.getElementById("crew-holder");
  
  const createButton = document.createElement("button");
  createButton.innerHTML = "Add Crew";
  createButton.onclick = () => {
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Crew name";
    
    const imageInput = document.createElement("input");
    imageInput.type = "text";
    imageInput.placeholder = "Crew image";
    
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.onclick = () => {
      
      if (nameInput.value && imageInput.value) {
      
      	window.crewDataList.push({ name: nameInput.value, image: imageInput.value });

        renderCrewList();
        crewHolder.innerHTML = "";
        crewHolder.appendChild(createButton);
      }
      
    }
    
    crewHolder.innerHTML = '';
    crewHolder.appendChild(nameInput);
    crewHolder.appendChild(imageInput);
    crewHolder.appendChild(saveButton);
  }
  
  crewHolder.appendChild(createButton);
}

renderCrewInputs();