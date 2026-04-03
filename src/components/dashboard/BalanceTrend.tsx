import { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
 } from "recharts";

 import { format, parseISO, startOfMonth, eachMonthOfInterval } from "date-fns";

 export default function BalanceTrend(){
    const {transactions} = useAppContext();

    const data = useMemo(()=>{
        if(!transactions.length) return [];

        const sorted = [...transactions].sort(
            (a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const months = eachMonthOfInterval({
            start: startOfMonth(parseISO(sorted[0].date)),
            end: startOfMonth(parseISO(sorted[sorted.length - 1].date)),
        });

        let runningBalance = 0;
        return months.map((month)=>{
            const monthTxs = transactions.filter(
                (t) => 
                    startOfMonth(parseISO(t.date)).getTime() === month.getTime()
            );
            const income = monthTxs.filter((t) => t.type === 'income').reduce((s,t)=> s + t.amount, 0);
            const expense = monthTxs.filter((t)=> t.type === 'expense').reduce((s,t) => s + t.amount, 0);
            runningBalance += income - expense;

            return {
                month: format(month,"MMM yyyy"),
                income,
                expense,
                balance: runningBalance,
            };
        });
    },[transactions]);

    if(!data.length){
        return(
            <div className="glass-card p-6  flex items-center justify-center h-64">
                <p className="text-muted-foreground">
                    No data to display
                </p>
            </div>
        );
    }

    return(
        <div className="glass-card p-6">
            <h3 className="section-title mb-4">Balance Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{top: 5, right: 5, left: -20, bottom: 5}}>
                <defs>
                    <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)"/>
                <XAxis dataKey="month" tick={{fontSize: 12}} stroke="hsl(220,10%,46%)"/>
                <YAxis tick={{fontSize:12}} stroke="hsl(220, 10%, 46%)"/>
                <Tooltip
                contentStyle={{backgroundColor: "hsl(0,0%,100%)",
                    border: "1px solid hsl(220,13%,91%)",
                    borderRadius: "8px",
                    fontSize: "13px",
                }}
            formatter={(value: any) =>
              new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value))
            }
                 />
                 <Area type="monotone"
                 dataKey="balance"
                 stroke="hsl(160, 84%, 39%)"
                 strokeWidth={2}
                 fill="url(#balanceGrad)"
                 />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
 }

 