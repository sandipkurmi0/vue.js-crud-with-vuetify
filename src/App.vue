<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        <v-btn to="/" text>
          Home
        </v-btn>
      </div>
      <v-btn to="/tutorials" text class="mr-2">
        Tutorials
      </v-btn>

      <v-btn to="/add" text>Add</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>
