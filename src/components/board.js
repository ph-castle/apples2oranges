
function GameBoard({ G, ctx, moves, isActive, playerID }) {
  const canClickCell = (id) => isActive && G.cells[id] == null;

  const onClick = (id) => {
    if (canClickCell(id)) {
      moves.clickCell(id);
    }
  };

  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== '' ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  const cellStyle = (active) => ({
    border: '1px solid #555',
    width: '3.125rem',
    height: '3.125rem',
    lineHeight: '3.125rem',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    background: active ? '#eeffe9' : 'transparent',
    padding: '0',
    boxSizing: 'border-box',
  });

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {canClickCell(id) ? (
            <button style={cellStyle(true)} onClick={() => onClick(id)} />
          ) : (
            <div style={cellStyle(false)}>{G.cells[id]}</div>
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <p
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <span>Player {playerID}</span>
        {isActive && <span>Your turn!</span>}
      </p>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      <p>{winner}</p>
    </div>
  );
}

export default GameBoard;