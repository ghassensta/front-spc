import "./App.css";
import { Router } from "./router";
import "swiper/css";
import { CheckoutProvider } from "./sections/checkout/context/checkout-provider";

function App() {
  return (
    <CheckoutProvider>
      <Router />
    </CheckoutProvider>
  );
}

export default App;
