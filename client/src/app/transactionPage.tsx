"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const TransactionPage = () => {
  const [data, setData] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5454/api/combined-data?month=01"
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <p>{JSON.stringify(data.transactions)}</p>
      <div className="flex flex-col justify-center items-center w-[80vw]">
          <h1 className="text-2xl font-bold">Transactions</h1>
        <div>
          
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
            {data.transactions &&
              data.transactions.map((transaction: any) => (
                <TableRow key={transaction.id}>
                  <TableCell className="">{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="">{transaction.price}</TableCell>
                  <TableCell className="">{transaction.category}</TableCell>
                  <TableCell className="">
                    {transaction.sold ? (
                      <Badge variant="secondary">Sold</Badge>
                    ) : (
                      <Badge variant="destructive">
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
