"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { redirect } from "next/dist/server/api-utils";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
},  {
    name: "Bandhan Bank",
    redirectUrl: "https://retail.bandhanbank.com/"
}, {
    name: "IDBI Bank",
    redirectUrl: "https://www.idbibank.in/idbi-bank-internet-banking.aspx"
}, {
    name: "Kotak Mahindra Bank",
    redirectUrl: "https://netbanking.kotak.com/knb2/"
}, {
    name: "State Bank of India",
    redirectUrl: "https://retail.onlinesbi.sbi/npersonal/"
}, {
    name: "Karur Vysya Bank",
    redirectUrl: "https://www.kvbin.com/B001/ENULogin.jsp"
}, {
    name: "Bank of Baroda",
    redirectUrl: "https://www.bankofbaroda.in/personal-banking/digital-products/instant-banking/bob-world-internet-banking"
}, {
    name: "Union Bank of India",
    redirectUrl: "https://www.unionbankonline.co.in/"
}, {
    name: "ICICI Bank",
    redirectUrl: "https://www.icicibank.com/personal-banking/insta-banking/internet-banking"
}, {
    name: "Indian Overseas Bank",
    redirectUrl: "https://www.iobnet.co.in/ibanking/html/index.html"
}, {
    name: "Punjab National Bank",
    redirectUrl: "https://netbanking.netpnb.com/corp/AuthenticationController%3FFORMSGROUP_ID__%3DAuthenticationFG%26__START_TRAN_FLAG__%3DY%26__FG_BUTTONS__%3DLOAD%26ACTION.LOAD%3DY%26AuthenticationFG.LOGIN_FLAG%3D1%26BANK_ID%3D024"
}, {
    name: "Karnataka Bank",
    redirectUrl: "https://moneyclick.ktkbank.com/BankAwayRetail/AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=AuthenticationFG&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=KBL&LANGUAGE_ID=001&USR_TYPE=1"
}, {
    name: "AU Small Finance Bank",
    redirectUrl: "https://netbanking.aubank.in/drb/"
}, {
    name: "Canara Bank",
    redirectUrl: "https://online.canarabank.in/?module=login"
}, {
    name: "Bank of India",
    redirectUrl: "https://starconnectcbs.bankofindia.com/BankAwayRetail/(S(32d1iqmq5vhgtzzab3mk1m3k))/web/L001/retail/jsp/user/RetailSignOn.aspx?RequestId=21932490"
}, {
    name: "IDFC First Bank",
    redirectUrl: "https://my.idfcfirstbank.com/login"
}, {
    name: "South Indian Bank",
    redirectUrl: "https://sibernet.southindianbank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=059"
}
];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")  // initialised with HDFC Bank
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
           setAmount(Number(value))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async() => {
                await createOnRampTransaction(provider, amount)
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}