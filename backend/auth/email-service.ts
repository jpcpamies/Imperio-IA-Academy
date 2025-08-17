import { 
  EMAIL_SERVICE_PROVIDER, 
  emailApiKey, 
  EMAIL_FROM_ADDRESS, 
  EMAIL_FROM_NAME,
  EMAIL_REPLY_TO,
  API_BASE_URL 
} from "./config";
import { logSecurityEvent } from "./security-logger";

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

// Email templates
export const EMAIL_TEMPLATES = {
  PASSWORD_RESET: (resetToken: string, userEmail: string): EmailTemplate => ({
    subject: "Reset Your AI Academia Password",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A2342; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .button { 
            display: inline-block; 
            background: #D95D39; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AI Academia</h1>
            <p>Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset the password for your AI Academia account associated with <strong>${userEmail}</strong>.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${API_BASE_URL}/reset-password?token=${resetToken}" class="button">Reset Password</a>
            <div class="warning">
              <strong>Important:</strong>
              <ul>
                <li>This link will expire in 1 hour for security reasons</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 3px;">
              ${API_BASE_URL}/reset-password?token=${resetToken}
            </p>
          </div>
          <div class="footer">
            <p>This email was sent by AI Academia. If you have questions, contact us at ${EMAIL_REPLY_TO}</p>
            <p>© 2024 AI Academia. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
AI Academia - Password Reset Request

Hello,

We received a request to reset the password for your AI Academia account associated with ${userEmail}.

To reset your password, visit this link:
${API_BASE_URL}/reset-password?token=${resetToken}

Important:
- This link will expire in 1 hour for security reasons
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

If you have questions, contact us at ${EMAIL_REPLY_TO}

© 2024 AI Academia. All rights reserved.
    `
  }),

  WELCOME: (userName: string, userEmail: string): EmailTemplate => ({
    subject: "Welcome to AI Academia!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AI Academia</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A2342; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .button { 
            display: inline-block; 
            background: #D95D39; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to AI Academia!</h1>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Welcome to AI Academia! Your account has been successfully created.</p>
            <p>You can now access our comprehensive AI training programs designed for professionals like you.</p>
            <a href="${API_BASE_URL}/dashboard" class="button">Access Your Dashboard</a>
            <p>If you have any questions, don't hesitate to reach out to our support team.</p>
          </div>
          <div class="footer">
            <p>Contact us at ${EMAIL_REPLY_TO} for any questions.</p>
            <p>© 2024 AI Academia. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to AI Academia!

Hello ${userName}!

Welcome to AI Academia! Your account has been successfully created.

You can now access our comprehensive AI training programs designed for professionals like you.

Visit your dashboard: ${API_BASE_URL}/dashboard

If you have any questions, contact us at ${EMAIL_REPLY_TO}

© 2024 AI Academia. All rights reserved.
    `
  }),

  SECURITY_ALERT: (userEmail: string, eventType: string, ipAddress: string): EmailTemplate => ({
    subject: "AI Academia Security Alert",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Security Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .alert { background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Security Alert</h1>
          </div>
          <div class="content">
            <div class="alert">
              <strong>Security Event Detected</strong>
            </div>
            <p>We detected unusual activity on your AI Academia account:</p>
            <ul>
              <li><strong>Account:</strong> ${userEmail}</li>
              <li><strong>Event:</strong> ${eventType}</li>
              <li><strong>IP Address:</strong> ${ipAddress}</li>
              <li><strong>Time:</strong> ${new Date().toISOString()}</li>
            </ul>
            <p>If this was you, no action is needed. If you don't recognize this activity, please:</p>
            <ol>
              <li>Change your password immediately</li>
              <li>Review your account activity</li>
              <li>Contact our support team</li>
            </ol>
          </div>
          <div class="footer">
            <p>Contact us immediately at ${EMAIL_REPLY_TO} if you need assistance.</p>
            <p>© 2024 AI Academia. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
AI Academia Security Alert

We detected unusual activity on your AI Academia account:

Account: ${userEmail}
Event: ${eventType}
IP Address: ${ipAddress}
Time: ${new Date().toISOString()}

If this was you, no action is needed. If you don't recognize this activity, please:
1. Change your password immediately
2. Review your account activity
3. Contact our support team

Contact us immediately at ${EMAIL_REPLY_TO} if you need assistance.

© 2024 AI Academia. All rights reserved.
    `
  })
};

// Email service implementations
class SendGridEmailService {
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const apiKey = emailApiKey();
    if (!apiKey) {
      console.error("SendGrid API Key is not configured.");
      return false;
    }

    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: options.to }],
            subject: options.subject
          }],
          from: {
            email: EMAIL_FROM_ADDRESS,
            name: EMAIL_FROM_NAME
          },
          reply_to: {
            email: options.replyTo || EMAIL_REPLY_TO
          },
          content: [
            {
              type: "text/plain",
              value: options.text
            },
            {
              type: "text/html",
              value: options.html
            }
          ]
        })
      });

      return response.ok;
    } catch (error) {
      console.error("SendGrid email error:", error);
      return false;
    }
  }
}

class SMTPEmailService {
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    // In a real implementation, you would use nodemailer or similar
    console.log("SMTP Email would be sent:", {
      to: options.to,
      subject: options.subject,
      from: EMAIL_FROM_ADDRESS
    });
    return true;
  }
}

class MockEmailService {
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    console.log("📧 Mock Email Service - Email would be sent:");
    console.log(`  To: ${options.to}`);
    console.log(`  Subject: ${options.subject}`);
    console.log(`  From: ${EMAIL_FROM_ADDRESS}`);
    console.log("  Content preview:", options.text.substring(0, 100) + "...");
    return true;
  }
}

// Email service factory
function getEmailService() {
  switch (EMAIL_SERVICE_PROVIDER.toLowerCase()) {
    case "sendgrid":
      return new SendGridEmailService();
    case "smtp":
      return new SMTPEmailService();
    default:
      console.warn(`Unknown email service provider: ${EMAIL_SERVICE_PROVIDER}, using mock service`);
      return new MockEmailService();
  }
}

// Public email functions
export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
  const emailService = getEmailService();
  try {
    const template = EMAIL_TEMPLATES.PASSWORD_RESET(resetToken, email);
    
    const success = await emailService.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text
    });

    // Log email attempt
    await logSecurityEvent({
      event: success ? "PASSWORD_RESET_EMAIL_SENT" : "PASSWORD_RESET_EMAIL_FAILED",
      email: email,
      details: { 
        success,
        provider: EMAIL_SERVICE_PROVIDER,
        resetTokenPrefix: resetToken.substring(0, 8) + "..."
      }
    });

    return success;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    
    await logSecurityEvent({
      event: "PASSWORD_RESET_EMAIL_ERROR",
      email: email,
      details: { 
        error: error instanceof Error ? error.message : "Unknown error",
        provider: EMAIL_SERVICE_PROVIDER
      }
    });

    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  const emailService = getEmailService();
  try {
    const template = EMAIL_TEMPLATES.WELCOME(name, email);
    
    const success = await emailService.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text
    });

    await logSecurityEvent({
      event: success ? "WELCOME_EMAIL_SENT" : "WELCOME_EMAIL_FAILED",
      email: email,
      details: { 
        success,
        provider: EMAIL_SERVICE_PROVIDER,
        userName: name
      }
    });

    return success;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
}

export async function sendSecurityAlertEmail(email: string, eventType: string, ipAddress: string): Promise<boolean> {
  const emailService = getEmailService();
  try {
    const template = EMAIL_TEMPLATES.SECURITY_ALERT(email, eventType, ipAddress);
    
    const success = await emailService.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text
    });

    await logSecurityEvent({
      event: success ? "SECURITY_ALERT_EMAIL_SENT" : "SECURITY_ALERT_EMAIL_FAILED",
      email: email,
      details: { 
        success,
        provider: EMAIL_SERVICE_PROVIDER,
        alertType: eventType,
        ipAddress
      }
    });

    return success;
  } catch (error) {
    console.error("Failed to send security alert email:", error);
    return false;
  }
}

// Email service health check
export async function testEmailService(): Promise<{ success: boolean; error?: string }> {
  try {
    if (EMAIL_SERVICE_PROVIDER === "mock") {
      return { success: true };
    }
    
    if (!emailApiKey()) {
      return { success: false, error: "Email API Key is not configured." };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}
