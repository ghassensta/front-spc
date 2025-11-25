// Updated aide-page-view.jsx (with added dependency to useEffect)
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { sendSupport, sendMessage, useGetMessage } from "src/actions/aide";

export default function AidePageView({
  messages, messagesError, messagesLoading, messagesValidating,
  services, servicesError, servicesLoading, servicesValidating,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [reply, setReply] = useState("");
  const { messages: convMessages, messagesError: convError, messagesLoading: convLoading, messagesValidating: convValidating } = useGetMessage(conversationId);
  const [localConversation, setLocalConversation] = useState([]);

  const [allDemandes, setAllDemandes] = useState(messages || []);
  const [form, setForm] = useState({
    service: "",
    title: "",
    description: "",
  });

  // Update allDemandes when messages prop changes
  useEffect(() => {
    setAllDemandes(messages || []);
  }, [messages]);

  // Update local conversation when fetched
  useEffect(() => {
    if (JSON.stringify(convMessages) !== JSON.stringify(localConversation)) {
      setLocalConversation(convMessages || []);
    }
  }, [convMessages, localConversation]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const promise = sendSupport(form);

    toast.promise(promise, {
      pending: "En Cours d'envoi..",
      success: "Envoi avec success",
      error: "Echec d'envoi",
    });

    try {
      await promise;
      setForm({ service: "", title: "", description: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoir = (demande) => {
    setConversationId(demande.id);
    setSelectedConversation(demande);
    setLocalConversation([]); // Reset until fetch
    setReply("");
    setOpenModal(true);
  };
  console.log(localConversation)


  const handleSend = async () => {
    if (!reply.trim()) return;

    const newMessage = {
      sender: "Client",
      text: reply,
      date: new Date().toLocaleString("fr-FR"),
      type: "client",
    };

    // Optimistic update
    setLocalConversation((prev) => [...prev, newMessage]);
    setReply("");

    // Send to API
    try {
      await sendMessage({
        id: selectedConversation.id,
        text: reply,
        type: "client",
        sender: "Client",
      });
    } catch (error) {
      console.error(error);
      setLocalConversation((prev) => prev.slice(0, -1));
    }
  };

  // Skeleton component
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact Form */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Contactez Spa Prestige Collection
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Envoyez une demande pour un service spécifique
        </p>

        {servicesError ? (
          <p className="text-[#b6b499] text-sm">Erreur lors du chargement des services. Veuillez réessayer plus tard.</p>
        ) : servicesLoading || servicesValidating ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : services.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun service disponible pour le moment.</p>
        ) : (
          <form onSubmit={submitForm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleFormChange}
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#b6b499]"
                required
              >
                <option value="">Selectionnez le service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} {/* Adjust if needed */}
                  </option>
                ))}
                <option value="others">Autres</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="Ex: Demande de rendez-vous"
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#b6b499]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Décrivez votre besoin ou question..."
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#b6b499]"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#b6b499] text-white px-5 py-2 rounded-lg hover:bg-[#b6b499] transition"
            >
              Envoyer
            </button>
          </form>
        )}
      </div>

      {/* Historique des demandes */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Historique des demandes
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Consultez vos précédentes requêtes
        </p>

        {messagesError ? (
          <p className="text-[#b6b499] text-sm">Erreur lors du chargement des demandes. Veuillez réessayer plus tard.</p>
        ) : messagesLoading || messagesValidating ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-3">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        ) : allDemandes.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune demande trouvée.</p>
        ) : (
          <div className="space-y-4">
            {allDemandes.map((d) => (
              <div
                key={d.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{d.title}</h3>
                  <p className="text-sm text-gray-500">Service: {d.service}</p>
                  <p className="text-xs text-gray-400">{d.date}</p>
                </div>
                <button
                  onClick={() => handleVoir(d)}
                  className="bg-[#b6b499] text-white text-sm px-3 py-1 rounded-lg hover:bg-[#b6b499] transition"
                >
                  Voir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {openModal && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Conversation - {selectedConversation.service}
              </h2>
              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              {convError ? (
                <p className="text-red-500 text-sm text-center">Erreur lors du chargement de la conversation. Veuillez réessayer.</p>
              ) : convLoading || convValidating ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))}
                </div>
              ) : localConversation.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">Aucun message dans cette conversation.</p>
              ) : (
                localConversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg shadow text-sm ${
                      msg.type === "client"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-[#b6b499] text-white"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-80">{msg.date}</p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t p-4 flex items-center space-x-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Écrire une réponse..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b6b499]"
              />
              <button
                onClick={handleSend}
                className="bg-[#b6b499] text-white px-4 py-2 rounded-lg hover:bg-[#b6b499] transition"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}