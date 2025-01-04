import { useState } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "john" },
    { id: 2, name: "loy" },
    { id: 3, name: "paul" },
    { id: 4, name: "sam" },
  ]);

  const [roundHistorys, setRoundHistorys] = useState([
    {
      roundId: 1,
      storytellerId: 1,
      guessIds: [2, 3],
      votes: {
        1: null, // john
        2: 1, // loy
        3: 0, // paul
        4: 0, // sam
      },
      scores: {
        1: 3, // john
        2: 4, // loy
        3: 3, // paul
        4: 0, // sam
      },
    },
    {
      roundId: 2,
      storytellerId: 2,
      guessIds: [],
      votes: {
        1: 0,
        2: null,
        3: 1,
        4: 2,
      },
      scores: {
        1: 2,
        2: 0,
        3: 3,
        4: 4,
      },
    },
    // 다른 라운드 객체들 추가...
  ]);

  const [roundInput, setRoundInput] = useState({
    isStorytellers: [false, false, true, false],
    isGuesses: [true, false, null, false],
    votes: [2, 0, null, 0],
    scores: [5, 0, 3, 0],
  });

  const playersOrder = players.map((player) => player.id);
  const roundIdScores = roundHistorys
    .sort((a, b) => b.roundId - a.roundId) // roundId 기준 내림차순 정렬
    .map((roundInput) => {
      // 각 roundInput에 대해 scores를 playerId 순으로 정렬
      const sortedScores = playersOrder.map(
        (playerId) => roundInput.scores[playerId]
      );
      return {
        roundId: roundInput.roundId,
        scores: sortedScores,
      };
    });
  const totalScores = playersOrder.map((_, index) =>
    roundIdScores.reduce((sum, round) => sum + round.scores[index], 0)
  );

  return (
    <div className="container">
      <div className="column-header">Player</div>
      {players.map((player) => (
        <div key={player.id} className="item header">
          {player.name}
        </div>
      ))}
      <button>Edit</button>

      <div className="column-header">Total Score</div>
      {totalScores.map((totalScore, index) => (
        <div key={index} className="item header">
          {totalScore}
        </div>
      ))}
      <div></div>

      <div className="section-splitter" />

      <div className="column-header">Story teller</div>
      {roundInput.isStorytellers.map((isStoryteller, index) => (
        <input
          key={index}
          className="item"
          type="checkbox"
          checked={isStoryteller}
        />
      ))}

      <div className="column-header">Guess</div>
      {roundInput.isGuesses.map((isGuess, index) =>
        isGuess === null ? (
          <div key={index} className="item">
            -
          </div>
        ) : (
          <input
            key={index}
            className="item"
            type="checkbox"
            checked={isGuess}
          />
        )
      )}

      <div className="column-header">Votes</div>
      {roundInput.votes.map((vote, index) =>
        vote === null ? (
          <div key={index} className="item">
            -
          </div>
        ) : (
          <div key={index} className="item number-counter">
            <button>▲</button>
            <div>{vote}</div>
            <button>▼</button>
          </div>
        )
      )}

      <div className="column-header">Round Score</div>
      {roundInput.scores.map((score, index) => (
        <div key={index} className="item">
          {score}
        </div>
      ))}

      <button style={{ gridColumn: 6, gridRowStart: 4, gridRowEnd: 8 }}>
        Submit
      </button>

      <div className="section-splitter" />

      {roundIdScores.map((roundScore) => {
        return (
          <>
            <div className="column-header">Round {roundScore.roundId}</div>
            {roundScore.scores.map((score, index) => (
              <div key={index} className="item">
                {score}
              </div>
            ))}
            <div className="history-action">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default App;
