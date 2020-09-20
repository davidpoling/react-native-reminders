import React, {useState} from 'react';
import Reminder from '../beans/Reminder';

const RemindersContext = React.createContext<any>([]);

export const RemindersConsumer = RemindersContext.Consumer;

export const RemindersProvider = function RemindersProvider(props: any) {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  function updateReminders(newReminders: Reminder[]) {
    setReminders(newReminders);
  }

  return (
    <RemindersContext.Provider
      value={{
        reminders: reminders,
        updateReminders: updateReminders,
      }}>
      {props.children}
    </RemindersContext.Provider>
  );
};

export default RemindersContext;
