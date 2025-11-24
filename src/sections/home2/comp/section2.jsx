import React from "react";
import { useGetHomePage } from "src/actions/homepage";
import { CONFIG } from "src/config-global";

const Section3 = () => {
  const { sections } = useGetHomePage();

  const section = sections?.find((s) => s.key === "section3");
  if (!section) return null;
  return (
    <div
      className="w-screen relative left-[calc(-50vw+50%)] min-h-32 overflow-hidden"
      style={{ background: section.extra_data?.background || "white" }}
    >
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-2 py-8">
        {/* Texte */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-semibold">{section.title}</h2>

          {section.extra_data?.sousTitre && (
            <h2 className="text-[#B6B599] text-4xl font-semibold">
              {section.extra_data.sousTitre}
            </h2>
          )}

          <p className="mt-2 text-3xl mb-8">{section.description}</p>

          {section.extra_data?.longdescription && (
            <p className="text-lg font-tahoma uppercase hidden md:block">
              {section.extra_data.longdescription}
            </p>
          )}

          {section.button_text && (
            <a href={section.button_url}>
              <button className="inline-flex font-tahoma rounded-lg items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white mt-1 mb-2">
                {section.button_text}
              </button>
            </a>
          )}
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          {section.image && (
            <img
              src={`${CONFIG.serverUrl}${section.image}`}
              alt={section.title}
              className="mb-4 max-h-96 w-full object-contain rounded-xl overflow-hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Section3;
