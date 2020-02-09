import Input from '../form/input.vue';
import Checkbox from '../form/checkbox.vue';

const components = {
  text: Input,
  checkbox: Checkbox,
}

export default {
  components: Object.values(components),
   component(type) {
     console.log('components::', components);
     
     if(!components[type]) {
       throw new Error('could not build component with type: ' + type);
     }

     return components[type];
   }
};