import { useGetMyOrders } from "src/actions/orders";
import CommandesListView from "src/sections/dashboard/commandes/view/commandes-list-view";

export default function Page() {
  const { orders, loading, validating } = useGetMyOrders()
    return (
      <>
          <CommandesListView orders={orders} loading={loading} validating={validating}/>
      </>
    );
  }
  