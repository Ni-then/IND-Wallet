import RecentTransactions from "../../../components/RecentTransactions";
import { getDashboardData } from "../../lib/action/dashboard";
export default async function() {
    const data = await getDashboardData();
    return <div>
        <RecentTransactions p2pTransactions={data.p2pTransactions}
            onRampTransactions={data.onRampTransactions} />
    </div>
}