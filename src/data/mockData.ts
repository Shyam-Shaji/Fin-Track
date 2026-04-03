export type TransactionCategory =
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Bills & Utilities"
  | "Healthcare"
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Other";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
}

export type UserRole = "viewer" | "admin";

export const CATEGORIES: TransactionCategory[] = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

export const EXPENSE_CATEGORIES: TransactionCategory[] = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Other",
];

export const INCOME_CATEGORIES: TransactionCategory[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-03-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2026-03-02", description: "Grocery Store", amount: 87.50, category: "Food & Dining", type: "expense" },
  { id: "3", date: "2026-03-03", description: "Electric Bill", amount: 145.00, category: "Bills & Utilities", type: "expense" },
  { id: "4", date: "2026-03-04", description: "Uber Ride", amount: 24.30, category: "Transportation", type: "expense" },
  { id: "5", date: "2026-03-05", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "6", date: "2026-03-06", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "7", date: "2026-03-07", description: "Restaurant Dinner", amount: 62.00, category: "Food & Dining", type: "expense" },
  { id: "8", date: "2026-03-08", description: "Gas Station", amount: 48.75, category: "Transportation", type: "expense" },
  { id: "9", date: "2026-03-09", description: "Online Shopping", amount: 199.99, category: "Shopping", type: "expense" },
  { id: "10", date: "2026-03-10", description: "Doctor Visit", amount: 120.00, category: "Healthcare", type: "expense" },
  { id: "11", date: "2026-03-11", description: "Investment Return", amount: 340.00, category: "Investment", type: "income" },
  { id: "12", date: "2026-03-12", description: "Coffee Shop", amount: 5.50, category: "Food & Dining", type: "expense" },
  { id: "13", date: "2026-03-13", description: "Phone Bill", amount: 85.00, category: "Bills & Utilities", type: "expense" },
  { id: "14", date: "2026-03-14", description: "Movie Tickets", amount: 28.00, category: "Entertainment", type: "expense" },
  { id: "15", date: "2026-03-15", description: "Clothing Store", amount: 156.00, category: "Shopping", type: "expense" },
  { id: "16", date: "2026-03-16", description: "Freelance Bonus", amount: 500, category: "Freelance", type: "income" },
  { id: "17", date: "2026-03-17", description: "Pharmacy", amount: 32.50, category: "Healthcare", type: "expense" },
  { id: "18", date: "2026-03-18", description: "Lunch Takeout", amount: 14.25, category: "Food & Dining", type: "expense" },
  { id: "19", date: "2026-03-19", description: "Internet Bill", amount: 60.00, category: "Bills & Utilities", type: "expense" },
  { id: "20", date: "2026-03-20", description: "Bus Pass", amount: 75.00, category: "Transportation", type: "expense" },
  // Historical data for trends
  { id: "21", date: "2026-02-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "22", date: "2026-02-05", description: "Groceries", amount: 95.00, category: "Food & Dining", type: "expense" },
  { id: "23", date: "2026-02-08", description: "Electric Bill", amount: 138.00, category: "Bills & Utilities", type: "expense" },
  { id: "24", date: "2026-02-12", description: "Shopping Mall", amount: 220.00, category: "Shopping", type: "expense" },
  { id: "25", date: "2026-02-15", description: "Freelance Work", amount: 800, category: "Freelance", type: "income" },
  { id: "26", date: "2026-02-18", description: "Dining Out", amount: 75.00, category: "Food & Dining", type: "expense" },
  { id: "27", date: "2026-02-20", description: "Gas", amount: 52.00, category: "Transportation", type: "expense" },
  { id: "28", date: "2026-02-25", description: "Concert Tickets", amount: 95.00, category: "Entertainment", type: "expense" },
  { id: "29", date: "2026-01-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "30", date: "2026-01-05", description: "Groceries", amount: 110.00, category: "Food & Dining", type: "expense" },
  { id: "31", date: "2026-01-10", description: "Heating Bill", amount: 180.00, category: "Bills & Utilities", type: "expense" },
  { id: "32", date: "2026-01-15", description: "Freelance Project", amount: 1500, category: "Freelance", type: "income" },
  { id: "33", date: "2026-01-18", description: "Winter Clothes", amount: 340.00, category: "Shopping", type: "expense" },
  { id: "34", date: "2026-01-22", description: "Gym Membership", amount: 45.00, category: "Healthcare", type: "expense" },
  { id: "35", date: "2026-01-28", description: "Taxi", amount: 35.00, category: "Transportation", type: "expense" },
];

export default mockTransactions;

export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  "Food & Dining": "hsl(var(--chart-1))",
  "Transportation": "hsl(var(--chart-2))",
  "Shopping": "hsl(var(--chart-3))",
  "Entertainment": "hsl(var(--chart-4))",
  "Bills & Utilities": "hsl(var(--chart-5))",
  "Healthcare": "hsl(160, 50%, 50%)",
  "Salary": "hsl(var(--chart-1))",
  "Freelance": "hsl(var(--chart-2))",
  "Investment": "hsl(var(--chart-3))",
  "Other": "hsl(var(--chart-4))",
};