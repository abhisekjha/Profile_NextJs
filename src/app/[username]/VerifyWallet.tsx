'use client';
import { Button } from "@/components/ui/button";
import {
    useAccount,
    UseAccountParameters,
    UseAccountReturnType,
    useConnections,
    UseSignMessageParameters,
    UseSignMessageReturnType
} from "wagmi";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {startAccountVerification, verifySignature} from "@/lib/web3/verifyWallet/verifyWallet";
import {useState} from "react";
import { Loader2 } from "lucide-react";
import { useSignMessage } from 'wagmi';
import {ConnectKitButton} from "connectkit";
import {signMessage} from "@wagmi/core";


export default function VerifyWallet() {
    const [isLoading, setIsLoading] = useState(false);
    const {status, address} = useAccount(); //Use the connected web3 wallet account
    const {signMessageAsync} = useSignMessage();

    async function handleClick() {
        if (isLoading) {
            setIsLoading(false);
            return;
        }

        const challenge: string = await startAccountVerification(address as string);
        setIsLoading(true);

        const sig = await signMessageAsync({ message: challenge });
        const isValid: boolean = await verifySignature(sig);

    }

    return (
      <>
          <Dialog>
              <DialogTrigger asChild>
                  <Button variant="outline">Add Web3 account</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>Verify your Web3 account</DialogTitle>
                      <DialogDescription>
                          Provide signature to verify ownership
                      </DialogDescription>
                  </DialogHeader>
                  <div className="w-full">
                      <ConnectKitButton />
                  </div>
                  {status === 'connected' ? (
                      <>
                          <Button onClick={() => handleClick()}>
                              {isLoading ? (
                                  <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                      Awaiting signature, check your wallet
                                  </>
                              ): (
                                'Start Verification'
                              )}
                          </Button>
                      </>
                  ): (
                      <>
                          <p>Connect a wallet to continue</p>
                      </>
                  )}

                  <DialogFooter>
                      <DialogClose asChild>
                          <Button
                            onClick={() => setIsLoading(false)}
                          >Back</Button>
                      </DialogClose>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
      </>
    );
}