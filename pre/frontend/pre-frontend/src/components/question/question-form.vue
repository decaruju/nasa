<template>
    <div>
        <label v-for="question in questions" :key="question.id">
            <div>
                {{ question.text }}
            </div>
            <input type="text" :value="value[question.id]" @input="onChange($event, question.id)">
        </label>
    </div>
</template>

<script>
 export default {
     name: 'question-form',
     props: {
        value: {
            type: Object,
            required: true,
        },
        questions: {
            type: Array,
            required: true,
        },
     },
     methods:  {
        onChange(event, id) {
            const values = { ...this.value, [id]: event.target.value };
            this.$emit('input', values);
        },
     }
 }
</script>
