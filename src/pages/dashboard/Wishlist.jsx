import { useGetWishlist } from "src/actions/wishlists";
import Wishlist from "src/sections/dashboard/Wishlist";

export default function Page() {
  const { wishlist, loading, validating } = useGetWishlist()

    return (
      <>
          <Wishlist wishlists={wishlist} loading={loading} validating={validating}/>
      </>
    );
  }
  