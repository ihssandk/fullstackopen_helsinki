import React  from 'react'
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={message.includes("Information")?'error': 'alert' }>
        {message}
      </div>
    )
  }

  export default Notification