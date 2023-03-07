import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e15c3597c1a256",
    pass: "37d3ac3931657f"
  }
});