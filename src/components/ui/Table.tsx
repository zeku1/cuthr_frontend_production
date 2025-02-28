"use client";

import React, { useEffect, useState } from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableCell from "./TableCell";
import { FaTimesCircle, FaArrowCircleUp } from "react-icons/fa";
import Link from "next/link";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  strand: string;
  school_id: number;
  contact_number: string;
  emergency_contact: string;
  transaction_number: string;
  verified: number | null;
}

interface TableProps {
  selectedStrand: string;
  students: Student[];
}

const Table: React.FC<TableProps> = ({ selectedStrand, students }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Filter data based on selected strand
  const filteredData = selectedStrand === "ALL" || selectedStrand === "FACULTY"
    ? students
    : students.filter(item => item.strand === selectedStrand);

  return (
    <div className="bg-[#1D8E42] p-3 md:p-5 rounded-lg shadow-md h-[400px] w-full">
      <div className="relative h-[340px] w-full overflow-x-auto">
        <div className="absolute w-full h-full overflow-auto custom-scrollbar">
          <table className="w-full border-collapse text-xs md:text-sm whitespace-nowrap">
            <colgroup>
              <col className="min-w-[128px] md:w-auto" />
              <col className="min-w-[128px] md:w-auto" />
              <col className="min-w-[192px] md:w-auto" />
              <col className="min-w-[96px] md:w-auto" />
              <col className="min-w-[96px] md:w-auto" />
              <col className="min-w-[128px] md:w-auto" />
              <col className="min-w-[128px] md:w-auto" />
              <col className="min-w-[128px] md:w-auto" />
              <col className="min-w-[96px] md:w-auto" />
              <col className="min-w-[96px] md:w-auto" />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableHeader>First Name</TableHeader>
                <TableHeader>Last Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Strand</TableHeader>
                <TableHeader>School ID</TableHeader>
                <TableHeader>Contact</TableHeader>
                <TableHeader>Emergency No.</TableHeader>
                <TableHeader>Transaction No.</TableHeader>
                <TableHeader>Verified</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.strand}</TableCell>
                  <TableCell>{item.school_id}</TableCell>
                  <TableCell>{item.contact_number}</TableCell>
                  <TableCell>{item.emergency_contact}</TableCell>
                  <TableCell>{item.transaction_number}</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={!item.verified}/>
                        <div className="w-10 h-5 bg-[#5AC656] rounded-full peer-focus:ring-4 peer-focus:ring-[#5AC656] peer-checked:bg-gray-200 transition-colors"></div>
                        <div className="w-4 h-4 bg-white border border-gray-300 rounded-full absolute top-0.5 left-[2px] transition-all peer-checked:translate-x-5 peer-checked:bg-[#5AC656]"></div>
                    </label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      
                        <FaTimesCircle className="text-white text-lg cursor-pointer" />
                      <Link href={`/update-student/${item.id}`}>
                        <FaArrowCircleUp className="text-white text-lg cursor-pointer" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;