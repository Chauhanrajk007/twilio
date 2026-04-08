import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_phone, message } = req.body;

  const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
  );

  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:" + user_phone,
      body: message
    });

    res.status(200).json({ status: "success" });

  } catch (err) {
    res.status(200).json({
      status: "error",
      message: "Please join WhatsApp first"
    });
  }
}
