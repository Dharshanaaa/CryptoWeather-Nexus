import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CryptoMetricsTableProps {
  data: any;
}

export default function CryptoMetricsTable({ data }: CryptoMetricsTableProps) {
  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Format price with commas and 2 decimal places
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format percentage
  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(2)}%`;
  };

  // Prepare metrics data
  const metrics = [
    { name: "Current Price", value: formatPrice(data.price) },
    { name: "Market Cap", value: formatPrice(data.marketCap) },
    { name: "24h Trading Volume", value: formatPrice(data.volume24h) },
    {
      name: "24h Low / 24h High",
      value: `${formatPrice(data.low24h)} / ${formatPrice(data.high24h)}`,
    },
    { name: "All-Time High", value: formatPrice(data.ath) },
    {
      name: "All-Time High Date",
      value: new Date(data.athDate).toLocaleDateString(),
    },
    {
      name: "All-Time High Change %",
      value: formatPercentage(data.athChangePercentage),
    },
    { name: "Circulating Supply", value: formatNumber(data.circulatingSupply) },
    { name: "Total Supply", value: formatNumber(data.totalSupply) },
    {
      name: "Max Supply",
      value: data.maxSupply ? formatNumber(data.maxSupply) : "∞",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.name}>
              <TableCell className="font-medium">{metric.name}</TableCell>
              <TableCell>{metric.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
