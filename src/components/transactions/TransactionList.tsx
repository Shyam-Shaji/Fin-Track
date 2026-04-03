import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { parseISO, format } from "date-fns";
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {motion , AnimatePresence} from 'framer-motion'
import AddTransactionDialog from "./AddTransactionDialog";
import type { Transaction } from "@/data/mockData";

export default function TransactionList(){
    const {filteredTransactions, role, deleteTransaction} = useAppContext();
    const [editTx, setEditTx] = useState<Transaction | null>(null);
    
    if(!filteredTransactions.length){
        return(
            <div className="glass-card p-10 text-center">
                <p className="texted-muted-foreground">No transaction found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
        );
    }

    return(
        <>
        <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Amount</th>
                        {role === 'admin' && (
                            <th className="text-right py-3 px-4  font-medium text-muted-foreground w-20">Actions</th>
                        )}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredTransactions.map((tx)=>(
                                <motion.tr
                                key={tx.id}
                                initial={{opacity:0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className="border-b last:border-0 hover:bg-muted/30 transition-color"
                                >
                                    <td className="py-3 px-4 text-muted-foreground">
                                        {format(parseISO(tx.date), "MMM d, yyyy")}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`flex items-center justify-center w-6 h-6  rounded-full ${
                                                tx.type === 'income' ? "bg-income/10 text-income" : "bg-expense/10 text-expense"
                                            }`}>
                                                {tx.type === 'income' ? (
                                                    <ArrowUpRight className="h-3.5 w-3.5"/>
                                                ): (
                                                    <ArrowDownRight className="h-3.5 w-3.5"/>
                                                )}
                                            </span>
                                            <span className="font-medium">{tx.description}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">
                                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-secondary">
                                            {tx.category}
                                        </span>
                                    </td> 
                                    <td className={`py-3 px-4 text-right font-mono font-medium ${
                                        tx.type === 'income' ? "text-income" : "text-expense"
                                    }`}>
                                        {tx.type === 'income' ? "+" : "-"}${tx.amount.toLocaleString("en-US", {minimumFractionDigits: 2})}
                                    </td>
                                    {role === 'admin' && (
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={()=> setEditTx(tx)}
                                                    className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                                                    <Pencil className="h-3.5 w-3.5"/>
                                                </button>
                                                <button onClick={()=> deleteTransaction(tx.id)}
                                                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-expense transition-colors">
                                                    <Trash2 className="h-3.5 w-3.5"/>
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>

        {editTx && (
            <AddTransactionDialog
            editTx={editTx}
            open={!!editTx}
            onOpenChange={(open) => !open && setEditTx(null)}
            />
        )}
        </>
    )
}