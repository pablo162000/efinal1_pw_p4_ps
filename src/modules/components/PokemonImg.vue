<template>
   <div class="contenedor-imagen">

<!--<img class="imagenOculta" :src="url" alt="no se puede mostrar" />-->
<img class="imagenPokemon" v-if="mostrarPokemon" :src="url" alt="no se puede mostrar" />

</div>
</template>

<script>
export default {
    props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    mostrarPokemon: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    url() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
}
</script>

<style>
.imagenOculta {
  filter: brightness(0);
}
.imagenNegra {
    height: 300px;

    width: 400px;
}
.imagenPokemon{
    margin-top: 50px;
    margin-right: 35px;
}
img {
  /*ccon este estilo es como el elemento sale flotando*/
  height: 200px;
  right: 40%;
}
.contenedor-imagen {
  height: 400px;
}

</style>