import TransactionPage from "./transactionPage";

export default function Home() {
  return (
<div className="flex min-h-screen flex-col items-center justify-between p-12">
    <div className="rounded-full p-15 flex flex-col justify-center items-center bg-zinc-900 dark:bg-white w-[6rem] h-[6rem]">
      <span className="text-inherit font-bold dark:text-zinc-900 text-white ">
        Transaction
      </span>
      <span className="text-inherit font-bold dark:text-zinc-900 text-white">
        Dashboard
      </span>
    </div>
      <TransactionPage/>
</div>
  );
}
