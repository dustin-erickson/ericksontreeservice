import {useState} from 'react';

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [botCheck, setBotCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sendBtnText, setSendBtnText] = useState("Send");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleSubmit = async (e) => {
      //prevent default submit event
      e.preventDefault();
  
      const form = e.target;
      //check for bot (idiots spam filter)
      if (botCheck) {
        //set loading to true (disables send button)
        setLoading(true);
        //set send button text to "Sending..."
        setSendBtnText("Sending...");

        const res = await fetch("/api/correspond", {
          body: JSON.stringify({
            email: email,
            name: name,
            message: message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
    
        const { error } = await res.json();
        if (error) {
          console.log("ERRROR", error);
          setLoading(false);
          setSendBtnText("Send");
          setSuccess(null);
          setError(error);
          return;
        }

        //successfull email sent
        setLoading(false);
        setSendBtnText('Send');
        setSuccess("Your message has been successfully sent, Thank you for your message!");
        setError(null);
        setName('');
        setEmail('');
        setMessage('');
        setBotCheck(false);
        form.reset();
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className='formField'
            name="name"
            onInput={(e) => setName(e.target.value)}
            onFocus={(e) => e.preventDefault()}
            value={name}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className='formField'
            onFocus={(e) => e.preventDefault()}
            id="email"
            name="email"
            onInput={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="messsage">Message</label>
          <textarea
            id="message"
            className='formField'
            onFocus={(e) => e.preventDefault()}
            name="message"
            onInput={(e) => setMessage(e.target.value)}
            value={message}
            required
            minLength="8"
          ></textarea>
        </div>
        <div className="checkboxGroup">
          <label htmlFor="botcheck">I agree that I am <b>NOT</b> a bot.</label>
          <input
            type="checkbox"
            id="botcheck"
            name="botcheck"
            onFocus={(e) => e.preventDefault()}
            onChange={(e) => setBotCheck(e.target.checked)}
            checked={botCheck}
            required
          />
        </div>
        <button className='formButton' disabled={loading}>{sendBtnText}</button>
        {error && <p className="error_message">{error}</p>}
        {success && <p className="success_message">{success}</p>}
      </form>
    );
  };

  export default ContactForm;