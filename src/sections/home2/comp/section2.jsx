import React from "react";
import { useGetHomePage } from "src/actions/homepage";
import { CONFIG } from "src/config-global";
import { useTranslation } from "src/context/translation-context";
import defaultBackground from "../../../assets/images/SPC-fond-beige-4.webp"; 

const Section3 = () => {
  const { sections } = useGetHomePage();
  const { translateSync } = useTranslation();

  const section = sections?.find((s) => s.key === "section3");
  if (!section) return null;
//console.log("section",section);

  const backgroundStyle = `url(${defaultBackground}) center/cover no-repeat`;
  return (
    <div
      className="w-screen relative left-[calc(-50vw+50%)] min-h-32 overflow-hidden"
      style={{
        background: backgroundStyle,
        backgroundColor: section?.extra_data?.background ? undefined : "#f5f5dc", 
      }}
    >
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-2 py-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-semibold">{translateSync(section.title)}</h2>

          {section.extra_data?.sousTitre && (
            <h2 className="text-[#B6B599] text-4xl font-semibold">
              {translateSync(section.extra_data.sousTitre)}
            </h2>
          )}

          <p className="mt-2 text-3xl mb-5">{translateSync(section.description)}</p>

          {section.sous_descriptions && (
            <p className="text-lg uppercase hidden md:block mb-5">
              {translateSync(section.sous_descriptions)}
            </p>
          )}

          {section.button_text && (
            <div className="w-full flex md:block">
              <a
                className="inline-flex font-tahoma rounded-lg items-center gap-2 uppercase font-normal tracking-widest transition-all duration-300 px-6 py-3 text-sm bg-black text-white mt-1 mb-2 mx-auto"
                href={section.button_url}
              >
                {translateSync(section.button_text)}
              </a>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          {section.image && (
            <img
              src={`${CONFIG.serverUrl}${section.image}`}
              alt={translateSync(section.title)}
              className="mb-4 max-h-96 w-full object-contain rounded-xl overflow-hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Section3;
