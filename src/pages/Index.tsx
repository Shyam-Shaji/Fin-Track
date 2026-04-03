import { AppProvider, useAppContext } from '@/context/AppContext'
import { LayoutDashboard, Sun, Moon } from 'lucide-react'
import RoleToggle from '@/components/dashboard/RoleToggle'
import SummaryCard from '@/components/dashboard/SummaryCard';
import BalanceTrend from '@/components/dashboard/BalanceTrend';
import SpendingBreakdown from '@/components/dashboard/SpendingBreakdown';
import InsightsPanel from '@/components/insights/InsightsPanel';
import AddTransactionDialog from '@/components/transactions/AddTransactionDialog';
import TransactionFilters from '@/components/transactions/TransactionFilters';
import TransactionList from '@/components/transactions/TransactionList';
import { useTheme } from '@/context/theme-provider';


function DashboardContent(){
    const {role} = useAppContext();
    const {theme, setTheme} = useTheme();
    const isDark = theme === 'dark';
    return(
        <div className='min-h-screen bg-background'>
            <header className='border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
                <div className='flex items-center gap-2.5'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground'>
                        <LayoutDashboard className='h-4 w-4'/>
                    </div>
                    <h1 className='text-lg font-bold tracking-tight'>Fin-Track</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <RoleToggle/>
                    <div
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={`flex items-center cursor-pointer transition-transform duration-500 ${
                        isDark ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        {isDark ? (
                        <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
                        ) : (
                        <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
                        )}
                    </div>
                </div>
            </div>
            </header>
            {/* main */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6'>
                {/* Summary */}
                <SummaryCard/>

                {/* Charts */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <BalanceTrend/>
                    <SpendingBreakdown/>
                </div>

                {/* Insights */}
                <section>
                    <h2 className='section-title mb-4'>Insights</h2>
                    <InsightsPanel/>
                </section>

                {/* Transactions */}
                <section>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='section-title'>Transactions</h2>
                        {role === 'admin' && <AddTransactionDialog/>}
                    </div>
                    <div className='space-y-4'>
                        <TransactionFilters/>
                        <TransactionList/>
                    </div>
                </section>
            </main>
        </div>
    )
}

const Index = () => {
  return (
    <AppProvider>
        <DashboardContent/>
    </AppProvider>
  )
}

export default Index;