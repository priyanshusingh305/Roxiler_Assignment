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
    transactions: Transaction[];
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
  const [position, setPosition] = useState("03");
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5454/api/combined-data?month=${position}`
      );
      setData(response.data);
    };
    fetchData();
    console.log(position);
  }, [,position]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:5454/api/transactions?month=${position}&search=${searchInputValue}&page=1&perPage=10`
      );
      setData(response.data);
    }

  },[searchInputValue]);

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
            {data?.transactions &&
              data?.transactions.map((transaction: Transaction) => (
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
      </div>
    </div>
  );
};

export default TransactionPage;
