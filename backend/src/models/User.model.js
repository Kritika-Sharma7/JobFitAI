const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: null
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

/* =====================================================
   🔐 PASSWORD HASHING (MONGOOSE v7 SAFE)
   ===================================================== */
UserSchema.pre("save", async function () {
  // Only hash if password is new or modified
  if (!this.isModified("passwordHash")) return;

  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

module.exports = mongoose.model("User", UserSchema);


//RS 31Dec  