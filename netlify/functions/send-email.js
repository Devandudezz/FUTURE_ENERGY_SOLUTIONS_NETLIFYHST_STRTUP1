const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  console.log('📧 Email function called');
  console.log('HTTP Method:', event.httpMethod);

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Handle OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: 'OK' };
  }

  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    console.log('❌ Invalid method:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Only POST method is allowed' })
    };
  }

  try {
    // Parse request body
    let body = event.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    console.log('📩 Request body:', body);

    const { to_email, user_name, user_phone, user_location, user_message } = body;

    // Validate
    if (!to_email || !user_name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing to_email or user_name' })
      };
    }

    // Get credentials
    const gmail_user = process.env.GMAIL_USER;
    const gmail_pass = process.env.GMAIL_APP_PASSWORD;

    console.log('Checking credentials...');
    console.log('GMAIL_USER set:', !!gmail_user);
    console.log('GMAIL_APP_PASSWORD set:', !!gmail_pass);

    if (!gmail_user || !gmail_pass) {
      console.error('❌ Missing Gmail credentials');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Email service not configured',
          hint: 'Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables'
        })
      };
    }

    // Create transporter
    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmail_user,
        pass: gmail_pass
      }
    });

    // Verify
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection verified');

    // Customer email
    const customerEmail = {
      from: gmail_user,
      to: to_email,
      subject: '✅ Solar Inquiry Received - Future Energy Solutions',
      html: `
        <h2>Thank You for Your Inquiry!</h2>
        <p>Hi ${user_name},</p>
        <p>We've received your solar inquiry and will contact you within 2 hours.</p>
        <p><strong>Your Details:</strong></p>
        <ul>
          <li>Name: ${user_name}</li>
          <li>Phone: ${user_phone}</li>
          <li>Location: ${user_location}</li>
        </ul>
        <p>Best regards,<br>Future Energy Solutions Team</p>
      `
    };

    // Company notification email
    const companyEmail = {
      from: gmail_user,
      to: gmail_user,
      subject: `New Solar Inquiry from ${user_name}`,
      html: `
        <h2>📨 New Inquiry Received</h2>
        <p><strong>Customer:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${to_email}</p>
        <p><strong>Phone:</strong> ${user_phone}</p>
        <p><strong>Location:</strong> ${user_location}</p>
        <p><strong>Message:</strong> ${user_message || 'N/A'}</p>
        <p>Please follow up with the customer.</p>
      `
    };

    // Send both emails
    console.log('Sending customer email to:', to_email);
    await transporter.sendMail(customerEmail);
    console.log('✅ Customer email sent');

    console.log('Sending company notification');
    await transporter.sendMail(companyEmail);
    console.log('✅ Company email sent');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: '✅ Emails sent successfully!'
      })
    };

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send email',
        message: error.message
      })
    };
  }
};
