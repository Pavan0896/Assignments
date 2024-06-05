const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user: { type: String, unique: true },
    product: { type: String, required: true },
    product_brand: { type: String, required: true },
    product_color: { type: String, required: true },
    product_quantity: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
