<template>
  <h1>Juego Casino</h1>
  <div class="container">
    <div v-if="mostrarJuego">
      <div class="datos">
        <label>Puntuacion: {{ puntuacion }} </label>
        <label>Intento: {{ intento }}</label>
      </div>


      <div class="juego">
        <img v-if="monstrarImagenNegra" class="imagenNegra" src="../store/imagenNegro.png" alt="no se puede mostrar">
        <img v-if="monstrarImagenNegra" class="imagenNegra" src="../store/imagenNegro.png" alt="no se puede mostrar">
        <img v-if="monstrarImagenNegra" class="imagenNegra" src="../store/imagenNegro.png" alt="no se puede mostrar">

       <PokemonImg v-if="mostrar" :pokemonId="id1" :mostrarPokemon="mostrar" />

        <PokemonImg v-if="mostrar" :pokemonId="id2" :mostrarPokemon="mostrar" />
        <PokemonImg v-if="mostrar" :pokemonId="id3" :mostrarPokemon="mostrar" />

        <label>{{ nombre1 }}</label>
        <label>{{ nombre2 }}</label>
        <label>{{ nombre3 }}</label>
      </div>

      <button @:click="obtenerVectorPokemon()">JUGAR</button>
    </div>

    <div  class="victoria"  v-if="mostrarVictoria">
      <label style="color: blue;" for="">Puntaje: {{ puntuacion }}</label>
      <label style="color: blue;"   for="">Felicitaciones ha ganado un premio de $10.000,00 </label>
      <button @:click="reiniciarJuego()">Nuevo Juego</button>
    </div>

    <div class="derrota" v-if="mostrarDerrota">
      <label style="color: red;"  for="">haz utilizado tus 5 intentos</label>
      <label style="color: red;"  for="">El juego termino intentelo Nuevamente</label>

      <button @:click="reiniciarJuego()">Nuevo Juego</button>
  
    </div>
  </div>
</template>

<script>
import PokemonImg from "../components/PokemonImg.vue";
import obtenetFachadaPokemon from "../helpers/clientePokemonApi";

export default {
  data() {
    return {
      id1: 1,
      id2: 1,
      id3: 1,
      monstrarImagenNegra: true,
      mostrar: false,
      nombre1: "XXXXXXXXX",
      nombre2: "XXXXXXXXX",
      nombre3: "XXXXXXXXX",
      puntuacion: 0,
      intento: 0,
      mostrarJuego: true,
      mostrarVictoria: false,
      mostrarDerrota: false,
    };
  },
  components: {
    PokemonImg,
  },
  methods: {
    obtenerNumeroRandomico() {
      //return Math.floor(Math.random() * ( 4- 1) + 1);

      return Math.floor(Math.random() * 4);
    },

    async obtenerVectorPokemon() {
      this.monstrarImagenNegra = false;
      const vectorPokemons = await obtenetFachadaPokemon();
      const arreglo = vectorPokemons;

      const objeto1 = arreglo[this.obtenerNumeroRandomico()];
      const objeto2 = arreglo[this.obtenerNumeroRandomico()];
      const objeto3 = arreglo[this.obtenerNumeroRandomico()];

      this.nombre1 = objeto1.nombre;

      this.nombre2 = objeto2.nombre;
      this.nombre3 = objeto3.nombre;

      this.id1 = objeto1.id;
      this.id2 = objeto2.id;

      this.id3 = objeto3.id;
      this.mostrar = true;
      /*
      if (this.id1 == this.id2 && this.id2 == this.id3) {
        this.puntuacion = this.puntuacion + 5;
      } else {
        this.puntuacion = this.puntuacion;
      }

      if (this.id1 == this.id2 && this.id2 != this.id3) {
        this.puntuacion = this.puntuacion + 2;
      } else if (this.id1 == this.id3 && this.id2 != this.id3) {
        this.puntuacion = this.puntuacion + 2;
      } else if (this.id2 == this.id3 && this.id1 != this.id3) {
        this.puntuacion = this.puntuacion + 2;
      }*/

      this.obtenerPuntaje();

      this.intento++;
      console.log(this.intento);

      if (this.intento >= 6) {
        this.mostrarJuego = false;
        this.mostrarDerrota = true;
      } else if (this.puntuacion >= 10) {
        this.mostrarJuego = false;
        this.mostrarVictoria = true;
      }
    },

    obtenerPuntaje() {
      if (this.intento < 6) {
        if (
          this.id1 == this.id2 &&
          this.id2 == this.id3 &&
          this.id1 == this.id3
        ) {
          this.puntuacion = this.puntuacion + 5;
        } else {
          this.puntuacion = this.puntuacion ;
        }

        if (this.id1 == this.id2 && this.id2 != this.id3) {
          this.puntuacion = this.puntuacion + 2;
        } else if (this.id1 == this.id3 && this.id2 != this.id3) {
          this.puntuacion = this.puntuacion + 2;
        } else if (this.id2 == this.id3 && this.id1 != this.id3) {
          this.puntuacion = this.puntuacion + 2;
        }
      }
    },

    reiniciarJuego() {
      this.monstrarImagenNegra = true;
      this.mostrarJuego = true;
      this.mostrarDerrota = false;
      this.mostrarVictoria = false;
      this.puntuacion = 0;
      this.intento = 0;
      this.mostrar = false;
    },

    // mounted() {
    // this.obtenerVectorPokemon();
    //},
  },
};
</script>

<style>
.juego {
  display: grid;
  grid-template-columns: repeat(3, 500px);
}
.container {
  display: flex;
  align-content: center;
  justify-content: center;
}
.datos {
  display: grid;
  margin-left: 500px;
  margin-bottom: 10px;
  grid-template-columns: repeat(2, 250px);
}
.d1 {
  margin-right: 60px;
}

button {
  border: solid black;
  width: 200px;
  height: 50px;
  

}

.victoria {
display: grid;
}

.derrota {
  display: grid;

}
</style>