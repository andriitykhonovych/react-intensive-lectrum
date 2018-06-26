// Core
import io from "socket.io-client";

// Instruments
import { SOCKET_URL } from "../REST/config";

export const socket = io(SOCKET_URL, {
    path: "/react/ws",
});
