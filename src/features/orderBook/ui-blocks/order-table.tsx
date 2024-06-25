type TableInterface = {
  asks: Array<{ price: number; amount: number; count: number }>;
  bids: Array<{ price: number; amount: number; count: number }>;
};

export const OrderTable = ({ asks, bids }: TableInterface) => {
  return (
    <div className='order-book-container'>
      <div className='order-book-side'>
        <h2>Bids</h2>
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index}>
                <td>{bid.count}</td>
                <td>{bid.amount}</td>
                <td>{bid.amount * bid.count}</td>
                <td>{bid.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='order-book-side'>
        <h2>Asks</h2>

        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Total</th>
              <th>Amount</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {asks.map((ask, index) => (
              <tr key={index}>
                <td>{ask.price}</td>
                <td>{ask.amount * ask.count}</td>
                <td>{ask.amount}</td>
                <td>{ask.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
