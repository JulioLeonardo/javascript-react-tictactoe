import Square from "../Square";

import "./styles.css";

export default function Board() {
  return (
    <div className="board">
      <Square value="1" onClick={() => onClick("dummy")} />
      <Square value="2" onClick={() => onClick("dummy")} />
      <Square value="3" onClick={() => onClick("dummy")} />
      <Square value="4" onClick={() => onClick("dummy")} />
      <Square value="5" onClick={() => onClick("dummy")} />
      <Square value="6" onClick={() => onClick("dummy")} />
      <Square value="7" onClick={() => onClick("dummy")} />
      <Square value="8" onClick={() => onClick("dummy")} />
      <Square value="9" onClick={() => onClick("dummy")} />
    </div>
  );
}
