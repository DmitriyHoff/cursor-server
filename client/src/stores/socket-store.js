import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { io } from "socket.io-client";

export const useSocketStore = defineStore('socket', () => {
  const URL = "http://localhost:3000";
  
  const state = ref({
    token: {},
    connected: false,
    clientsList: []
  })
  
  const socket = io(URL, { 
    autoConnect: false, 
    query: {
      ...(state.value.token?.uuid && {accessKey: state.value.token.uuid })
    } });
  socket.io.open()

  socket.on("connect", () => {
    console.log('connect... ')
  });
  
  socket.on("token", (...args) => {
    const [token] = args
    console.log('token: ', token)
  
    state.value.token = token
    state.value.clientsList = token?.onlineClients
  });
  
  socket.on("disconnect", () => {
    console.log('disconnect...')
   // state.value.connected = false
  });
  
  socket.on("user connected", (...args) => {
    const [user] = args
    console.log('user connected: ', user)
    state.value.clientsList.push(user)
    
  });

  socket.on("user move", (...args) => {
    const [move] = args

    const index = state.value.clientsList.findIndex((item) => item.id === move.clientId)
    state.value.clientsList[index].point = move.point

  })
  
  socket.on("user disconnected", (...args) => {
    const [user] = args
    const index = state.value.clientsList.indexOf(user)
    state.value.clientsList.splice(index, 1)
  });

  /** 
   * Добавить `accessKey` в запрос при повторном подключении
   */ 
  function resetSocket() {
    socket.io.opts.query = {
      ...socket.io.opts.query,
      ...(state.value.token?.uuid && {accessKey: state.value.token.uuid })
    }
  }

  const getUserName = computed(() => {
    return state.value.token.name ? state.value.token.name : '[user_name]'
  })
  return { socket, state, getUserName, resetSocket }
})
