import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, type TransactionCategory, type TransactionType } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus } from "lucide-react";

interface Props {
    editTx?: {id: string; date: string; description: string; amount: number; category: TransactionCategory; type: TransactionType} | null;
    open?: boolean;
    onOpenChange?: (open:boolean) => void;
}

export default function AddTransactionDialog({editTx, open, onOpenChange}: Props){
    const {addTransaction, editTransaction} = useAppContext();
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

    const [type,setType] = useState<TransactionType>(editTx?.type || 'expense');
    const [description,setDescription] = useState(editTx?.description || '');
    const [amount,setAmount] = useState(editTx?.amount?.toString() || '');
    const [category,setCategory] = useState<TransactionCategory | "">(editTx?.category || "");
    const [date,setDate] = useState(editTx?.date || new Date().toISOString().split('T')[0]);

    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!description || !amount || !category || !date) return;

        const tx = {
            date,
            description,
            amount: parseFloat(amount),
            category: category as TransactionCategory,
            type,
        }

        if(editTx){
            editTransaction(editTx.id, tx);
        }else{
            addTransaction(tx);
        }

        setIsOpen(false);
        if(!editTx){
            setDescription("");
            setAmount("");
            setCategory("")
            setDate(new Date().toISOString().split("T")[0]);
        }
    };

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <Button size="sm" className="gap-1.5">
                        <Plus className="h-4 w-4"/>
                        Add Transaction
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{editTx ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="flex gap-2 mb-2">
                        <button
                        type="button"
                        onClick={()=> {setType("expense"); setCategory("")}}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                            type === 'expense' ? "bg-destructive text-destructive-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                        >
                            Expense
                        </button>
                        <button
                        type="button"
                        onClick={()=> {setType('income'); setCategory("")}}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                            type === 'income' ? "bg-emerald-600 text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                        >
                            Income
                        </button>
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="e.g. Grocery Store"/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" step="0.01" min="0" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="0.00"/>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
                        </div>
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={(v)=> setCategory(v as TransactionCategory)}>
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select category"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c)=>(
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                 ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full mt-2">
                        {editTx ? "Save Changes" : "Add Transaction"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )  
}