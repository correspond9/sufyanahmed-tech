import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import { getSmtpConfig } from "@/lib/email";

async function getTransporter() {
  const config = getSmtpConfig();
  if (!config) throw new Error("SMTP_NOT_CONFIGURED");

  return {
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    }),
    to: config.to,
    from: config.user,
  };
}

export async function sendNewsletterSignup(email: string): Promise<void> {
  const { transporter, to, from } = await getTransporter();

  await transporter.sendMail({
    from: `"${siteConfig.shortName} Newsletter" <${from}>`,
    to,
    replyTo: email,
    subject: `[Newsletter] New subscriber: ${email}`,
    text: `New newsletter subscription request:\n\nEmail: ${email}\nDate: ${new Date().toISOString()}\nSource: ${siteConfig.url}`,
    html: `<p><strong>New newsletter subscription</strong></p><p>Email: ${email}</p><p>Source: <a href="${siteConfig.url}">${siteConfig.url}</a></p>`,
  });
}
