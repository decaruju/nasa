<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">
            <img v-if="flood" @click="flood = !flood" src="../public/logo_pendant.png" width="50px"/>
            <img v-else @click="flood = !flood" src="../public/logo_avant.png" width="50px"/>
          </span>
        </div>
        <!-- Tabs -->
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a v-for="(header, index) in filteredHeader" :key="index" :href="'/#'+header.link" class="mdl-layout__tab" @click="active=index" :class="{ 'is-active': index==active }">{{ header.text }}</a>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">RIU</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" @click="admin=!admin">Admin</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
          <div class="page-content">
            <div class="app">
              <router-view />
            </div>
          </div>
        </section>
      </main>

  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data() {
    return {
      flood: false,
      active: 0,
      admin: false,
      headers: [
        {
          link: '/',
          text: 'Suis-je à risque'
        },
        {
          link: '/request',
          text: `J'ai besoin d'aide`,
        },
        {
          admin: true,
          link: '/admin',
          text: `Validation`,
        },
        {
          admin: true,
          link: '/map',
          text: `Dépêcher un drône`,
        },
      ]
    };
  },

  computed: {
    filteredHeader() {
      return this.headers.filter((header) => {
        return !header.admin || (header.admin == true && this.admin);
      });
    },
  },
}
</script>

<style lang="scss">
    .mdl-layout__header, .mdl-layout__tab-bar {
      background-color: #A0AECE;
    }

    .mdl-textfield__label {
        color: #2E4478;
    }

    .vue-map-container {
      width: 100%;
      height: 300px;
    }

    .mdl-button {
      background-color: #A0AECE;
    }

    .textfield {
      position: relative;
      font-size: 16px;
      display: inline-block;
      box-sizing: border-box;
      width: 300px;
      max-width: 100%;
      margin: 0;
      padding: 20px 0;

    }

    .input {
        border: none;
        border-bottom: 1px solid rgba(0,0,0,.12);
        display: block;
        font-size: 16px;
        font-family: "Helvetica","Arial",sans-serif;
        margin: 0;
        padding: 4px 0;
        width: 100%;
        background: 0 0;
        text-align: left;
        color: inherit;

        &:focus {
            outline: none;
        }

        + .placeholder, +.label {
            // position: absolute;
            // top: 24px;
            // left: 10px;
            font-size: 16px;

            // transition-duration: .2s;
            // transition-timing-function: cubic-bezier(.4,0,.2,1);
            //  transition: all 0.2s ease-in-out;
        }

        // &:focus, &:valid {
        //   + .placeholder, +.label {
        //       font-size: 12px;
        //       top: 2px;
        //   }
        // }

    }

    .placeholder {
      color: #2E4478;
      font-size: 16px;
    }

</style>
