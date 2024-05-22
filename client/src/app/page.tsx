import TransactionPage from "./transactionPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      <h1 className="text-4xl font-bold mb-7 dark:text-gray-400">
        Transaction Dashboard
      </h1>
      <TransactionPage />
    </div>
  );
}
