"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";

import GetStartWithIndWallet from "../components/Get-start-with-IND-Wallet";

export default function Page() {
  const session = useSession();
  return (
    <div className="">
      {/* <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} /> */}
      <GetStartWithIndWallet/>
    </div>
  );
}
