import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeWebSocket, closeWebSocket } from "./orderBookAPI"; // Adjust the path accordingly
import { useTSelector } from "../../app/hooks/reduxHooks";

export const useOrderBook = () => {
  const [precision, setPrecision] = useState<string>("P0");
  const dispatch = useDispatch();
  const isWebSocketOpen = useTSelector(
    (state) => state.orderBook.isWebSocketOpen
  );

  useEffect(() => {
    initializeWebSocket(dispatch, precision);

    return () => {
      closeWebSocket(dispatch);
    };
  }, [precision, dispatch]);

  const handlePrecisionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPrecision(event.target.value);
  };

  const toggleWebSocket = () => {
    if (!isWebSocketOpen) {
      initializeWebSocket(dispatch, precision);
      return;
    }

    closeWebSocket(dispatch);
  };

  return { precision, handlePrecisionChange, toggleWebSocket, isWebSocketOpen };
};
