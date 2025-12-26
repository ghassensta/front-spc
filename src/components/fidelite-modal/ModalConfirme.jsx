import React from "react";
import { TranslatedText } from "../translated-text/translated-text";
import { useTranslation } from "react-i18next";

export default function ModalConfirme({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirmer", 
  cancelText = "Annuler" 
}) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {cancelText || <TranslatedText text="Annuler" />}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#b6b499] text-white hover:bg-[#b6b499]"
          >
            {confirmText || <TranslatedText text="Confirmer" />}
          </button>
        </div>
      </div>
    </div>
  );
}
