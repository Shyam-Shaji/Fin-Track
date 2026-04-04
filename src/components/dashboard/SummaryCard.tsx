import { useAppContext } from "@/context/AppContext";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const fmt = (n:number) =>
    new Intl.NumberFormat("en-US",{style: "currency", currency: "USD"}).format(n);

const cards = [
  { key: "balance", label: "Total Balance", icon: Wallet, getValue: (b: number) => b, colorClass: "text-foreground" },
  { key: "income", label: "Total Income", icon: TrendingUp, getValue: (_: number, i: number) => i, colorClass: "text-income" },
  { key: "expenses", label: "Total Expenses", icon: TrendingDown, getValue: (_: number, __: number, e: number) => e, colorClass: "text-expense" },
] as const;

export default function SummaryCard(){
    const {totalBalance, totalIncome, totalExpenses, transactions} = useAppContext();
    const txCount = transactions.length;
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card,i)=>(
                <motion.div key={card.key}
                initial={{opacity: 0, y:12}}
                animate={{opacity: 1, y:0}}
                transition={{delay: i * 0.08, duration: 0.35}}
                className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{card.label}</span>
                        <card.icon className={`h-4 w-4 ${card.colorClass}`}/>
                    </div>
                    <p className={`start-value font-bold ${card.colorClass}`}>
                        {fmt(card.getValue(totalBalance, totalIncome, totalExpenses))}
                    </p>
                </motion.div>
            ))}
            <motion.div
            initial={{opacity: 0, y:12}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.24, duration: 0.35}}
            className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Transactions</span>
                    <DollarSign className="h-4 w-4 text-muted-foreground"/>
                </div>
                <p className="start-value font-bold">{txCount}</p>
            </motion.div>
        </div>
    )
}
