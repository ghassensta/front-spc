import "./App.css";
import { Router } from "./router";
import "swiper/css";
import { CheckoutProvider } from "./sections/checkout/context/checkout-provider";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/context/jwt/auth-provider";
// import { AuthProvider } from "./auth/context/jwt/auth-provider";

function App() {
  useScrollToTop();

  return (
    <AuthProvider>
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
      </AuthProvider>
  );
}

export default App;
