import "./App.css";

import { OrderBook } from "./features/orderBook";

const App = () => {
  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1>Order Book</h1>
        </header>
        <OrderBook />
      </div>
    </>
  );
};

export default App;
