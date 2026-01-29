import { createConfig, http, injected, useAccount, useBalance, useConnect, useConnectors, useSendTransaction, useTransaction, WagmiProvider } from 'wagmi'
import './App.css'
import { base, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected()
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http()
  }
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  )

}

function EthSend() {
  const {data: hash, sendTransaction} = useTransaction()

  function sendEth() {
    sendTransaction({
      to: document.getElementById('address').value,
      value: 100000000000000000 // 17 0s = 0.1 ETH
    })
  }

  return <div>
    <input id='address' type="text" placeholder='address...' />
    <button onClick={() => sendEth()}>send 0.1 ETH</button>
  </div>
}

function MyAddress() {
  const { address } = useAccount()
  const balance = useBalance({ address })

  return <div> 
    {address} <br />
    {balance?.data?.formatted}
  </div>
}

function WalletConnector() {
  const { connectors, connect} = useConnect()
  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

// function ETHSend() {
//   return <div>
//     <input type="text" placeholder='Address...' />
//     <button>Send 0.1 ETH</button>
//   </div>
// }



export default App
