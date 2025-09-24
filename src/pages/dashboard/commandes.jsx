import { useGetMyOrders } from "src/actions/orders";
import CommandesListView from "src/sections/dashboard/commandes/view/commandes-list-view";

export default function Page() {
  const { orders } = useGetMyOrders()
    return (
      <>
          <CommandesListView orders={orders}/>
      </>
    );
  }
  