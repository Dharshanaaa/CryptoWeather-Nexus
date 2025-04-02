import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WeatherHistoryTableProps {
  data: any[];
}

export default function WeatherHistoryTable({
  data,
}: WeatherHistoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>Condition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
              <TableCell>{item.temperature}</TableCell>
              <TableCell>{item.humidity}</TableCell>
              <TableCell>{item.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
