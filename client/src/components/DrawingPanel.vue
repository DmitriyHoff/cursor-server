<script setup>
import DrawingCursor from "./DrawingCursor.vue"
import { ref } from "vue";
import { useSocketStore } from "../stores/socket-store";

const user = ref({ id: 0, name: 'user', x: 0, y: 0 })
const timeout = ref(false)
const store = useSocketStore()

function renderCursor(e) {
    timeout.value = true
    const {left, top} = e.target.getBoundingClientRect();
    const { clientX:X, clientY:Y } = e;
    //const index = cursor.value.id === 0)
    const point = {
        x: parseInt(X - left),
        y: parseInt(Y - top)
    }
    user.value.x = point.x;
    user.value.y = point.y;
    store.setUserPoint(point)
    store.socket.volatile.emit('move', point)
}

function getCursor(e) {
    
    if(timeout.value) return

    renderCursor(e)

    setTimeout(() => {
      timeout.value = false;
    }, 15);
}

</script>

<template>
    <div id="drawing-panel" @mousemove="getCursor($event)">
        <DrawingCursor v-for="client in store.state.clientsList" class="drawing-cursor" 
        :pos-x="client.point.x" :pos-y="client.point.y" :name="client.name"
        :style="{left: client.point.x + 'px', top: client.point.y + 'px', color:client?.color }" :key="client.id"/>
    </div>
    
</template>

<style>
#drawing-panel {
    margin: 0;
    padding: 0;
    position: relative;
    width: 600px;
    height: 600px;
    background-color: aliceblue;
    cursor: none;
    pointer-events: all;
}

.drawing-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
    left: 0;
    right: 0;
    color: blue;
    pointer-events: none;
}

</style>