import { createPublicClient, http } from 'viem'
import './App.css'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

function App() {

  async function getBalance() {
    const res = await client.getBalance({address: "0x7D5f294529F53a7aF4e71EBbec9ccF1f1052D1a6"})
    console.log(res)
  }

  return (
    <div>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  )

}



export default App
