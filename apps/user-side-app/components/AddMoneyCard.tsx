"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/action/createOnRampTransaction";
import { paiseToRupees, rupeesToPaise } from "../app/lib/Txns_numbers";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: `${process.env.NEXT_PUBLIC_HDFC_BANK_URL}/login`
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount,setAmount] = useState(0)//100 INR here is the problem 
    // i need to convert this into paise
    console.log("add mney",amount)
    
    const [provider,setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val)=>{
            setAmount(Number(val))
        }}/>
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x=>x.name ===value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
                <Button
                    onClick={async () => {
                        if (!amount || Number(amount) <= 0) {
                            alert("Please enter a valid amount");
                            return;
                        }

                        const result = await createOnRampTransaction(
                            rupeesToPaise(amount),
                            provider
                        );
                        console.log("Result:", result);

                        if (!result.token) {
                            alert(result.message);
                            return;
                        }
                            // direct INR meh 
                        window.location.href =
                            `${redirectUrl}?token=${encodeURIComponent(result.token)}&amount=${encodeURIComponent(rupeesToPaise(amount))}`;
                            // 100 INR (no) 1000 PAISE (yes)
                    }}
                >
                    Add Money
                </Button>
        </div>
    </div>
</Card>
}