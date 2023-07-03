<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
    <textarea class="border border-gray-400 p-2 w-full rounded" :value="modelValue" @input="ev => $emit('update:modelValue', ev.target.value)"></textarea>
</template>