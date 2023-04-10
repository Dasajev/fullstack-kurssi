const Notification = ({ messageData }) => {  
  if (!messageData) {
    return null;
  }

  const {message, className } = messageData;

  return <div className={className}>{message}</div>;
};

export default Notification;
