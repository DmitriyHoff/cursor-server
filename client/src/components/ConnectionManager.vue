<script setup>
import { ref } from 'vue';
import { useSocketStore } from "../stores/socket-store"

const store = useSocketStore()

const loadingConnection = ref(false);
const loadingDisconnection = ref(false);

function connect() {
    store.resetSocket()
    store.socket.connect()
};

function disconnect() {
    store.socket.disconnect()
}
</script>
<template>
    <div class="flex flex-column gap-3">
        <Button @click="connect()" :loading="loadingConnection" label="Connect" :disabled="store.socket.connected"/>
        <Button @click="disconnect()" :loading="loadingDisconnection" label="Disconnect"  severity="danger" :disabled="!store.socket.connected"/>
    </div>
</template>