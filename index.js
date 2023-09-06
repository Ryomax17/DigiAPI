document.addEventListener("DOMContentLoaded", function() {
    function getRandomDigimonId() {
        return Math.floor(Math.random() * 1422) + 1;
    }
  
    const randomDigimonIds = [];
  
    for (let i = 0; i < 14; i++) {
        randomDigimonIds.push(getRandomDigimonId());
    }
    
    async function getRandomDigimon(id){
        const response = await fetch(`https://www.digi-api.com/api/v1/digimon/${id}`)
        const digimons = await response.json();
        console.log(digimons);
        return digimons;
    }

    async function pushDigimons(){
          randomDigimonIds.forEach(async x => {
            await getRandomDigimon(x).then(digimon => {
                const nombre = digimon.name;
                const level = digimon.levels.length>=1? digimon.levels[0].level: "Unknown";
                const type = digimon.types.length>=1? digimon.types[0].type: "Unknown";
                const attribute = digimon.attributes.length>=1? digimon.attributes[0].attribute: "Unknown";
                const skills = digimon.skills || [];
                
                let skillsList = "";
                
                for (let i = 0; i < skills.length; i++) {
                  const skill = skills[i].skill || "";
                  skillsList += `${i+1}) ${skill}<br>`;
                }
          
                const imagenUrl = digimon.images[0].href;
                console.log(digimon);
          
                const digimonElement = document.createElement("div");
                digimonElement.innerHTML = `
                    <h2>${nombre}</h2>
                    <h4>Atributo: ${attribute}</h4>
                    <h4>Tipo: ${type}</h4>
                    <h4>Etapa: ${level}</h4>
                    <img src="${imagenUrl}" alt="Imagen de ${nombre}">
                    <h4 id="skill">Ataques Especiales:</h4>
                    <p id="skills">${skillsList}</p>
                `;
          
                digimonInfo.appendChild(digimonElement);
            })
        })
    }
    pushDigimons();
  });
