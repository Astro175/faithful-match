// // components/inbox/ConversationList.tsx
// 'use client';
// import { useCollection } from 'react-firebase-hooks/firestore';
// import { ConversationItem } from './ConversationItem';
// import { getConversationsQuery } from '@/lib/firebase/conversations';
// import { useUser } from '@clerk/nextjs';

// export const ConversationList = () => {
//   const { user } = useUser();
//   const [snapshot] = useCollection(getConversationsQuery(user?.id));

//   return (
//     <div className="space-y-2">
//       {snapshot?.docs.map(doc => (
//         <ConversationItem 
//           key={doc.id}
//           conversation={{ id: doc.id, ...doc.data() }}
//           currentUserId={user?.id}
//         />
//       ))}
//     </div>
//   );
// };

import React from 'react'

export default function ConversationList() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
