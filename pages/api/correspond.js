import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: "dustinerickson@gmail.com", // Your email where you'll receive emails
      from: "ericksontreeserviceweb@gmail.com", // your website email address here
      subject: `Website Contact Form: ${req.body.name} (${req.body.email})`,
      html: `<div>${req.body.message}</div><br/><br/>from: ${req.body.email}`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: null });
}

export default sendEmail;
