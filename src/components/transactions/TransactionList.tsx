import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { parseISO, format } from "date-fns";
import { Pencil, Trash2, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import {motion , AnimatePresence} from 'framer-motion'
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddTransactionDialog from "./AddTransactionDialog";
import type { Transaction } from "@/data/mockData";

export default function TransactionList(){
    const {filteredTransactions, role, deleteTransaction} = useAppContext();
    const [editTx, setEditTx] = useState<Transaction | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    // Reset page to 1 when search/filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTransactions.length, filteredTransactions[0]?.id]); // Use length and first ID as heuristic for changes

    const handleConfirmDelete = () => {
        if (deletingId) {
            deleteTransaction(deletingId);
            toast.success("Transaction deleted successfully", {
                description: "The record has been permanently removed.",
            });
            setDeletingId(null);
        }
    };
    
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
                        <AnimatePresence mode="popLayout">
                            {paginatedTransactions.map((tx)=>(
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
                                                <button onClick={()=> setDeletingId(tx.id)}
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
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-4 border-t bg-muted/20">
                    <div className="text-xs text-muted-foreground">
                        Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
                        <span className="font-medium text-foreground">
                            {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}
                        </span>{" "}
                        of <span className="font-medium text-foreground">{filteredTransactions.length}</span> entries
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground disabled:opacity-30 transition-all active:scale-95"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        
                        <div className="flex items-center gap-1 px-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                // Simple logic to show current, first, last, and neighbors if many pages
                                if (
                                    totalPages <= 7 ||
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`min-w-8 h-8 rounded-md text-xs font-medium transition-all active:scale-95 ${
                                                currentPage === page
                                                    ? "bg-primary text-primary-foreground shadow-md"
                                                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    (page === currentPage - 2 && page > 1) ||
                                    (page === currentPage + 2 && page < totalPages)
                                ) {
                                    return <span key={page} className="text-muted-foreground px-1">...</span>;
                                }
                                return null;
                            })}
                        </div>
                        
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground disabled:opacity-30 transition-all active:scale-95"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>

        {editTx && (
            <AddTransactionDialog
            editTx={editTx}
            open={!!editTx}
            onOpenChange={(open) => !open && setEditTx(null)}
            />
        )}

        <Dialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader className="items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <DialogTitle>Delete Transaction?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the transaction
                        from your records.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center gap-2 mt-2">
                    <Button
                        variant="outline"
                        onClick={() => setDeletingId(null)}
                        className="flex-1 sm:flex-none"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirmDelete}
                        className="flex-1 sm:flex-none"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}