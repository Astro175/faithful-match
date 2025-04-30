// 4. Typing Indicator - hooks/useTypingIndicator.ts
import { debounce } from 'lodash';
import { db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export function useTypingIndicator(conversationId: string, userId: string) {
  const updateTypingStatus = debounce(async (isTyping: boolean) => {
    await setDoc(doc(db, 'typingStatus', userId), {
      conversationId,
      isTyping,
      lastUpdated: new Date()
    });
  }, 500);

  const handleInputChange = (text: string) => {
    updateTypingStatus(text.length > 0);
    if (text.length === 0) updateTypingStatus.cancel();
  };

  return { handleInputChange };
}