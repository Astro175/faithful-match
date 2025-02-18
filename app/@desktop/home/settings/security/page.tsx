"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AccountSecurity() {
  const { user } = useClerk();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
  });

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await user?.delete();
      await axios.delete("/api/user/delete-account");
      window.location.href = "/";
    } catch (err) {
      setError("Error deleting account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <h1 className="text-2xl font-outfit font-bold text-foreground text-center mb-8">
        Account & Security
      </h1>

      <div className="max-w-[380px] mx-auto space-y-10">
        <div className="space-y-10">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-foreground">
              Two-Factor Authentication
            </span>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) =>
                setSecuritySettings({
                  ...securitySettings,
                  twoFactorAuth: checked,
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-foreground">
              Biometric Login
            </span>
            <Switch
              checked={securitySettings.biometricLogin}
              onCheckedChange={(checked) =>
                setSecuritySettings({
                  ...securitySettings,
                  biometricLogin: checked,
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <div
          className="flex justify-between items-center cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors"
          onClick={() => setShowChangePasswordDialog(true)}
        >
          <span className="text-lg font-semibold text-foreground font-outfit">
            Change Password
          </span>
          <FiChevronRight className="text-muted-foreground" size={20} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors">
            <span className="text-lg font-semibold text-foreground">
              Deactivate Account
            </span>
            <FiChevronRight className="ml-2 text-muted-foreground" size={18} />
          </div>
          <p className="text-base text-muted-foreground">
            Temporarily hide your profile. Easily reactivate when you're ready.
          </p>
        </div>

        <div className="space-y-2">
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-muted rounded-lg p-2 transition-colors"
            onClick={() => setShowDeleteDialog(true)}
          >
            <span className="text-lg font-semibold text-destructive">
              Delete Account
            </span>
            <FiChevronRight className="ml-2 text-destructive" size={18} />
          </div>
          <p className="text-base text-muted-foreground">
            Permanently remove your profile and data from Faithful Match.
            Proceed with caution.
          </p>
        </div>

        {/* Dialogs */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Confirm Account Deletion
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <p className="text-destructive font-medium">
                Warning: This action is irreversible! All your data will be
                permanently deleted.
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Confirm Deletion"}
                </Button>
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showChangePasswordDialog}
          onOpenChange={setShowChangePasswordDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Change Password
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We'll send a verification code to your email to change your
                password.
              </p>
              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = "/change-password";
                }}
              >
                Continue with OTP Verification
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
