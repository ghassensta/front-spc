import React, { useState } from "react";

export default function AidePageView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [reply, setReply] = useState("");

  const demandes = [
    {
      id: 1,
      title: "Demande de soin visage",
      service: "Noélie",
      date: "02/07/2025",
      conversation: [
        {
          sender: "Client",
          text: "Je souhaite prendre un rendez-vous pour un soin visage hydratant.",
          date: "02/07/2025 - 09:43",
          type: "client",
        },
        {
          sender: "SPC",
          text: "Bonjour, nous avons des disponibilités mercredi à 15h ou jeudi à 10h. Quel créneau préférez-vous ?",
          date: "02/07/2025 - 10:15",
          type: "spc",
        },
      ],
    },
    {
      id: 2,
      title: "Hammam + Massage",
      service: "Romain",
      date: "30/06/2025",
      conversation: [],
    },
  ];

  const [allDemandes, setAllDemandes] = useState(demandes);

  const handleVoir = (demande) => {
    setSelectedConversation(demande);
    setReply("");
    setOpenModal(true);
  };

  const handleSend = () => {
    if (!reply.trim()) return;

    const newMessage = {
      sender: "SPC",
      text: reply,
      date: new Date().toLocaleString("fr-FR"),
      type: "spc",
    };

    const updatedDemandes = allDemandes.map((d) =>
      d.id === selectedConversation.id
        ? { ...d, conversation: [...d.conversation, newMessage] }
        : d
    );

    setAllDemandes(updatedDemandes);
    setSelectedConversation(
      updatedDemandes.find((d) => d.id === selectedConversation.id)
    );
    setReply("");
  };

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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300">
              <option value="">Selectionnez le service</option>
              <option value="soin-visage">Soin visage</option>
              <option value="massage">Massage</option>
              <option value="hammam">Hammam</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              placeholder="Ex: Demande de rendez-vous"
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Décrivez votre besoin ou question..."
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          <button className="bg-orange-300 text-white px-5 py-2 rounded-lg hover:bg-orange-400 transition">
            Envoyer
          </button>
        </div>
      </div>

      {/* Historique des demandes */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Historique des demandes
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Consultez vos précédentes requêtes
        </p>

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
                className="bg-orange-300 text-white text-sm px-3 py-1 rounded-lg hover:bg-orange-400 transition"
              >
                Voir
              </button>
            </div>
          ))}
        </div>
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
              {selectedConversation.conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg shadow text-sm ${
                    msg.type === "client"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-orange-300 text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 opacity-80">{msg.date}</p>
                </div>
              ))}
            </div>

            <div className="border-t p-4 flex items-center space-x-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Écrire une réponse..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                onClick={handleSend}
                className="bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-400 transition"
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
