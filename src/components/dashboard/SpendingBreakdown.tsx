import { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { type TransactionCategory } from "@/data/mockData";

const CHART_COLORS = [
    "hsl(160, 84%, 39%)",
    "hsl(200, 80%, 50%)",
    "hsl(260, 60%, 55%)",
    "hsl(38, 92%, 50%)",
    "hsl(330, 70%, 55%)",
    "hsl(160, 50%, 50%)",
];

export default function SpendingBreakdown() {
    const {transactions} = useAppContext();

    const data = useMemo(()=>{

        const expenses = transactions.filter((t)=> t.type === 'expense');
        const map = new Map<TransactionCategory, number>();
        expenses.forEach((t)=> map.set(t.category, (map.get(t.category) || 0) + t.amount));
        return Array.from(map.entries())
        .map(([name,value])=>({name,value}))
        .sort((a,b) => b.value - a.value);
    },[transactions]);

    const total = data.reduce((s,d) => s + d.value, 0);

    if(!data.length){
        return (
            <div className="glass-card p-6 flex items-center justify-center h-64">
                <p className="text-muted-foreground">No expenses to display</p>
            </div>
        )
    }

    return(
        <div className="glass-card p-6">
            <h3 className="section-title mb-4">Spending Breakdown</h3>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <ResponsiveContainer
                width="100%"
                height={220}
                className="max-w-[220px]"
                >
                    <PieChart>
                    <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    >
                        {data.map((_,i)=>(
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip
                    formatter={(value:any) =>
                        new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(value)
                    }
                    contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(220, 13%, 91%)",
                        borderRadius: "8px",
                        fontSize: "13px"
                    }}/>
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2 w-full">
                    {data.map((item,i)=>(
                        <div key={item.name} className="flex item-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: CHART_COLORS[i % CHART_COLORS.length]}}/>
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-foreground font-medium">
                                    ${item.value.toLocaleString()}
                                </span>
                                <span className="text-muted-foreground text-xs w-10 text-right">
                                    {((item.value / total) * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}