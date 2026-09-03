const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { to_email, user_name, user_phone, user_location, user_message } = JSON.parse(event.body);

    // Validate required fields
    if (!to_email || !user_name) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Get Gmail credentials from environment variables
    const sender_email = process.env.GMAIL_USER;
    const sender_password = process.env.GMAIL_APP_PASSWORD;

    if (!sender_email || !sender_password) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender_email,
        pass: sender_password
      }
    });

    // Email template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 30px; }
    .detail { margin: 15px 0; }
    .label { font-weight: bold; color: #059669; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Thank You!</h1>
      <p>We've Received Your Solar Inquiry</p>
    </div>
    <div class="content">
      <p>Hi <strong>${user_name}</strong>,</p>
      <p>Thank you for reaching out to Future Energy Solutions! We're thrilled to help you explore solar energy.</p>
      <p>Your inquiry has been successfully received, and our solar experts are reviewing your details right now. You can expect to hear from us within <strong>2 hours during business hours</strong> (Monday - Saturday, 9 AM - 6 PM IST).</p>
      
      <h3 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">Your Details:</h3>
      <div class="detail">
        <span class="label">Name:</span> ${user_name}
      </div>
      <div class="detail">
        <span class="label">Phone:</span> ${user_phone}
      </div>
      <div class="detail">
        <span class="label">Location:</span> ${user_location}
      </div>

      <p style="margin-top: 30px; color: #059669; font-weight: bold;">
        Best regards,<br>
        Future Energy Solutions Team<br>
        <em>Powering India with Clean Solar Energy</em>
      </p>
    </div>
    <div class="footer">
      <p>© 2024 Future Energy Solutions. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email
    const mailOptions = {
      from: `"Future Energy Solutions" <${sender_email}>`,
      to: to_email,
      subject: 'We Received Your Solar Inquiry - Future Energy Solutions',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Email sent successfully!',
        success: true
      })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};
