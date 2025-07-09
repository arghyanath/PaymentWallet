

import { useBalanceStore } from "@repo/store/balanceStore";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";



export default async function Home() {
  const session = await getServerSession(authOptions)
  const balance = useBalanceStore.getState().balance
  return (
    <div>
      <div>{balance}</div>
      {JSON.stringify(session)}

    </div>
  );
}

