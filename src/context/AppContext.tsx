import React, {createContext, useContext, useState, useCallback, useMemo} from "react";
import initialTransactions, { type Transaction, type TransactionCategory, type TransactionType, type UserRole } from "@/data/mockData";

interface Filters{
    search: string;
    category: TransactionCategory | "All";
    type: TransactionType | "All";
    sortBy: "date" | "amount";
    sortOrder: "asc" | "desc";
}

interface AppContextType {
    transactions: Transaction[];
    role: UserRole;
    setRole: (role: UserRole) => void;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    filteredTransactions: Transaction[];
   addTransaction: (tx: Omit<Transaction, "id">) => void;
   editTransaction: (id: string, tx: Omit<Transaction, "id">) => void;
   deleteTransaction: (id: string) => void;
   totalBalance: number;
   totalIncome: number;
   totalExpenses: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [role,setRole] = useState<UserRole>('admin');
    const [filters,setFilters] = useState<Filters>({
        search: "",
        category: "All",
        type: "All",
        sortBy: "date",
        sortOrder: "desc",
    });

    const filteredTransactions = useMemo(()=> {
        let result = [...transactions];

        if(filters.search){
            const q = filters.search.toLocaleLowerCase();
            result = result.filter(
                (t) => t.description.toLocaleLowerCase().includes(q)
                || t.category.toLocaleLowerCase().includes(q)
            );
        }

        if(filters.category !== "All"){
            result = result.filter((t) => t.category === filters.category);
        }

        if(filters.type !== "All"){
            result = result.filter((t) => t.type === filters.type);
        }

        result.sort((a,b)=>{
            const mul = filters.sortOrder === "asc" ? 1 : -1;

            if(filters.sortBy === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
            return mul * (a.amount - b.amount);
        });

        return result;
    },[transactions,filters]);

    const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...tx, id: crypto.randomUUID() },
      ...prev,
    ]);
  }, []);

  const editTransaction = useCallback((id: string, tx: Omit<Transaction, "id">) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...tx, id } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const { totalIncome, totalExpenses } = useMemo(() => {
    const inc = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome: inc, totalExpenses: exp };
  }, [transactions]);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        filters,
        setFilters,
        filteredTransactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        totalBalance,
        totalIncome,
        totalExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};