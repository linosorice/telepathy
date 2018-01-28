import io from 'socket.io-client'

const socket = io({path: '/gamews', forceNew: true})

export default socket

