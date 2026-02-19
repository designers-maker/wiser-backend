const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Function to send notification email
async function sendNotificationEmail(formType, formData, submissionId) {
  try {
    const subjectMap = {
      'volunteer': 'New Volunteer Form Submission',
      'csr': 'New CSR Form Submission', 
      'college': 'New College Form Submission',
      'contact': 'New Contact Form Message',
      'donation': 'New Donation Record'
    };

    const subject = subjectMap[formType] || `New ${formType} Form Submission`;
    
    // Create HTML email content
    const htmlContent = `
      <h2>📋 ${subject}</h2>
      <p><strong>Submission ID:</strong> ${submissionId}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <h3>Submission Details:</h3>
      <table style="border-collapse: collapse; width: 100%;">
        ${Object.entries(formData).map(([key, value]) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">${key.charAt(0).toUpperCase() + key.slice(1)}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
          </tr>
        `).join('')}
      </table>
      <hr>
      <p><em>This is an automated notification from Wiser Volunteer Platform.</em></p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'designer.s@seventhsensetalent.com',
      to: process.env.NOTIFICATION_EMAIL || 'designer.s@seventhsensetalent.com', // Change this to your email
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending notification email:', error.message);
    return false;
  }
}

module.exports = { sendNotificationEmail };