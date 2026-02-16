
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  service: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", contactSchema);
