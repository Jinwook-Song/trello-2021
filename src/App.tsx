import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 80vw;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 0.5rem;
  grid-template-rows: repeat(1, 1fr);
  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

function App() {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;

    // same board movement.
    if (destination?.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        // Delete item on source
        const target = boardCopy.splice(source.index, 1);
        // Put back the item
        boardCopy.splice(destination?.index, 0, ...target);

        // save to local storage
        localStorage.setItem(
          "todos",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: boardCopy,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // cross board movement
    if (destination.droppableId !== source.droppableId) {
      setTodos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const target = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, ...target);

        // save to local storage
        localStorage.setItem(
          "todos",
          JSON.stringify({
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          })
        );
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board key={boardId} boardId={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
