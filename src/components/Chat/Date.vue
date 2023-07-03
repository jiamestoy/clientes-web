<script setup>
import { formatDate } from '../../helpers/dates.js'

defineProps({
    date: {
        type: Date,
    }
})
</script>

<template>
    <template v-if="date">
        <time class="block text-sm text-grey-600" :datetime="date.toISOString()">{{ formatDate(date) }}</time>
    </template>
    <template v-else>
        <span class="block text-sm text-grey-600"><slot>Enviando mensaje</slot></span>
    </template>
</template>