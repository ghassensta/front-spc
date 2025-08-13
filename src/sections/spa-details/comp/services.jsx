import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TabButton from "../../../components/tabs/tab-button";
import TabPanel from "../../../components/tabs/tab-panel";
import TemplateBienEtre from "./template-bien-etre";
import TemplateRestaurant from "./template-restaurant";
import ServicesTemplates from "./services-templates";

export default function Tabs({ data = [] }) {
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      // Crée les tabs dynamiquement à partir des type_soin
      const dynamicTabs = data.map((type) => {
        let content;

        switch (type.type_soin.name) {
          case "Bien-être":
            content = <TemplateBienEtre data={type} />;
            break;
          case "Hôtellerie":
            content = <TemplateRestaurant data={type} />;
            break;
          case "Restauration":
            content = <TemplateRestaurant data={type} />;
            break;
          case "Services et équipements":
            content = <ServicesTemplates data={type} />;
            break;
          case "Séjour":
            content = <TemplateBienEtre data={type} />;
            break;
          default:
            content = <div>Aucun template disponible</div>;
        }

        return {
          id: type.type_soin.id,
          label: type.type_soin.name,
          content,
        };
      });

      setTabs(dynamicTabs);
      setActive(dynamicTabs[0]); // Active par défaut le premier
    }
  }, [data]);

  if (!active) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      {/* Tab Buttons */}
      <div className="relative flex flex-wrap justify-between items-center space-x-1 max-w-[75%] mx-auto">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.label}>
            <TabButton
              label={tab.label}
              active={active.label === tab.label}
              onClick={() => setActive(tab)}
            />
            {index < tabs.length - 1 && (
              <span className="text-gray-400 font-medium">/</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.label}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="p-6 mt-4"
        >
          <TabPanel content={active.content} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
