import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, todoState } from "../atoms";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgAccentColor2};
  padding: 0.5rem;
  border-radius: 0.2rem;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
    min-height: 70vh;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  white-space: nowrap;
  color: ${(props) => props.theme.accentColor2};
`;

const Form = styled.form`
  width: 100%;
  padding: 0 0.2rem;
  display: flex;
  justify-content: center;
  input {
    font-size: 1rem;
    border: 0;
    background-color: ${(props) => props.theme.bgAccentColor};
    color: ${(props) => props.theme.accentColor};
    width: 80%;
    padding: 0.2rem;
    border-radius: 0.2rem;
    text-align: center;
    margin: 0 auto;
    &::placeholder {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  border-radius: 0.2rem;
  padding: 0 0.2rem;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.accentColor2
      : props.draggingFromThisWith
      ? props.theme.bgAccentColor
      : props.theme.bgAccentColor2};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  todos: ITodo[];
  boardId: string;
}

interface IForm {
  todo: string;
}

function Board({ todos, boardId }: IBoardProps) {
  const setTodos = useSetRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newTodo: ITodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newTodo, ...allBoards[boardId]],
      };
    });
    setValue("todo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <br />
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add on ${boardId}...`}
        />
      </Form>
      <br />
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, idx) => (
              <DragabbleCard
                key={todo.id}
                idx={idx}
                todoId={todo.id}
                todoText={todo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
