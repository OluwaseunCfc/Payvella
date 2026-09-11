import { useState, useMemo } from 'react'
import TransactionFilters from '../../components/transactions/TransactionFilters'
import TransactionCard from '../../components/transactions/TransactionCard'
import { mockTransactions } from '../../data/mockData'

export default function TransactionHistory() {
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    return mockTransactions.filter((txn) => {
      const matchesCategory = category === 'all' || txn.category === category
      const matchesStatus = status === 'all' || txn.status === status
      return matchesCategory && matchesStatus
    })
  }, [category, status])

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-headline-sm text-text-primary">Transaction History</h1>
        <p className="text-body-sm text-text-secondary">
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <TransactionFilters
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
          <span className="text-headline-md">🧾</span>
          <p className="text-title-md text-text-primary">No transactions found</p>
          <p className="text-body-sm text-text-secondary max-w-[240px]">
            Try adjusting your filters or check back after your next transaction.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((txn) => (
            <TransactionCard key={txn.id} transaction={txn} />
          ))}
        </div>
      )}
    </div>
  )
}