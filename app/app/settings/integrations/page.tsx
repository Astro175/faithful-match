import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaFacebook,
  FaInstagram,
  FaPaypal,
  FaCcMastercard,
  FaCcVisa,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const ThirdPartyIntegration = () => {
  const socialAccounts = [
    {
      name: "Instagram",
      icon: <FaInstagram size={60} className="text-[#E4405F]" />,
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={60} className="text-[#1877F2]" />,
    },
  ];

  const paymentMethods = [
    {
      name: "PayPal",
      icon: <FaPaypal size={60} className="text-[#00457C]" />,
    },
    {
      name: "Google Pay",
      icon: <FaGooglePay size={60} className="text-[#4285F4]" />,
    },
    {
      name: "Apple Pay",
      icon: <FaApplePay size={60} className="text-black" />,
    },
    {
      name: "Mastercard",
      icon: <FaCcMastercard size={60} className="text-[#EB001B]" />,
    },
    {
      name: "Visa",
      icon: <FaCcVisa size={60} className="text-[#1434CB]" />,
    },
  ];
  type IntegrationItem = {
    name: string;
    icon: React.ReactNode;
  };

  const CardItem = ({ item }: { item: IntegrationItem }) => (
    <div className="flex items-center justify-between border border-[#212121] py-4 pl-5 pr-6 rounded-lg">
      <div className="flex items-center gap-4">
        {item.icon}
        <span className="font-outfit font-[700] text-[18px] text-[#212121]">
          {item.name}
        </span>
      </div>
      <span className="font-outfit font-[700] text-[18px] text-[#DD101E]">
        Connect
      </span>
    </div>
  );

  return (
    <div className="max-w-[380px] mx-auto p-6">
      <h1 className="text-center font-[700] text-[24px] text-[#212121] mb-8">
        Third Party Integration
      </h1>

      <Tabs defaultValue="linked-account" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger
            value="linked-account"
            className="data-[state=active]:bg-[#DD101E] data-[state=active]:text-white px-3 py-2 rounded-[6px] font-outfit font-[700]"
          >
            Linked Account
          </TabsTrigger>
          <TabsTrigger
            value="linked-payments"
            className="data-[state=active]:bg-[#DD101E] data-[state=active]:text-white px-3 py-2 rounded-[6px] font-outfit font-[700]"
          >
            Linked Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="linked-account" className="mt-0">
          <div className="space-y-4">
            {socialAccounts.map((account) => (
              <CardItem key={account.name} item={account} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="linked-payments" className="mt-0">
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <CardItem key={method.name} item={method} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThirdPartyIntegration;
