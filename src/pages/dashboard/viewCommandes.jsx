import { useParams } from "react-router-dom";
import { useGetOrder } from "src/actions/orders";
import CommandesViewPage from "src/sections/dashboard/commandes/view/commandes-view-page";

export default function Page() {
  const { id } = useParams();

  const { order } = useGetOrder(id)

  console.log(order)
    return (
      <>
          <CommandesViewPage order={order}/>
      </>
    );
  }
  