import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, type TransactionCategory, type TransactionType } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    const [errors, setErrors] = useState<Record<string, string>>({});

    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!description.trim()) {
            newErrors.description = "Description is required";
        } else if (description.trim().length < 3) {
            newErrors.description = "Description must be at least 3 characters";
        }

        if (!amount) {
            newErrors.amount = "Amount is required";
        } else if (parseFloat(amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (!category) {
            newErrors.category = "Category is required";
        }

        if (!date) {
            newErrors.date = "Date is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please correct the errors", {
                description: "Ensure all required fields are correctly filled.",
            });
            return;
        }

        const tx = {
            date,
            description,
            amount: parseFloat(amount),
            category: category as TransactionCategory,
            type,
        }

        if(editTx){
            editTransaction(editTx.id, tx);
            toast.success("Transaction updated", {
                description: "Your changes have been saved successfully.",
            });
        }else{
            addTransaction(tx);
            toast.success("Transaction added", {
                description: "A new record has been created.",
            });
        }

        setIsOpen(false);
        setErrors({});
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
                        <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>Description</Label>
                        <Input 
                            id="description" 
                            value={description} 
                            onChange={(e)=> {setDescription(e.target.value); if(errors.description) setErrors(prev => ({...prev, description: ""}))}} 
                            placeholder="e.g. Grocery Store"
                            className={errors.description ? "border-destructive focus-visible:ring-destructive" : ""}
                        />
                        <AnimatePresence>
                            {errors.description && (
                                <motion.p 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-[11px] font-medium text-destructive flex items-center gap-1 mt-0.5"
                                >
                                    <AlertCircle className="h-3 w-3" /> {errors.description}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="amount" className={errors.amount ? "text-destructive" : ""}>Amount</Label>
                            <Input 
                                id="amount" 
                                type="number" 
                                step="0.01" 
                                min="0" 
                                value={amount} 
                                onChange={(e)=> {setAmount(e.target.value); if(errors.amount) setErrors(prev => ({...prev, amount: ""}))}} 
                                placeholder="0.00"
                                className={errors.amount ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                             <AnimatePresence>
                                {errors.amount && (
                                    <motion.p 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-[11px] font-medium text-destructive flex items-center gap-1 mt-0.5"
                                    >
                                        <AlertCircle className="h-3 w-3" /> {errors.amount}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="date" className={errors.date ? "text-destructive" : ""}>Date</Label>
                            <Input 
                                id="date" 
                                type="date" 
                                value={date} 
                                onChange={(e)=> {setDate(e.target.value); if(errors.date) setErrors(prev => ({...prev, date: ""}))}}
                                className={errors.date ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            <AnimatePresence>
                                {errors.date && (
                                    <motion.p 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-[11px] font-medium text-destructive flex items-center gap-1 mt-0.5"
                                    >
                                        <AlertCircle className="h-3 w-3" /> {errors.date}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="category" className={errors.category ? "text-destructive" : ""}>Category</Label>
                        <Select value={category} onValueChange={(v)=> {setCategory(v as TransactionCategory); if(errors.category) setErrors(prev => ({...prev, category: ""}))}}>
                            <SelectTrigger id="category" className={`w-full ${errors.category ? "border-destructive focus:ring-destructive" : ""}`}>
                                <SelectValue placeholder="Select category"/>
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c)=>(
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                 ))}
                            </SelectContent>
                        </Select>
                        <AnimatePresence>
                            {errors.category && (
                                <motion.p 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-[11px] font-medium text-destructive flex items-center gap-1 mt-0.5"
                                >
                                    <AlertCircle className="h-3 w-3" /> {errors.category}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <Button type="submit" className="w-full mt-2">
                        {editTx ? "Save Changes" : "Add Transaction"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )  
}