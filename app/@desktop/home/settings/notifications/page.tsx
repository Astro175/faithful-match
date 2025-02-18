import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  const pushNotificationItems = [
    "New matches",
    "New messages",
    "Likes & Super Likes",
    "Profile visitors",
    "Events and activities",
    "Matches Activity",
    "Safety & Accounts Alerts",
    "Promotions & News",
    "In-App Recommendations",
    "Weekly Activity Summary",
    "Connection Requests",
    "Survey & Feedback Requests",
    "Special offers",
  ];

  const emailNotificationItems = [
    "New matches",
    "New messages",
    "Likes & Super Likes",
    "Profile visitors",
    "Events and activities",
    "Weekly Activity Summary",
    "Connection Requests",
    "Promotions & News",
  ];

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <h1 className="text-[24px] font-[700] text-[#212121] mb-8">
        Notifications
      </h1>

      <div className="max-w-[380px]">
        <Tabs defaultValue="push" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger
              value="push"
              className="data-[state=active]:bg-[#DD101E] data-[state=active]:text-white px-3 py-2 rounded-[6px] font-outfit font-[700]"
            >
              Push Notifications
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-[#DD101E] data-[state=active]:text-white px-3 py-2 rounded-[6px] font-outfit font-[700]"
            >
              Email Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="push">
            <div className="space-y-7 mt-6">
              {pushNotificationItems.map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <span className="text-[16px] font-[600] text-[#212121]">
                    {item}
                  </span>
                  <Switch className="data-[state=checked]:bg-[#DD101E] data-[state=unchecked]:bg-gray-200" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="email">
            <div className="space-y-7 mt-6">
              {emailNotificationItems.map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <span className="text-[16px] font-[600] text-[#212121]">
                    {item}
                  </span>
                  <Switch className="data-[state=checked]:bg-[#DD101E] data-[state=unchecked]:bg-gray-200" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
