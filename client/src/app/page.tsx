import TransactionPage from "./transactionPage";

export default function Home() {
  return (
<div className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="rounded-full flex flex-col justify-center items-center bg-zinc-900 dark:bg-white w-[12rem] h-[12rem]">
      <span className="text-2xl font-bold dark:text-zinc-900 text-white ">
        Transaction
      </span>
      <span className="text-xl font-bold dark:text-zinc-900 text-white">
        Dashboard
      </span>
    </div>
      <TransactionPage/>
</div>
  );
}
