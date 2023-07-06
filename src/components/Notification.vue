<script setup>
import {computed} from 'vue';
import {FEEDBACK_TYPE_ERROR, FEEDBACK_TYPE_INFO, FEEDBACK_TYPE_SUCCESS} from "../constants/feedback.js";

defineEmits(['close']);

const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
});

const notificationClasses = computed(() => {
    const type = props.data?.type || FEEDBACK_TYPE_INFO;
    return {
        'bg-green-200'  : type === FEEDBACK_TYPE_SUCCESS,
        'bg-red-200'    : type === FEEDBACK_TYPE_ERROR,
        'bg-cyan-200'   : type === FEEDBACK_TYPE_INFO,
    };
});

const separatorClasses = computed(() => {
    const type = props.data?.type || FEEDBACK_TYPE_INFO;
    return {
        'border-green-600'  : type === FEEDBACK_TYPE_SUCCESS,
        'border-red-600'    : type === FEEDBACK_TYPE_ERROR,
        'border-cyan-600'   : type === FEEDBACK_TYPE_INFO,
    };
});
</script>

<template>
    <div
        v-if="data.message && data.message !== ''"
        class="p-4 mb-4 rounded"
        :class="notificationClasses"
    >
        <div class="flex justify-between items-start">
            <template v-if="data.title">
                <h2 class="mb-2 text-2xl">{{ data.title }}</h2>
                <hr class="mb-2" :class="separatorClasses">
            </template>
            <p>{{ data.message }}</p>

            <div
                v-if="data.closable"
                class="w-[20px] h-[30px]"
                @click="$emit('close')"
            >
                <button class="flex justify-center items-center w-[30px] h-[30px]">&times;</button>
            </div>
        </div>
    </div>
</template>