// Updated aide.jsx
import { useGetMessages, useGetServices, useGetMessage } from "src/actions/aide"; // Import useGetMessage
import AidePageView from "src/sections/dashboard/aide/aide-page-view";

export default function Page() {
  const { services, servicesError, servicesLoading, servicesValidating } = useGetServices();
  const { messages, messagesError, messagesLoading, messagesValidating } = useGetMessages();

  return (
    <AidePageView
      messages={messages}
      messagesError={messagesError}
      messagesLoading={messagesLoading}
      messagesValidating={messagesValidating}
      services={services}
      servicesError={servicesError}
      servicesLoading={servicesLoading}
      servicesValidating={servicesValidating}
    />
  );
}