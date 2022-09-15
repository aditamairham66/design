<template>
    <div class="sidebar-panels" :class="(nameRef === show ? 'sidebar-panels-shown' : '')">
        <div class="floating-sidebar-panel button-icon-visibility">
        
        <div class="studio-panel-content studio-text-panel-content">
            <h1 class="panel-title">{{ title }}</h1>
            <p class="panel-desc">{{ caption }}</p>

            <slot></slot>
        </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'panelLeft',
        props: {
            title: {
                type: String,
                required: true
            },
            caption: {
                type: String,
                required: true
            },
            nameRef: {
                type: String,
                required: true
            },
            show: {
                type: String,
                required: true
            },
        }
    }
</script>

<style scoped>

</style>