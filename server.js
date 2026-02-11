const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const LEADS_FILE = "./leads.json";

// Create leads.json if missing
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, "[]");
}

// ================= CONTACT FORM =================

app.post("/contact", (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone) {
    return res.json({ success: false });
  }

  const newLead = {
    name,
    phone,
    email,
    service,
    message,
    date: new Date()
  };

  const leads = JSON.parse(fs.readFileSync(LEADS_FILE));
  leads.push(newLead);

  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

  res.json({
    success: true,
    whatsapp: `https://api.whatsapp.com/send?phone=919137426363&text=New Lead:%0AName:${name}%0APhone:${phone}%0AService:${service}`
  });
});

// ================= GET LEADS =================

app.get("/leads", (req, res) => {
  const leads = JSON.parse(fs.readFileSync(LEADS_FILE));
  res.json(leads);
});

app.listen(PORT, () => {
  console.log("Server running http://localhost:" + PORT);
});
