import { useEffect, useState } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
} from "wagmi";

export default function Home() {
  const { address, connector, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [connectors, setConnectors] = useState<Connector<any, any, any>[]>([]);
  const {
    connect,
    connectors: wallets,
    error,
    isLoading,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (wallets) {
      setConnectors(wallets);
    }
  }, [wallets]);

  if (isConnected && connectors.length) {
    return (
      <div>
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector?.name}</div>
        <button
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((conn, idx) => {
        return (
          <button
            type="button"
            disabled={!conn.ready}
            key={conn.id}
            onClick={() => connect({ connector })}
          >
            <span>{conn.name}</span>

            {!conn.ready && <span> (unsupported)</span>}
            {isLoading && conn.id === pendingConnector?.id && " (connecting)"}
          </button>
        );
      })}

      {error && <div>{error.message}</div>}
    </div>
  );
}
