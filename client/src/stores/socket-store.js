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
    state.value.clientsList = []
   // state.value.connected = false
  });
  
  socket.on("user connected", (...args) => {
    const [user] = args
    console.log('user connected: ', user)
    state.value.clientsList.push(user)
    
  });

  socket.on("user move", (...args) => {
    const [move] = args
    console.log('user move: ', move)
    const client = state.value.clientsList.find((item) => item.id === move.clientId)
    client.point = move.point

  })
  
  socket.on("user disconnected", (...args) => {
    const [user] = args
    console.log('user disconnected: ', user)
    const index = state.value.clientsList.findIndex((item) => item.id === user.id)
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

  function setUserPoint(point){
    const userClient = state.value.clientsList.find((item)=> item.id === state.value.token?.id)
    if(userClient) userClient.point = point
  }

  const getUserName = computed(() => {
    return state.value.token.name ? state.value.token.name : '[user_name]'
  })
  return { socket, state, getUserName, resetSocket, setUserPoint }
})
