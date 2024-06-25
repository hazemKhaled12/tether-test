import { AppDispatch } from "../../app/store";
import { WS_URL } from "./constants";
import { setIsWebSocketOpen, handleOrderBookData } from "./orderBookSlice";

const handleWebSocketMessage = (
  dispatch: AppDispatch,
  message: MessageEvent
) => {
  const data = JSON.parse(message.data);
  dispatch(handleOrderBookData(data));
};

let ws: WebSocket | null = null;
let reconnectInterval: null | number = null;
let reconnectDelay = 1000; // Initial reconnect delay in milliseconds

const connectWebSocket = (dispatch: AppDispatch, precision: string) => {
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log("WebSocket connected");
    dispatch(setIsWebSocketOpen(true));
    const msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      prec: precision,
    });
    ws?.send(msg);
    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
  };

  ws.onmessage = (msg) => handleWebSocketMessage(dispatch, msg);

  ws.onclose = () => {
    console.log("WebSocket closed");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
    ws?.close();
    if (!reconnectInterval) {
      reconnectInterval = setInterval(() => {
        console.log("Attempting to reconnect...");
        connectWebSocket(dispatch, precision);
      }, reconnectDelay);
    }
  };
};

export const initializeWebSocket = (
  dispatch: AppDispatch,
  precision: string
) => {
  if (!ws || ws?.readyState === WebSocket.CLOSED) {
    connectWebSocket(dispatch, precision);
    return;
  }

  closeWebSocket(dispatch);
  connectWebSocket(dispatch, precision);
};

export const closeWebSocket = (dispatch: AppDispatch) => {
  if (ws) {
    ws.close();
    ws = null;
    dispatch(setIsWebSocketOpen(false));
  }
  if (reconnectInterval) {
    clearInterval(reconnectInterval);
    reconnectInterval = null;
  }
};
