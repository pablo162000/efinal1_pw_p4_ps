
const obtenerPokemons = async () => {

    const vectorObj = await obtenerNombresPokemon(obtenerVectorNumerico())
    return vectorObj


}


function getNumeroAleatorio(min, max) {
    max++
    return Math.floor(Math.random() * (max - min) + min)
    //Math.floor(((Math.random())*604)+1)

}


const obtenerVectorNumerico = () => {
    const idPokemonRepetido = getNumeroAleatorio(1,600)
    const vector = [getNumeroAleatorio(1,600),getNumeroAleatorio(1,600), getNumeroAleatorio(1,600), getNumeroAleatorio(1,600), getNumeroAleatorio(1,600)]
    return vector;
}

const consumirApi = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(result => result.json())
    return data
}

const obtenerNombresPokemon = async ([id1, id2, id3, id4, id5] = []) => {
    const data1 = await consumirApi(id1)
    const data2 = await consumirApi(id2)
    const data3 = await consumirApi(id3)
    const data4 = await consumirApi(id4)
    const data5 = await consumirApi(id5)

    const obj1 = {
        nombre: data1.name,
        id: data1.id
    }
    const obj2 = {
        nombre: data2.name,
        id: data2.id
    }
    const obj3 = {
        nombre: data3.name,
        id: data3.id
    }
    const obj4 = {
        nombre: data4.name,
        id: data4.id
    }
    const obj5 = {
        nombre: data5.name,
        id: data5.id
    }

    const vectorObjetos = [ obj1, obj2, obj3, obj4, obj5 ]

    return vectorObjetos
}

const obtenetFachadaPokemon = async () => {
    return await obtenerPokemons()

}

export default obtenetFachadaPokemon 