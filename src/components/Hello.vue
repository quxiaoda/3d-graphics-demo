<template>
  <div class="hello">
    <template v-for="(val, index) of routeList">
        <h2>{{val.title}}</h2>
        <ul>
          <li v-for="(v, i) of val.list">
            <router-link :to="v.path">{{v.name}}</router-link>
          </li>
        </ul>  
    </template>
  </div>
</template>

<script>
import routeList from '@/router/route'

export default {
  name: 'hello',
  data () {
    return {
      routeList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
