import { Children, createContext, useReducer } from "react";
import { Expenses } from "../model/expenses";
import { dummyExpenses } from "../data/dummyData";
type expenseDetail = { description: string; amount: number; date: Date };

interface expensesType {
  expenses: Expenses[];
  addExpenses: (data: expenseDetail) => any;
  removeExpenses: (id: string) => any;
  updateExpenses: (id: string, data: expenseDetail) => any;
}
export const ExpenseContext = createContext<expensesType>({
  expenses: [],
  addExpenses: () => {},
  removeExpenses: () => {},
  updateExpenses: () => {},
});

function expensesReduce(
  state: Expenses[],
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ADD":
      let id = new Date().toString() + Math.random().toString();
      return [{ id, ...action.payload.data }, ...state];
    case "DELETE":
      console.log(`Deleting ${action.payload.id}`);
      return state.filter((expense) => expense.id !== action.payload.id);
    case "UPDATE":
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const content = state[index];
      const updateContent = { ...content, ...action.payload.data };
      const updatedState = [...state];
      updatedState[index] = updateContent;
      return updatedState;
    default:
      return state;
  }
}

export function ExpenseContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenseState, dispatch] = useReducer(expensesReduce, dummyExpenses);

  function addExpenses(data: expenseDetail) {
    dispatch({ type: "ADD", payload: { data: data } });
  }
  function deleteExpenses(id: string) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }
  function updateExpenses(id: string, data: expenseDetail) {
    dispatch({ type: "UPDATE", payload: { id: id, data: data } });
  }

  const contextValues: expensesType = {
    expenses: expenseState,
    addExpenses: addExpenses,
    removeExpenses: deleteExpenses,
    updateExpenses: updateExpenses,
  };
  return (
    <ExpenseContext.Provider value={contextValues}>
      {children}
    </ExpenseContext.Provider>
  );
}
