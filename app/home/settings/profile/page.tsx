"use client";
import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProfilePage = () => {
  const [currentView, setCurrentView] = useState("main");
  const [isPrivate, setIsPrivate] = useState(false);
  const [username, setUsername] = useState("john_doe");
  const [isUsernameEdited, setIsUsernameEdited] = useState(false);
  const [visibility, setVisibility] = useState("everyone");
  const [switches, setSwitches] = useState({
    showActive: false,
    showRecent: false,
    receiveDMs: true,
    readReceipts: true,
  });

  const handleSwitchChange = (key) => {
    setSwitches((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const SectionHeader = ({ title, onBack }) => (
    <div className="flex items-center mb-6">
      <FaArrowLeftLong className="cursor-pointer" onClick={onBack} />
      <h2 className="ml-10 font-outfit font-bold text-2xl text-foreground">
        {title}
      </h2>
    </div>
  );

  const SaveButton = ({ onClick }) => (
    <button
      className="bg-[#DD101E] text-white px-6 py-3 rounded-lg font-outfit font-semibold mt-4"
      onClick={onClick}
    >
      Save Changes
    </button>
  );

  const UsernameContent = () => (
    <div className="animate-in slide-in-from-right w-[680px] p-6">
      <SectionHeader title="Username" onBack={() => setCurrentView("main")} />

      <label className="block font-outfit font-bold text-lg mb-2">
        Change Username
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setIsUsernameEdited(true);
        }}
        className="w-full bg-[#FAFAFA] py-[18px] px-5 font-outfit font-semibold text-[#212121] rounded-lg"
      />

      <p className="text-[#616161] text-base font-normal mt-4">
        You can only change your username once every month.
      </p>

      {isUsernameEdited && (
        <SaveButton onClick={() => setIsUsernameEdited(false)} />
      )}
    </div>
  );

  const VisibilityContent = () => (
    <div className="animate-in slide-in-from-right w-[680px] p-6">
      <SectionHeader title="Visibility" onBack={() => setCurrentView("main")} />

      <p className="font-outfit font-semibold mb-4">
        Choose who can see your profile:
      </p>

      <RadioGroup
        value={visibility}
        onValueChange={setVisibility}
        className="space-y-4"
      >
        {["everyone", "matches", "nobody"].map((value) => (
          <div key={value} className="flex items-center space-x-4">
            <RadioGroupItem
              value={value}
              id={value}
              className="border-2 data-[state=checked]:bg-[#DD101E] data-[state=checked]:border-[#DD101E]"
            />
            <label htmlFor={value} className="font-outfit font-medium">
              {value === "everyone"
                ? "Everyone"
                : value === "matches"
                ? "Only Matches"
                : "Nobody"}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const BlockedUsersContent = () => (
    <div className="animate-in slide-in-from-right w-[680px] p-6">
      <SectionHeader
        title="Blocked Users"
        onBack={() => setCurrentView("main")}
      />
      <p className="text-gray-600 mt-4">You haven't blocked any users yet.</p>
    </div>
  );

  const ActiveStatusContent = () => (
    <div className="animate-in slide-in-from-right w-[680px] p-6">
      <SectionHeader
        title="Manage Active Status"
        onBack={() => setCurrentView("main")}
      />

      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-outfit font-semibold">
              Show Active Status
            </span>
            <Switch
              checked={switches.showActive}
              onCheckedChange={() => handleSwitchChange("showActive")}
              className="data-[state=checked]:bg-[#DD101E]"
            />
          </div>
          <p className="text-gray-600">
            If you are active on Faithful Match, your status will be displayed
            to other people.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-outfit font-semibold">
              Show Recently Active Status
            </span>
            <Switch
              checked={switches.showRecent}
              onCheckedChange={() => handleSwitchChange("showRecent")}
              className="data-[state=checked]:bg-[#DD101E]"
            />
          </div>
          <p className="text-gray-600">
            Recently active status will be displayed if you have been active on
            in the last 24 hours.
          </p>
        </div>
      </div>

      <SaveButton onClick={() => {}} />
    </div>
  );

  const ManageMessagesContent = () => (
    <div className="animate-in slide-in-from-right w-[680px] p-6">
      <SectionHeader
        title="Manage Messages"
        onBack={() => setCurrentView("main")}
      />

      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-outfit font-semibold">
              Receive Direct Messages
            </span>
            <Switch
              checked={switches.receiveDMs}
              onCheckedChange={() => handleSwitchChange("receiveDMs")}
              className="data-[state=checked]:bg-[#DD101E]"
            />
          </div>
          <p className="text-gray-600">
            If this is turned off, your matches will have to send a connection
            request to you in order to connect in the message.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-outfit font-semibold">Read Receipts</span>
            <Switch
              checked={switches.readReceipts}
              onCheckedChange={() => handleSwitchChange("readReceipts")}
              className="data-[state=checked]:bg-[#DD101E]"
            />
          </div>
          <p className="text-gray-600">
            If turned off, you won&apos;t send or receive read receipts.
          </p>
        </div>
      </div>

      <SaveButton onClick={() => {}} />
    </div>
  );

  const getContent = () => {
    switch (currentView) {
      case "username":
        return <UsernameContent />;
      case "visibility":
        return <VisibilityContent />;
      case "blocked":
        return <BlockedUsersContent />;
      case "status":
        return <ActiveStatusContent />;
      case "messages":
        return <ManageMessagesContent />;
      default:
        return <MainView />;
    }
  };

  const SectionTitle = ({ text }) => (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-outfit text-sm font-semibold text-[#9E9E9E]">
        {text}
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );

  const NavigationRow = ({ text, onClick }) => (
    <div
      className="flex justify-between items-center cursor-pointer py-2"
      onClick={onClick}
    >
      <span className="font-outfit font-semibold">{text}</span>
      <FiChevronRight size={20} />
    </div>
  );

  const MainView = () => (
    <div className="animate-in slide-in-from-right">
      <div className="w-[680px] pt-3 px-6">
        {/* Profile Section */}
        <section className="mb-8">
          <SectionTitle text="Your Public Profile" />

          <NavigationRow
            text="Username"
            onClick={() => setCurrentView("username")}
          />

          <NavigationRow
            text="Share My Profile"
            onClick={() => setCurrentView("share")}
          />
        </section>

        {/* Privacy Section */}
        <section className="mb-8">
          <SectionTitle text="Privacy & Visibility" />

          <div className="space-y-6">
            <div className="space-y-2">
              <NavigationRow
                text="Visibility"
                onClick={() => setCurrentView("visibility")}
              />
              <p className="text-gray-600">Choose who can see your profile.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-outfit font-semibold">Privacy Mode</span>
                <Switch
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                  className="data-[state=checked]:bg-[#DD101E]"
                />
              </div>
              <p className="text-gray-600">
                Enable or disable private mode for incognito browsing.
              </p>
            </div>

            <div className="space-y-2">
              <NavigationRow
                text="Profile Verification"
                onClick={() => setCurrentView("verification")}
              />
              <p className="text-gray-600">
                Verify your profile to gain more trust.
              </p>
            </div>

            <div className="space-y-2">
              <NavigationRow
                text="Blocked Users (0)"
                onClick={() => setCurrentView("blocked")}
              />
              <p className="text-gray-600">
                The people you blocked are displayed here.
              </p>
            </div>
          </div>
        </section>

        {/* Messages Section */}
        <section>
          <SectionTitle text="Messages and Active Status" />

          <div className="space-y-4">
            <NavigationRow
              text="Manage Active Status"
              onClick={() => setCurrentView("status")}
            />

            <NavigationRow
              text="Manage Messages"
              onClick={() => setCurrentView("messages")}
            />
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-outfit font-bold text-foreground w-[700px] mb-6">
        Profile & Privacy
      </h1>
      {getContent()}
    </div>
  );
};

export default ProfilePage;
