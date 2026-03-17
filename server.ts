import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to send email
  app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Configuração do transportador de e-mail
    // IMPORTANTE: O usuário deve configurar EMAIL_USER e EMAIL_PASS no painel de Segredos
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "micheldasilva2050@gmail.com", // Destinatário fixo conforme solicitado
      subject: `Novo contato de ${name} - ToolFast`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    };

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("EMAIL_USER ou EMAIL_PASS não configurados. Simulando envio...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res.json({ success: true, message: "Simulação de envio concluída (configure as credenciais para envio real)." });
      }

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).json({ error: "Erro ao enviar o e-mail. Verifique as credenciais." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
