import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Expenses } from "../model/expenses";
import { supabase } from "../app/_layout";
import { Alert } from "react-native";
import { AuthContext } from "./authContext";

type expenseDetail = { description: string; amount: number; date: Date };

interface expensesType {
  expenses: Expenses[];
  expenseData: Expenses[];
  setExpenseData: React.Dispatch<React.SetStateAction<Expenses[]>>;
  addExpenses: (data: Expenses) => void;
  removeExpenses: (id: string) => void;
  updateExpenses: (id: string, data: expenseDetail) => void;
}

export const ExpenseContext = createContext<expensesType>({
  expenses: [],
  expenseData: [],
  setExpenseData: () => {},
  addExpenses: () => {},
  removeExpenses: () => {},
  updateExpenses: () => {},
});

function expensesReduce(
  state: Expenses[],
  action: { type: string; payload: any }
): Expenses[] {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toISOString() + Math.random().toString();
      return [
        new Expenses(
          action.payload.data.id,
          action.payload.data.description,
          action.payload.data.amount,
          action.payload.data.date
        ),
        ...state,
      ];

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);

    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id
          ? new Expenses(
              expense.id,
              action.payload.data.description,
              action.payload.data.amount,
              action.payload.data.date
            )
          : expense
      );

    case "SET":
      return action.payload.data;

    default:
      return state;
  }
}

export function ExpenseContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userDetails } = useContext(AuthContext);

  const [expenseData, setExpenseData] = useState<Expenses[]>([]);
  const [expenseState, dispatch] = useReducer(expensesReduce, []);

  // Fetch data from Supabase and sync both reducer and local state
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!userDetails?.user.id) return;

      const { data, error } = await supabase
        .from("expenses")
        .select()
        .eq("userId", userDetails.user.id);

      if (data) {
        const mapped: Expenses[] = data.map((item) => {
          return new Expenses(
            item.id.toString(),
            item.description,
            item.amount,
            new Date(item.created_at)
          );
        });

        setExpenseData(mapped);
        dispatch({ type: "SET", payload: { data: mapped } });
      }

      if (error) {
        Alert.alert(error.name, error.message);
      }
    };

    fetchExpenses();
  }, [userDetails]);

  function addExpenses(data: expenseDetail) {
    dispatch({ type: "ADD", payload: { data } });
  }

  function removeExpenses(id: string) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  function updateExpenses(id: string, data: expenseDetail) {
    dispatch({ type: "UPDATE", payload: { id, data } });
  }

  const contextValues: expensesType = {
    expenses: expenseState,
    expenseData,
    setExpenseData,
    addExpenses,
    removeExpenses,
    updateExpenses,
  };

  return (
    <ExpenseContext.Provider value={contextValues}>
      {children}
    </ExpenseContext.Provider>
  );
}
