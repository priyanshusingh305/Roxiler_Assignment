"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TransactionPage = () => {
  interface Transaction {
    id: number;
    title: string;
    description: string;
    price: number;
    dateOfSale: Date;
    category: string;
    image: string;
    sold: boolean;
  }

  interface Data {
    transactions: Transaction[],
    statistics: {
      totalSoldItems: number;
      totalNotSoldItems: number;
      totalSaleAmount: number;
    },
    barChart:{
      range: string;
      count: number;
    }[]
  }
  

  const monthData = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];
 const [data, setData] = useState<Data | null>(null);
 const [TableData,setTableData]=useState<Transaction[] | null>(null);
  const [position, setPosition] = useState("03");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [page, setPage]=useState(1);
  const handleMonthfinder = () => {
    const month = monthData.find(month => month.value === position);
    return month?.name;
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5454/api/combined-data?month=${position}`
      );
      setData(response.data);
    };
    fetchData();
    console.log(data?.statistics,position);
  }, [][position]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5454/api/transactions?month=${position}&search=${searchInputValue}&page=${page}&perPage=10`
      );
      setTableData(response.data);
    }
    fetchData();
  },[searchInputValue,page,position]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[80vw]">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex flex-row justify-between w-[80vw] ">
        <Input type="text" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} placeholder="Search" className="w-[15vw]" />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Month</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Month</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {monthData.map((month) => (
                  <DropdownMenuRadioItem value={month.value} key={month.value}>
                    {month.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead className="">Sold</TableHead>
              <TableHead className="">Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {TableData &&
            TableData?.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="">{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="">₹{transaction.price}</TableCell>
                  <TableCell className="">{transaction.category}</TableCell>
                  <TableCell className="">
                    {transaction.sold ? (
                      <Badge variant="secondary">Sold</Badge>
                    ) : (
                      <Badge
                        className="text-xs whitespace-nowrap   "
                        variant="destructive"
                      >
                        <p>Not Sold</p>
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="">
                    <Image
                      src={transaction.image}
                      alt="alt"
                      width={40}
                      height={40}
                    />
                  </TableCell>
                </TableRow>
              ))}
              
          </TableBody>
        </Table>
        {TableData?.length === 0 && (
                
                <div className="text-center">No transactions found</div>
                
              )}
        <div className="flex flex-row justify-between w-[80vw] "> 
        <Button disabled={page<=1} onClick={()=>setPage(page-1)} variant="secondary">Previous</Button>
        <p>Page {page}</p>
        <Button onClick={()=>setPage(page+1)} variant="secondary">Next</Button>
        </div>
        {/* Card */}
        <div className="mt-10">
          
          <h1 className="text-2xl font-bold">Statistics - {handleMonthfinder() || ''}</h1>
          <div className="grid grid-cols-2 grid-rows-1 gap-2 p-10 rounded-lg dark:bg-slate-900 bg-slate-400 w-[30vw]">
            <div className="grid grid-cols-1 grid-rows-3 gap-2 "> 
              <div className="font-semibold">Total Sale</div>
              <div className="font-semibold">Total sold item</div>
              <div className="font-semibold">Total not sold item</div>
             </div>
            <div  className="grid grid-cols-1 grid-rows-3 gap-2">
              <div>{data?.statistics.totalSaleAmount}</div>
              <div>{data?.statistics.totalSoldItems}</div>
              <div>{data?.statistics.totalNotSoldItems}</div>
            </div>
          </div>
        </div>

        {/* Transactions Bar Char  */}
          
      </div>

    </div>
  );
};

export default TransactionPage;
