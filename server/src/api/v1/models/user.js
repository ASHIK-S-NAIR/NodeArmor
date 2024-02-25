const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { createHmac } = require("crypto");
const uuid = require("uuid");
const { v4 } = uuid;

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
    },
    encry_password: String,
    // address: {
    //   houseName: {
    //     type: String,
    //   },
    //   streetName: {
    //     type: String,
    //   },
    // },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    salt: String,
    // cart: [
    //   {
    //     product: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Product",
    //     },
    //     quantity: Number,
    //   },
    // ],
    // orders: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Order",
    //   },
    // ],
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) {
      return "";
    }
    try {
      return createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      console.log(error.message);
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
