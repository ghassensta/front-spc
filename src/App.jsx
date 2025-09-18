import "./App.css";
import { Router } from "./router";
import "swiper/css";
import { CheckoutProvider } from "./sections/checkout/context/checkout-provider";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { ToastContainer } from "react-toastify";

function App() {
  useScrollToTop();

  return (
    <CheckoutProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <Router />
    </CheckoutProvider>
  );
}

export default App;
