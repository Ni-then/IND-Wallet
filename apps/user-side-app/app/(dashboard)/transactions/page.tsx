import SecurityCard from "../../../components/SecuityCard";
import Txns from "../../../components/Txns";
import { getDashboardData } from "../../lib/action/dashboard";
export default async function() {
    const data = await getDashboardData();
    return <div className="min-h-full flex flex-col px-5">
        <div className="mb-10">
        <Txns p2pTxns={data.p2pTransactions}
            onRampTxns={data.onRampTransactions} />

        </div>
            <SecurityCard/>
    </div>
}