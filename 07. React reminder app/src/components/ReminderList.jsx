const ReminderList = ({ list }) => {
  return (
    <section className='reminderListWrapper'>
      {list.map((item) => (
        <div className='reminderCard' key={item.title}>
          <div className='content'>
            <span className='remindTime'>Remind at: {item.time}</span>
            <p className='remindTitle'>{item.title}</p>
            <p className='remindDesc'>{item.description}</p>
          </div>
          <button className='btn btn-card'>Complete</button>
        </div>
      ))}
    </section>
  );
};

export default ReminderList;
