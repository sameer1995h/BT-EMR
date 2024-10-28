import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function TabPanel({ tabs, activeTab, setActiveTab, children }) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full justify-start">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeTab}>
        {children}
      </TabsContent>
    </Tabs>
  )
}

export default TabPanel
