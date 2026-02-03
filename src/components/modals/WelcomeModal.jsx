import { useEffect, useState, useRef } from "react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(400);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("visited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!iframeRef.current) return;
      if (event.origin.includes("mailjet.com")) {
        if (event.data?.height) {
          setIframeHeight(event.data.height);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const closeModal = () => setIsOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center
                     z-[9999] p-2 sm:p-4"
          style={{ animation: "fadeIn 0.3s" }}
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white rounded-xl shadow-xl relative
                       w-full max-w-[95vw] sm:max-w-4xl
                       max-h-[90vh] overflow-hidden"
            style={{ animation: "slideIn 0.3s" }}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 sm:top-3 sm:right-4
                         text-gray-500 hover:text-gray-800
                         text-2xl sm:text-3xl font-bold z-20"
            >
              &times;
            </button>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl sm:text-3xl font-bold mb-3 text-center">
                Bienvenue sur notre site !
              </h2>

              <p className="mb-5 text-sm sm:text-base text-center">
                Inscrivez-vous à notre newsletter pour recevoir nos nouveautés.
              </p>

              <div className="w-full overflow-hidden">
                <iframe
                  ref={iframeRef}
                  frameBorder="0"
                  scrolling="no"
                  src="https://srm3t.mjt.lu/wgt/srm3t/0vo7/form?c=3781e457"
                  width="100%"
                  style={{
                    height: iframeHeight,
                    minHeight: "320px",
                    transition: "height 0.3s",
                  }}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
