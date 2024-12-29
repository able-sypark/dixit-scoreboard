import "./App.css";

const App = () => {
  return (
    <div className="container">
      <div className="column-header">Player</div>
      <div className="item header">john</div>
      <div className="item header">loy</div>
      <div className="item header">paul</div>
      <div className="item header">sam</div>
      <button>Edit</button>
      <div className="column-header">Total Score</div>
      <div className="item header">16</div>
      <div className="item header">10</div>
      <div className="item header">2</div>
      <div className="item header">5</div>
      <div></div>
      <div className="section-splitter" />
      <div className="column-header">Story teller</div>
      <input className="item" type="checkbox" checked={true} />
      <input className="item" type="checkbox" />
      <input className="item" type="checkbox" />
      <input className="item" type="checkbox" />
      <div className="column-header">Guess</div>
      <div className="item">-</div>
      <input className="item" type="checkbox" />
      <input className="item" type="checkbox" />
      <input className="item" type="checkbox" />
      <div className="column-header">Votes</div>
      <div className="item">-</div>
      <div className="item number-counter">
        <button>▲</button>
        <div>1</div>
        <button>▼</button>
      </div>
      <div className="item number-counter">
        <button>▲</button>
        <div>1</div>
        <button>▼</button>
      </div>
      <div className="item number-counter">
        <button>▲</button>
        <div>0</div>
        <button>▼</button>
      </div>
      <div className="column-header">Round Score</div>
      <div className="item">3</div>
      <div className="item">4</div>
      <div className="item">1</div>
      <div className="item">0</div>
      <button style={{ gridColumn: 6, gridRowStart: 4, gridRowEnd: 8 }}>
        Submit
      </button>
      <div className="section-splitter" />
      <div className="column-header">Round 4</div>
      <div className="item">4</div>
      <div className="item">2</div>
      <div className="item">2</div>
      <div className="item">0</div>
      <div className="history-action">
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="column-header">Round 3</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="history-action">
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="column-header">Round 2</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="history-action">
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="column-header">Round 1</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="item">#</div>
      <div className="history-action">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default App;
