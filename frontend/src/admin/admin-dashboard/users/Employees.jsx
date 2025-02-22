import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetEmployeeDetailsQuery } from "@/redux/features/admin/adminApi";

const Employees = () => {
  const { data: employees, isLoading } = useGetEmployeeDetailsQuery();

  return (
    <div className="h-[90vh]">
      <Table>
        <TableCaption>A list of your recent Employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Emp Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees?.data?.map((employee) => (
            <TableRow key={employee.admin_id}>
              <TableCell className="font-medium">{employee.admin_id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell className="text-right">{employee.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Employees;
