import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Default SMTP configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'localhost',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export const sendContactNotification = async (contactData) => {
  try {
    // Skip email in development if not configured
    if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_USER) {
      console.log('📧 Email notification skipped (not configured)');
      return;
    }

    const transporter = createTransporter();
    const { name, email, subject, message, timestamp } = contactData;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>
          
          <div style="background: #FFFFFF; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
            <h3 style="color: #1E293B; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #EFF6FF; border-radius: 8px;">
            <p style="margin: 0; color: #1E40AF; font-size: 14px;">
              Reply to this message by responding directly to ${email}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Contact notification email sent successfully');

  } catch (error) {
    console.error('📧 Email notification failed:', error.message);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_USER) {
      console.log('📧 Welcome email skipped (not configured)');
      return;
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my latest projects on <a href="https://github.com/johnsmith" style="color: #3B82F6;">GitHub</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/johnsmith" style="color: #3B82F6;">LinkedIn</a></li>
            <li>Follow me on <a href="https://twitter.com/johnsmith" style="color: #3B82F6;">Twitter</a></li>
          </ul>
          
          <p>Best regards,<br>John Smith</p>
          
          <div style="margin-top: 30px; padding: 15px; background: #F8FAFC; border-radius: 8px; font-size: 12px; color: #64748B;">
            <p style="margin: 0;">This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Welcome email sent successfully');

  } catch (error) {
    console.error('📧 Welcome email failed:', error.message);
    throw error;
  }
};