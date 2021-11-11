import { atom } from "recoil";

const localData = localStorage.getItem("todos");


export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

export const todoState = atom<ITodoState>({
  key: "todo",
  default: localData ? JSON.parse(localData) : {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
