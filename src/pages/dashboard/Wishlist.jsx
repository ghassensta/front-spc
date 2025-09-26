import { useGetWishlist } from "src/actions/wishlists";
import Wishlist from "src/sections/dashboard/Wishlist";

export default function Page() {
  const { wishlist } = useGetWishlist()

  console.log(wishlist)
    return (
      <>
          <Wishlist wishlist={wishlist}/>
      </>
    );
  }
  