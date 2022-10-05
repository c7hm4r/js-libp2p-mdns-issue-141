import { MulticastDNS } from "@libp2p/mdns";
import { WebSockets } from "@libp2p/websockets";
import { createLibp2p } from "libp2p";
import { Noise } from "@chainsafe/libp2p-noise";

async function main() {
  const mdns = new MulticastDNS({
    broadcast: true,
  });
  const webSockets = new WebSockets();
  const noise = new Noise();
  const node = await createLibp2p({
    addresses: {
      listen: [`/ip4/127.0.0.1/tcp/0/ws`],
    },
    transports: [webSockets],
    connectionEncryption: [noise],
    peerDiscovery: [mdns],
    connectionManager: { autoDial: false }
  });

  mdns.addEventListener("peer", (peerData) => {
    console.log("mdns: ", peerData.detail);
  });

  node.addEventListener("peer:discovery", (peer) => {
    console.log("Discovered peer", peer.detail.id);
  });

  await node.start();
  console.log("libp2p started");

  const listenAddrs = node.getMultiaddrs();
  console.log("libp2p listening on",listenAddrs);  
}

main().catch(console.error);
