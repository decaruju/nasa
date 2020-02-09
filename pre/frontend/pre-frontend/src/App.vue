<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs" :class="{
      'app-during': flood,
      'app-before': !flood,
    }">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">
            <img v-if="flood" @click="toggleMode" src="../public/logo_pendant.png" width="50px"/>
            <img v-else @click="toggleMode" src="../public/logo_avant.png" width="50px"/>
          </span>
        </div>
        <!-- Tabs -->
        <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a v-for="(header, index) in filteredHeader" 
            :key="index" 
            :href="'/#'+header.link" 
            class="mdl-layout__tab" 
            :class="{ 'is-active': index==active }"
            @click="active=index" 
          >{{ header.text }}</a>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">RIU</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" @click="admin=!admin">Admin</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel is-active">
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
import store from './shared/store';

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
          flood: true,
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
        return (!header.flood || (header.flood && this.flood && !this.admin)) 
          && (!header.admin || (header.admin && this.admin));
      });
    },
  },

  methods: {
    toggleMode() {
      this.flood = !this.flood;
      store.flood = this.flood;
    }
  },
}
</script>

<style lang="scss">

$color-during1: #bf616a;
$color-during2: #d4949a;
$color-during3: #dfb1b5;
$color-during4: #4c566a;

$color-before1: #7082ad;
$color-before2: #a0acc8;
$color-before3: #c6ccde;
$color-before4: #e5e9f0;


.banner-risk {
  font-size: 20px;
  padding: 20px;
  margin: 20px 0;
}


.in-risk {
  background-color: $color-during3;
}

.not-in-risk {
  background-color: $color-before3;
}

  .mdl-layout__tab.is-active::after {
    height: 2px;
    width: 100%;
    display: block;
    content: " ";
    bottom: 0;
    left: 0;
    position: absolute;
    background: rgb(255,64,129);
    -webkit-animation: border-expand .2s cubic-bezier(.4,0,.4,1).01s alternate forwards;
    animation: border-expand .2s cubic-bezier(.4,0,.4,1).01s alternate forwards;
    transition: all 1s cubic-bezier(.4,0,1,1);
  }
  
  .app-during {
    h1, h2, h3, h3, h4, h5, .placeholder {
      color: $color-during4;
    }

    .mdl-button--colored {
      background: $color-during1;
      color: $color-during4;
    }

    .mdl-layout__tab {
      color: $color-during4;
    }

    .mdl-layout__tab.is-active::after {
      background: $color-before1;
    }

    .mdl-layout__header, .mdl-layout__tab-bar {
      background-color: $color-during2;
    }
  }

  .app-before {
    h1, h2, h3, h3, h4, h5, .placeholder {
      color: $color-before1;
    }

    .mdl-button--colored {
      background: $color-before1;
      color: $color-before4;
    }

    .mdl-layout__tab {
      color: $color-before4;
    }

    .mdl-layout__tab.is-active::after {
      background: $color-during1;
    }

    .mdl-layout__header, .mdl-layout__tab-bar {
      background-color: $color-before2;
    }
  }

    // .mdl-layout__header, .mdl-layout__tab-bar {
    //   background-color: #A0AECE;
    // }

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
