import { useState } from "react";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";

const Reminder = () => {
  const [reminders, setReminders] = useState([
    {
      title: "My special reminder",
      description: "If you forgot it, it aint important!",
      time: "22:00",
      completed: true,
    },
    {
      title: "My special late night reminder",
      description: "If you forgot it, it was not worth it!",
      time: "00:00",
      completed: false,
    },
    {
      title: "Sleep beesh",
      description: "She was not worth it!",
      time: "03:00",
      completed: false,
    },
  ]);

  const addData = (new_reminder) => {
    setReminders([...reminders, new_reminder]);
  };
  return (
    <section className='reminderWrapper'>
      <ReminderList list={reminders} />
      <ReminderForm addNewReminder={addData} />
    </section>
  );
};

export default Reminder;
