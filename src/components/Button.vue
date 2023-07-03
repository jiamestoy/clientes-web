<script setup>
defineProps({
    full: {
            type: Boolean,
            default: false,
        }
})
</script>

<template>
    
    <button 
        type="submit" 
        class="my-3 p-2 rounded text-slate-100 hover:bg-green-600 bg-green-700 transition-colors focus"
        :class="{'w-full': full}"
    ><slot></slot></button>

</template>