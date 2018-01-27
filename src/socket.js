import io from 'socket.io-client'

const socket = io('http://192.168.139.81:8000', {path: '/gamews', forceNew: true})

export default socket

