interface ControlsInterface {
  isWebSocketOpen: boolean;
  precision: string;
  toggleWebSocket: () => void;
  handlePrecisionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Controls = ({
  isWebSocketOpen,
  precision,
  toggleWebSocket,
  handlePrecisionChange,
}: ControlsInterface) => {
  return (
    <>
      <div className='precision-selector'>
        <label htmlFor='precision'>Precision:</label>
        <select
          id='precision'
          value={precision}
          onChange={handlePrecisionChange}
        >
          <option value='P0'>P0</option>
          <option value='P1'>P1</option>
          <option value='P2'>P2</option>
          <option value='P3'>P3</option>
          <option value='P4'>P4</option>
        </select>
      </div>

      <div className='control-button'>
        <button onClick={toggleWebSocket}>
          {isWebSocketOpen ? "Disconnect WebSocket" : "Connect WebSocket"}
        </button>
      </div>
    </>
  );
};
