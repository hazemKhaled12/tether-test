import { useTSelector } from "../../app/hooks/reduxHooks";

import "./styles.css";
import { OrderTable } from "./ui-blocks/order-table";
import { Controls } from "./ui-blocks/controls";
import { useOrderBook } from "./use-order-hook";

export const OrderBook: React.FC = () => {
  const { handlePrecisionChange, isWebSocketOpen, precision, toggleWebSocket } =
    useOrderBook();

  const bids = useTSelector((state) => state.orderBook.bids);
  const asks = useTSelector((state) => state.orderBook.asks);

  return (
    <div className='order-book'>
      <Controls
        precision={precision}
        toggleWebSocket={toggleWebSocket}
        handlePrecisionChange={handlePrecisionChange}
        isWebSocketOpen={isWebSocketOpen}
      />

      <OrderTable bids={bids} asks={asks} />
    </div>
  );
};
