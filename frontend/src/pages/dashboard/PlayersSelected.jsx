import BoxLoading from "@/components/BoxLoading";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useGetRecentSoldPlayerQuery } from "@/redux/features/dashboard/dashboardApi"

  

  export function PlayersSelected() {
    
    const {data:players,isLoading,isError}=useGetRecentSoldPlayerQuery();

    
    if(isLoading || isError){
      return <BoxLoading/>
    }
  
    return (
      <Table>
        <TableCaption> List of the sold players</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Position</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead className="text-right">Wage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.data.map((item,index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.position}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell className="text-right">{item.wage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  