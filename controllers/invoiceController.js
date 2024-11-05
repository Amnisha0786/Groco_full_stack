const asyncHandler = require("express-async-handler");
const Invoice = require("../models/invoiceModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { invoiceSchema } = require("../middleware/joiValidations");
const { responseFormat } = require("../utils/responseFormat");

//@desc get invoice
//@route GET /api/invoice/
//@access private
const getAllInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({ user_id: req.user.id });
  responseFormat(res, "Data fetched successfully", invoices, 200);
});

//@desc Login a user
//@route POST /api/invoice/
//@access private
const createInvoice = asyncHandler(async (req, res) => {
  const { error } = invoiceSchema.validate(req.body, { abortEarly: false });
  const { name, email, items, total } = req.body;
  if (error) {
    return res.status(400).json({
      error: error.details.map((errors) => {
        return errors.message;
      }),
    });
  }
  const data = await Invoice.create({
    name,
    email,
    items,
    total,
    user_id: req.user.id,
  });
  responseFormat(res, "Data created successfully", data, 201);
});

//@desc Current user info
//@route PUT /api/invoice/id
//@access private
const updateInvoice = asyncHandler(async (req, res) => {
  const data = await Invoice.findById(req.params.id);
  if (!data) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }

  if (data.user_id.toString() !== req.user.id) {
    res
      .status(403)
      .json({ message: "user don't have permission to update this invoice" });
    return;
  }

  const updatedInvoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  responseFormat(res, "Data updated successfully", updatedInvoice, 200);
});

//@desc delete invoice
//@route DELETE /api/invoice/id
//@access private
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }
  if (invoice.user_id.toString() !== req.user.id) {
    res
      .status(403)
      .json({ message: "user don't have permission to delete this invoice " });
    return;
  }
  responseFormat(res, "Data deleted successfully", invoice, 200);
});

//@desc get single invoice
//@route GET /api/invoice/id
//@access private
const getInvoice = asyncHandler(async (req, res) => {
  const data = await Invoice.findById(req.params.id);
  if (!data) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }
  responseFormat(res, "Data fetched successfully", data, 200);
});

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoice,
  deleteInvoice,
  updateInvoice,
};
