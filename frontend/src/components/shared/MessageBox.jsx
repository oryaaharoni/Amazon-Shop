import { PropTypes, Alert } from '../../import.js';

// children- עוטף את המסג בוקס במידה ויש עוד אלמנטים על הקומפוננטה של מסג
// בוקס זה עוטף אותם גם ומרנדר אותם

const MessageBox = ({variant, children}) => {
  return (
    <Alert variant={variant || "info"}> {children}</Alert>
  )
}

MessageBox.propTypes ={variant: PropTypes.string, children:PropTypes.node}

export default MessageBox