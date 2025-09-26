import { useGetParrainage } from "src/actions/parrainage";
import ParrainagePageView from "src/sections/dashboard/parrainage/parrainage-page-view";

export default function Page() {
  const { filleuls, total_filleuls } = useGetParrainage()

    return (
      <>
         <ParrainagePageView filleuls={filleuls} total_filleuls={total_filleuls}/>
      </>
    );
  }
  