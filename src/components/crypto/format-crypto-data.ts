export function formatCryptoData(data: string): { [key: string]: string } {
    try {
      const parsed = JSON.parse(data)
      const formatted: { [key: string]: string } = {}
  
      for (const [key, value] of Object.entries(parsed)) {
        formatted[key] = `$${Number(value).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      }
  
      return formatted
    } catch (error) {
      console.error("Error parsing crypto data:", error)
      return {}
    }
  }
  
  