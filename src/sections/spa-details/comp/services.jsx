import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TabButton from "../../../components/tabs/tab-button";
import TabPanel from "../../../components/tabs/tab-panel";
import TemplateBienEtre from "./template-bien-etre";
import TemplateRestaurant from "./template-restaurant";
import ServicesTemplates from "./services-templates";
const tabs = [
  { label: "Bien-Être", content: <TemplateBienEtre /> },
  { label: "Hôtellerie", content: <TemplateRestaurant /> },
  { label: "Restauration", content: <TemplateRestaurant /> },
  { label: "Services et équipements", content: <ServicesTemplates /> },
  { label: "Séjour", content: <TemplateBienEtre /> },
];

export default function Tabs() {
  const [active, setActive] = useState(tabs[0]);

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
