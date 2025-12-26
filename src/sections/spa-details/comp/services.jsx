import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TabButton from "../../../components/tabs/tab-button";
import TabPanel from "../../../components/tabs/tab-panel";
import TemplateRestaurant from "./template-restaurant";
import ServicesTemplates from "./services-templates";

export default function Tabs({ data = [] }) {
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // ✅ TRI PAR ORDRE (champ correct)
    const sortedData = [...data].sort((a, b) => a.ordre - b.ordre);

    const dynamicTabs = sortedData.map((type) => {
      let content;

      switch (type.type_soin?.name) {
        case "Bien-être":
          content = <ServicesTemplates data={type} />;
          break;

        case "Hôtellerie":
        case "Restauration":
        case "Séjour":
          content = <TemplateRestaurant data={type} />;
          break;

        case "Services et équipements":
          content = <ServicesTemplates data={type} />;
          break;

        default:
          content = <p>Aucun template disponible</p>;
      }

      return {
        id: type.id,
        label: type.type_soin?.name,
        ordre: type.ordre,
        visible: true,
        content,
      };
    });

    setTabs(dynamicTabs);
    setActive(dynamicTabs[0]); // premier par ordre
  }, [data]);

  if (!active) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-10" id="etab-services">
      {}
      <div className="relative flex flex-wrap justify-center items-center gap-1 text-sm md:text-base overflow-x-auto pb-2">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <TabButton
              label={tab.label}
              active={active.id === tab.id}
              onClick={() => setActive(tab)}
            />
            {index < tabs.length - 1 && (
              <span className="text-secondary text-xl md:text-2xl font-medium mx-1">
                /
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <TabPanel content={active.content} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
