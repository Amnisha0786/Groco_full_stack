const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  description: String,
  quantity: Number,
  price: Number,
  amount: Number,
});

const invoiceSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email address"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    items: [subSchema],
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
