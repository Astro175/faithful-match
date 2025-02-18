import React from 'react';
import { ProfileSkeleton } from "@/components/ui/ProfileSkeleton";
import { ClientProfileComponent } from '../client/ClientProfileComponent';

export function ServerProfileComponent() {
  return (
    <>
      {/* This skeleton will be rendered first on the server */}
      <div className="skeleton-container" id="profile-skeleton-container">
        <ProfileSkeleton />
      </div>
      
      {/* This client component will replace the skeleton when loaded */}
      <ClientProfileComponent />
    </>
  );
}