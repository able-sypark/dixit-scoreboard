import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([
    { name: "john" },
    { name: "loy" },
    { name: "paul" },
    { name: "sam" },
  ]);
  const [isPlayerEditing, setIsPlayerEditing] = useState(false);
  const [roundInput, setRoundInput] = useState({
    isStorytellers: [true, false, false, false],
    isGuesses: [null, false, false, false],
    votes: [null, 0, 0, 0],
    scores: [0, 0, 0, 0],
  });
  const [roundHistorys, setRoundHistorys] = useState([
    // {
    //   id: 1,
    //   scores: [3, 4, 3, 0],
    // },
    // {
    //   id: 2,
    //   scores: [2, 0, 3, 4],
    // },
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const sortedRoundHistorys = [...roundHistorys].sort((a, b) => b.id - a.id);
  const totalScores = players.map((_, index) =>
    roundHistorys.reduce((sum, round) => sum + round.scores[index], 0)
  );
  const winner = totalScores
    .map((score, index) => (score >= 30 ? players[index].name : null))
    .filter((x) => x !== null);

  function handlePlayerCounter(count) {
    setPlayers((prev) => {
      let next = [...prev];
      if (count === 1) {
        next = [...next, { name: "" }];
      } else if (count === -1) {
        next = next.slice(0, -1);
      }
      return next;
    });

    setRoundInput((prev) => {
      let next = { ...prev };
      if (count === 1) {
        next.isStorytellers = [...next.isStorytellers, false];
        next.isGuesses = [...next.isGuesses, false];
        next.votes = [...next.votes, 0];
        next.scores = [...next.scores, 0];
      } else if (count === -1) {
        next.isStorytellers = next.isStorytellers.slice(0, -1);
        next.isGuesses = next.isGuesses.slice(0, -1);
        next.votes = next.votes.slice(0, -1);
        next.scores = next.scores.slice(0, -1);
      }
      return next;
    });

    setRoundHistorys((prev) => {
      let next = [...prev];
      if (count === 1) {
        next = next.map((x) => ({ ...x, scores: [...x.scores, 0] }));
      } else if (count === -1) {
        next = next.map((x) => ({ ...x, scores: x.scores.slice(0, -1) }));
      }
      return next;
    });
  }

  function changeStoryteller(index, clear) {
    setRoundInput((prev) => {
      const nextIsStorytellers = prev.isStorytellers.map((_, i) => i == index);
      const nextIsGuesses = prev.isGuesses.map((x, i) =>
        i == index ? null : clear ? false : x ?? false
      );
      const nextVotes = prev.votes.map((x, i) =>
        i == index ? null : clear ? 0 : x ?? 0
      );
      return {
        ...prev,
        isStorytellers: nextIsStorytellers,
        isGuesses: nextIsGuesses,
        votes: nextVotes,
      };
    });
  }

  function handleVoteCounter(index, count) {
    setRoundInput((prev) => {
      const nextVotes = [...prev.votes];
      nextVotes[index] += count;
      return {
        ...prev,
        votes: nextVotes,
      };
    });
  }

  function updateIsSubmitDisabled() {
    const countIsGuess = roundInput.isGuesses.filter((x) => x === true).length;
    const sumVotes = roundInput.votes.reduce((sum, vote) => sum + vote, 0);
    // console.log({ roundInput });
    // console.log({ countIsGuesses });
    // console.log({ sumVotes });
    setIsSubmitDisabled(countIsGuess + sumVotes !== players.length - 1);
  }

  function calculateRoundScore() {
    const countIsGuess = roundInput.isGuesses.filter((x) => x === true).length;
    const isGuessScored = countIsGuess > 0 && countIsGuess < players.length - 1;
    const scores = players.map((_, index) => {
      const isStoryteller = roundInput.isStorytellers[index];
      let score = 0;
      if (isGuessScored) {
        if (isStoryteller || roundInput.isGuesses[index]) {
          score += 3;
        }
      } else if (!isStoryteller) {
        score += 2;
      }
      score += roundInput.votes[index];
      return score;
    });
    const isScoreChanged = !scores.every((v, i) => v === roundInput.scores[i]);
    return { scores, isScoreChanged };
  }

  useEffect(() => {
    // console.log(players);
    const container = document.querySelector(".container");
    container.style.gridTemplateColumns = `30px repeat(${players.length}, 1fr) auto`;

    const sectionSplitters = document.querySelectorAll(".section-splitter");
    sectionSplitters.forEach(
      (x) => (x.style.gridColumn = `1 / span ${players.length + 2}`)
    );

    const submitButton = document.querySelector(".submit-button");
    submitButton.style.gridColumn = `${players.length + 2}`;
  }, [players]);

  useEffect(() => {
    updateIsSubmitDisabled();
    const { scores, isScoreChanged } = calculateRoundScore();
    if (isScoreChanged) {
      setRoundInput((prev) => {
        return {
          ...prev,
          scores: scores,
        };
      });
    }
  }, [roundInput]);

  useEffect(() => {
    if (winner.length > 0) {
      alert(`winner: ${winner}`);
    }
  }, [roundHistorys]);

  return (
    <div className="container">
      <div className="column-header">Player</div>
      {players.map((player, index) => {
        return isPlayerEditing ? (
          <input
            className="item header"
            value={player.name}
            onChange={(e) => {
              const next = [...players];
              next[index].name = e.target.value;
              setPlayers(next);
            }}
          />
        ) : (
          <div className="item header">{player.name}</div>
        );
      })}
      {isPlayerEditing ? (
        <div className="player-button-container">
          <button onClick={() => setIsPlayerEditing(!isPlayerEditing)}>
            Save
          </button>
          <div className="player-counter">
            <button
              onClick={() => handlePlayerCounter(-1)}
              disabled={players.length <= 2}
            >
              −
            </button>
            <button onClick={() => handlePlayerCounter(1)}>+</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsPlayerEditing(!isPlayerEditing)}>
          Edit
        </button>
      )}

      <div className="column-header">Total Score</div>
      {totalScores.map((totalScore, index) => (
        <div key={index} className="item header">
          {totalScore}
        </div>
      ))}
      <button
        onClick={() => {
          changeStoryteller(0, true);
          setRoundHistorys([]);
        }}
      >
        Clear
      </button>

      <div className="section-splitter" />

      <div className="column-header">Story teller</div>
      {roundInput.isStorytellers.map((isStoryteller, index) => (
        <input
          key={index}
          className="item"
          type="checkbox"
          checked={isStoryteller}
          onChange={() => {
            if (isStoryteller) return;
            changeStoryteller(index, false);
          }}
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
            onChange={() => {
              setRoundInput((prev) => {
                const nextIsGuesses = [...prev.isGuesses];
                nextIsGuesses[index] = !isGuess;
                return {
                  ...prev,
                  isGuesses: nextIsGuesses,
                };
              });
            }}
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
            <button
              onClick={() => {
                handleVoteCounter(index, 1);
              }}
              disabled={vote >= players.length - 2}
            >
              ▲
            </button>
            <div style={{ color: vote === 0 ? "darkgray" : "black" }}>
              {vote}
            </div>
            <button
              onClick={() => {
                handleVoteCounter(index, -1);
              }}
              disabled={vote <= 0}
            >
              ▼
            </button>
          </div>
        )
      )}

      <div className="column-header">Round Score</div>
      {roundInput.scores.map((score, index) => (
        <div key={index} className="item">
          {score}
        </div>
      ))}

      <button
        className="submit-button"
        onClick={() => {
          setRoundHistorys([
            ...roundHistorys,
            {
              id: roundHistorys.length + 1,
              scores: roundInput.scores,
            },
          ]);

          const storytellerIndex = roundInput.isStorytellers.indexOf(true);
          let nextIndex = storytellerIndex + 1;
          if (nextIndex === players.length) nextIndex = 0;
          changeStoryteller(nextIndex, true);
        }}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>

      <div className="section-splitter" />

      {sortedRoundHistorys.map((roundHistory) => {
        return (
          <>
            <div className="column-header">Round {roundHistory.id}</div>
            {roundHistory.scores.map((score, index) => (
              <div key={`${roundHistory.id}-score-${index}`} className="item">
                {score}
              </div>
            ))}
            <div className="history-button-container">
              <button
                onClick={() => {
                  const next = roundHistorys
                    .filter((x) => x.id != roundHistory.id)
                    .map((x, i) => ({ ...x, id: i + 1 }));
                  // console.log(next);
                  setRoundHistorys(next);
                }}
              >
                Delete
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default App;
