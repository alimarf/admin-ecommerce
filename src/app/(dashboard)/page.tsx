"use client"

import React, { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface HomeProps {
  
}

const Home: FC<HomeProps> = ({  }) => {
   const data = [
    { id: 1, name: 'Product 1', price: 200000, rating: 4, qty:20 },
    { id: 2, name: 'Product 2', price: 300000,  rating: 5, qty:2},
    // Add more data as needed
  ];

  return (
    <div>
      <h1>Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Qty</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.rating}</TableCell>
              <TableCell>{item.qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </div>
  )
}

export default Home;