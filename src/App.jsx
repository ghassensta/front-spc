import "./App.css";
import { Router } from "./router";
import "swiper/css";
import { CheckoutProvider } from "./sections/checkout/context/checkout-provider";
import { useScrollToTop } from "./hooks/use-scroll-to-top";

function App() {
  useScrollToTop(); 

  return (
    <CheckoutProvider>
      <Router />
    </CheckoutProvider>
  );
}

export default App;
