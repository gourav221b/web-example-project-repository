import { useState } from "react";

const ReminderForm = (props) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    time: "",
    completed: false,
  });
  const setReminder = () => {
    props.addNewReminder(data);
  };

  return (
    <section className='reminderFormWrapper'>
      <form className='reminderForm' onSubmit={(e) => e.preventDefault()}>
        <div className='form-input-wrapper'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Enter title here'
            className='reminderInput'
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
          />
        </div>
        <div className='form-input-wrapper'>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            placeholder='Enter description here'
            className='reminderInput'
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
            }}
          />
        </div>
        <div className='form-input-wrapper'>
          <label htmlFor='time'>Time</label>
          <input
            type='time'
            placeholder='Enter time here'
            className='reminderInput'
            onChange={(e) => {
              setData({ ...data, time: e.target.value });
            }}
          />
        </div>
        <button className='btn btn-form' onClick={setReminder}>
          Set reminder
        </button>
      </form>
    </section>
  );
};

export default ReminderForm;
