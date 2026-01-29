import { createPublicClient, http } from 'viem'
import './App.css'
import { mainnet } from 'viem/chains'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


async function getBalanc() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  })
  const res = await client.getBalance({ address: "0x7D5f294529F53a7aF4e71EBbec9ccF1f1052D1a6" })

  return res.toString();
}

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )

}

function Todos() {
  const query = useQuery({ queryKey: ['res'], queryFn: getBalanc, refetchInterval: 10 * 1000 })

  return <div>
    Balance: {query.data}
  </div>
}



export default App
