import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? props.theme.accentColor2 : props.theme.accentColor};
  padding: 0.3rem;
  margin: 0.3rem 1rem;
  border-radius: 0.2rem;
  box-shadow: ${(props) =>
    props.isDragging ? "0.5rem 0.5rem 1rem rgba(0,0,0,0.5)" : "none"};
`;

interface IDragabbleCardProps {
  todoId: number;
  todoText: string;
  idx: number;
}

function DragabbleCard({ todoId, todoText, idx }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={todoId.toString()} index={idx}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
