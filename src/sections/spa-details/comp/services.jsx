import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TabButton from "../../../components/tabs/tab-button";
import TabPanel from "../../../components/tabs/tab-panel";
import TemplateRestaurant from "./template-restaurant";
import ServicesTemplates from "./services-templates";

export default function Tabs({ data = [] }) {
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);

  console.log("TYPES",data);
  useEffect(() => {
  if (data.length > 0) {
    // Sort data by order before creating tabs
    const sortedData = [...data].sort((a, b) => a.order - b.order);
    
    // Crée les tabs dynamiquement à partir des type_soin
    const dynamicTabs = sortedData.map((type) => {
      let content;

      switch (type.type_soin.name) {
        case "Bien-être":
          content = <ServicesTemplates data={type} />;
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
          content = <TemplateRestaurant data={type} />;
          break;
        default:
          content = <p>Aucun template disponible</p>;
      }

      return {
        id: type.type_soin.id,
        label: type.type_soin.name,
        visible: !!type.title && !!type.description,
        content,
      };
    });

    setTabs(dynamicTabs);
    setActive(dynamicTabs[0]); // Active par défaut le premier
  }
}, [data]);

  if (!active) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-10" id="etab-services">
      {/* Tab Buttons */}
      <div className="relative flex flex-wrap justify-center items-center space-x-1 max-w-[100%] text-sm md:text-base overflow-x-auto pb-2">
        {tabs.filter((tab) => tab.visible).map((tab, index) => (
          <React.Fragment key={tab.label}>
            <TabButton
              label={tab.label}
              active={active.label === tab.label}
              onClick={() => setActive(tab)}
            />
            {index < tabs.filter((tab) => tab.visible).length - 1 && (
              <span className={`text-secondary text-xl md:text-2xl font-medium ${window.innerWidth >= 768 ? 'mx-1' : 'inline'}`}>/</span>
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
          className="mt-4"
        >
          <TabPanel content={active.content} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}