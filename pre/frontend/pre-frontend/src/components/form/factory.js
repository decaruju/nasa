import FormInput from '../form/input.vue';
import FormRadio from '../form/radio.vue';

const components = {
  text: FormInput,
  radio: FormRadio,
};

export default {
  components: Object.values(components).reduce((acc, e) => {
    acc[e.name] = e;
    return acc;
  }, {}),
   component(type) {
     if(!components[type]) {
       throw new Error('could not build component with type: ' + type);
     }

     return components[type];
   }
};