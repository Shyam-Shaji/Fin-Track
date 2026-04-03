import { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { parseISO, format, startOfMonth } from "date-fns";
import { TrendingUp, TrendingDown, AlertCircle, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function InsightsPanel(){
    const {transactions} = useAppContext();

    const insights = useMemo(() => {
        const expenses = transactions.filter((t)=> t.type === 'expense');

        //Highest spending category
        const catMap = new Map<string, number>();
        expenses.forEach((t)=> catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
        const topCategory = [...catMap.entries()].sort((a,b)=> b[1] - a[1])[0];

        //Monthly comparison
        const monthMap = new Map<string, {income: number, expense: number}>();
        transactions.forEach((t)=>{
            const key = format(startOfMonth(parseISO(t.date)), "yyy-MM");
            const entry = monthMap.get(key) || {income: 0, expense: 0};
            if(t.type === 'income') entry.income += t.amount;
            else entry.expense += t.amount;
            monthMap.set(key, entry);
        });

        const months = [...monthMap.entries()].sort((a,b)=> b[0].localeCompare(a[0]));
        const currentMoth = months[0];
        const prevMonth = months[1];

        let expenseChange : number | null = null;
        if(currentMoth && prevMonth){
            expenseChange = ((currentMoth[1].expense - prevMonth[1].expense) / prevMonth[1].expense) * 100;
        }

        //Saving rate
        const totalIncome = transactions.filter((t)=> t.type === 'income').reduce((s,t)=> s + t.amount, 0);
        const totalExpense = expenses.reduce((s,t) => s + t.amount, 0);
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

        //Average transaction
        const avgExpense = expenses.length ? totalExpense / expenses.length : 0;

        return{
            topCategory,
            expenseChange,
            savingsRate,
            avgExpense,
            currentMoth,
            prevMonth
        };
    },[transactions]);

    if(!transactions.length){
        return(
            <div className="glass-card p-10 text-center">
                <p className="text-muted-foreground">Add transactions to see insights</p>
            </div>
        );
    }

    const items = [
    {
      icon: AlertCircle,
      title: "Top Spending Category",
      value: insights.topCategory ? insights.topCategory[0] : "N/A",
      detail: insights.topCategory
        ? `$${insights.topCategory[1].toLocaleString()} total`
        : "",
      color: "text-chart-4",
      bgColor: "bg-warning/10",
    },
    {
      icon: insights.expenseChange !== null && insights.expenseChange < 0 ? TrendingDown : TrendingUp,
      title: "Expense Trend",
      value:
        insights.expenseChange !== null
          ? `${insights.expenseChange > 0 ? "+" : ""}${insights.expenseChange.toFixed(1)}%`
          : "N/A",
      detail:
        insights.expenseChange !== null
          ? insights.expenseChange < 0
            ? "Spending decreased vs last month"
            : "Spending increased vs last month"
          : "Need more data",
      color: insights.expenseChange !== null && insights.expenseChange < 0 ? "text-income" : "text-expense",
      bgColor: insights.expenseChange !== null && insights.expenseChange < 0 ? "bg-income/10" : "bg-expense/10",
    },
    {
      icon: BarChart3,
      title: "Savings Rate",
      value: `${insights.savingsRate.toFixed(1)}%`,
      detail: insights.savingsRate > 20 ? "Healthy savings rate" : "Consider reducing expenses",
      color: insights.savingsRate > 20 ? "text-income" : "text-chart-4",
      bgColor: insights.savingsRate > 20 ? "bg-income/10" : "bg-warning/10",
    },
    {
      icon: TrendingDown,
      title: "Avg. Expense",
      value: `$${insights.avgExpense.toFixed(0)}`,
      detail: "Per transaction average",
      color: "text-muted-foreground",
      bgColor: "bg-secondary",
    },
  ];

  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i)=>(
            <motion.div
            key={item.title}
            initial={{opacity:0, y:12}}
            animate={{opacity:1, y:0}}
            transition={{delay: i * 0.08, duration:0.35}}
            className="glass-card p-5"
            >
                <div className="flex items-start gap-3">
                    <span className={`flex items-center justify-center w-9 h-9 rounded-lg ${item.bgColor}`}>
                        <item.icon className={`h-4.5 w-4.5 ${item.color}`}/>
                    </span>
                    <div>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        <p className={`text-xl font-bold font-mono mt-0.5 ${item.color}`}>{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
  )
}

