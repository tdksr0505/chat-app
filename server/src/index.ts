import { Server } from 'socket.io'
import { C2S_COMMAND, S2C_COMMAND } from '../../src/constants'
import WebsocketManager from './websocketManager'

const websocketManager = new WebsocketManager()
