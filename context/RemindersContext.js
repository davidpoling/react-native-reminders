import React, {useState} from 'react';

const RemindersContext = React.createContext([]);

export const RemindersConsumer = RemindersContext.Consumer;
export const RemindersProvider = function RemindersProvider(props) {
  const [reminders, setReminders] = useState([]);

  function updateReminders(newReminders) {
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
