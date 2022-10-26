const displayA = (id) => {
    let modal = document.querySelector('.modal')
    modal.style.display ="block" 
    
    //console.log("meu id",id)
    ///1-buscar pokemon na api
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(response => {  
      
            let imagetypes = ''
            for (let index = 0; index < response.types.length; index++) {
                imagetypes += `<img class="tipagem" src="./assets/${response.types[index].type.name}.svg" title="${response.types[index].type.name}">`
                
            }

        const accumulator = `
        <div class="boxPokemon">
        <img Class="pokedexImg" src="assets/pokedex.png" alt="">
        <h3>${response.id}  ㅤㅤㅤㅤㅤ  ${response.name}</h3>
        <div class="pokemonTypesContainer">
        ${imagetypes}
        </div>
        <img id="card-image"  alt="${response.name}" src="https://pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/${response.name}.gif"/>
        <img id="pokemonType" src="./assets/tipagem/${response.types[0].type.name}.png">
        <p>${response.types.map(typeIform => typeIform.type.name).join(' | ')}</p>
        </div>
        `
        console.log(accumulator)
        
        const div = document.querySelector('[data-js="modal"]')
        div.innerHTML = accumulator
    })
    ///salvar pokemon em uma variavel
    // criar imagen html e adicionar link da imagen de pokemon
    // criar um titulo H3 com o nome do pokemon
    // exibir isso dentro do pop-up 

    
}
const displayB = () => {
    let modal = document.querySelector('.modal')
    modal.style.display ="none" 
}
 //////////////////////////////////////////////////////////////////////////////////////
const fetchPokemons = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = 1; i <= 150; i++){
        pokemonPromises.push( fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
    const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)


        accumulator += 
        `<li class= "card ${types[0]} "onclick="displayA(${pokemon.id})">
        <img class="card-image"  alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" />
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">${types.join(' | ')}</p>
        </li>`
        return accumulator
    },'')

    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = lisPokemons
        })
}
fetchPokemons()