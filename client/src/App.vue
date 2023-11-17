<script setup>
import { ref } from "vue";
import { useSocketStore } from "./stores/socket-store";
import DrawingPanel from "./components/DrawingPanel.vue";
import ConnectionManager from "./components/ConnectionManager.vue";

const store = useSocketStore()


</script>

<template>
    <div class="flex no-wrap flex align-items-stretch gap-3">
        <div>
            <div class="surface-card p-4 shadow-2 border-round" style="width: max-content; pointer-events: none;">
                <div class="text-3xl font-medium text-900 mb-3">{{store.getUserName}}</div>
                <div class="font-medium text-500 mb-3">Здесь можно перемещать курсор:</div>
                <div style="width: max-content;" class="border-2 border-dashed surface-border">
                    <DrawingPanel />
                </div>
            </div>
        </div>
        
        <div class="flex flex-column justify-content-between gap-3" >
            <div class="card justify-content-center">
                <Listbox class=" w-full md:w-14rem" :options="store.state.clientsList" optionLabel="name" listStyle="height: 600px">
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <i class="pi pi-circle-fill mr-1" :style="`color: ${slotProps.option.color}; font-size: 8px`"></i>
                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Listbox>
            </div>
            <ConnectionManager/>
        </div>
    </div>
</template>

<style lang="scss">
    @import 'primeflex/primeflex.scss';
    @import 'primeicons/primeicons.css';
</style>