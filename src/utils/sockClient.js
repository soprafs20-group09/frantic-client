import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {getDomain, isProduction} from "utils/DomainUtils";
import sessionManager from "utils/sessionManager";

class SockClient {
    constructor() {
        this._connected = false;
        this._registered = false;
        this._disconnectCallbacks = [];
        this._registerCallbacks = [];
        this._messageCallbacks = {};
    }

    isConnected() {
        return this._connected;
    }

    isRegistered() {
        return this._registered;
    }

    connect(callback) {
        try {
            this.sock.close();
        } catch {
        }
        this.sock = new SockJS(`${getDomain()}/ws`);
        this.stomp = Stomp.over(this.sock);
        this.stomp.debug = this._debug;
        this.stomp.connect({}, () => {
            this._connected = true;
            this.subscribe('/user/queue/register', r => this._handleRegister(r));
            this.subscribe('/user/queue/disconnect', r => this.disconnect(r.reason));
            this.subscribe('/user/queue/reconnect', r => this.reconnect(r.token));
            if (callback) {
                callback();
            }
        });
        this.sock.onclose = r => {
            console.log("Socket closed!", r);
            this._handleDisconnect("Socket closed.");
        };
        this.sock.onerror = e => this._handleError(e);
    }

    disconnect(reason) {
        try {
            this.stomp.disconnect(() => this._handleDisconnect(reason), {});
        } catch {
        }
    }

    connectAndRegister(token) {
        this.connect(() => {
            this.register(token);
        });
    }

    register(token) {
        this.send('/app/register', {token: token});
    }

    reconnect(token) {
        // remove disconnect callbacks so we don't
        // trigger anything while reconnecting

        let callbacks = this._disconnectCallbacks.slice();
        this._disconnectCallbacks = [];

        this.disconnect("Reconnecting");

        setTimeout(() => {
            this._disconnectCallbacks = callbacks;
            this.connectAndRegister(token);
        }, 500);
    }

    subscribe(channel, callback) {
        this.stomp.subscribe(channel, r => callback(this._stripResponse(r)));
    }

    send(destination, body) {
        this.stomp.send(destination, {}, JSON.stringify(body ? body : {}));
    }

    sendToLobby(channel, body) {
        this.send(`/app/lobby/${sessionManager.lobbyId}${channel}`, body);
    }

    onRegister(callback) {
        this._registerCallbacks.push(callback);
    }

    clearMessageSubscriptions() {
        this._messageCallbacks = {};
    }

    onDisconnect(callback) {
        this._disconnectCallbacks.push(callback);
    }

    clearDisconnectSubscriptions() {
        this._disconnectCallbacks = [];
    }

    onLobbyMessage(channel, callback) {
        if (!this._messageCallbacks.hasOwnProperty(channel)) {
            this._messageCallbacks[channel] = [];
        }
        this._messageCallbacks[channel].push(callback);
    }

    _handleError(error) {
        console.error(error);
        this._handleDisconnect("Socket error.");
    }

    _handleDisconnect(reason) {
        this._connected = false;
        for (let callback of this._disconnectCallbacks) {
            callback(reason);
        }
    }

    _handleRegister(response) {
        this._registered = true;
        sessionManager.lobbyId = response.lobbyId;

        this.stomp.subscribe(`/user/queue/lobby/${response.lobbyId}/*`, r => this._handleMessage(r));
        this.stomp.subscribe(`/user/queue/lobby/${response.lobbyId}/*/*`, r => this._handleMessage(r));

        for (let callback of this._registerCallbacks) {
            callback(response);
        }
    }

    _handleMessage(response) {
        let msg = JSON.parse(response.body);
        let channel = response.headers.destination;
        let lobbyChannel = channel.replace(/.+\/lobby\/.+\//i, '/');

        if (!this._messageCallbacks.hasOwnProperty(lobbyChannel)) {
            return
        }

        for (let callback of this._messageCallbacks[lobbyChannel]) {
            callback(msg);
        }
    }

    _stripResponse(response) {
        return JSON.parse(response.body);
    }

    _debug(message) {
        // only output debug messages if we're not in the production environment
        if (!isProduction()) {
            console.log(message);
        }
    }
}

export default new SockClient();