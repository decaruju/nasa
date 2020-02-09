<template>
  <div class="app-container" :class="{before:!flood, during:flood}">
      <div class="app">
          <router-view />
      </div>
      <div class="topbar">
          <img v-if="flood" @click="flood = !flood" src="../public/logo_pendant.png" width="50px"/>
          <img v-else @click="flood = !flood" src="../public/logo_avant.png" width="50px"/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
     data() {
         return {
             flood: false,
         }
     },
}
</script>

<style lang="scss">
 * {
     outline: none;
 }
  html, body, .app-container, .app {
      height: 100%;
      background-color: #FAFAFF;
      padding: 0;
      margin: 0;
      color: #2E4478;

      .topbar {
          width: 100%;
          padding: 20px;
          background-color: #A0AECE;
          box-sizing: border-box;
          box-shadow: 5px 0 10px 4px;
          position: absolute;
          top: 0;

          img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
        }
      }
  }
.app-container {
    margin-top: 5%;
}
 html body {
     .app {
         background-color: #D0D8E9;
         width: 80%;
         margin: 0 auto;
     }

     .input-container {
         position: relative;
     }

     .input-container {
         width: 100%;
         padding: 10% 10% 0 10%;
         box-sizing: border-box;
     }

     .input-with-placeholder {
         position: relative;
     }
     
     input {
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        border-radius: 5px;
        border: none;
        border-bottom: 4px solid #2E4478;
        box-shadow: 2px 2px 5px 5px #A0AECE;
        background-color: #FAFAFF;
        font-size: 24px;

        + .placeholder {
            position: absolute;
            top: 32px;
            left: 10px;
            font-size: 32px;
            transition: all 0.2s ease-in-out;
        }

        &:focus, &:valid {
            + .placeholder {
                font-size: 20px;
                top: -30px;
            }
        }

        &[type="checkbox"], &[type="radio"] {
            box-shadow: none;
            width: 20px;
        }
     }

     .address-info {
         .field-name {
             font-weight: bold;
             font-size: 24px;
         }
     }

 }
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
 .button-container {
     width: 100%;
     padding: 20%;
     box-sizing: border-box;

     button {
         background-color: #A0AECE;
         box-shadow: 4px 4px 10px 4px #2E4478;
         width: 100%;
         border: none;
         padding: 10%;
         font-size: 24px;
         text-transform: uppercase;
         border-radius: 2px;
     }
 }

 .vue-map-container {
     width: 100%;
     height: 500px;
 }
 .input-container {
     box-sizing: border-box;
     height: 100%;
 }
</style>
