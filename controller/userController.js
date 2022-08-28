const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../model/User");
const { sendEmail } = require("../utils/mailer");

exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("کاربری با این ایمیل پیدا نشد");
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      const token = jwt.sign(
        {
          user: {
            userId: user._id.toString(),
            email: user.email,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, userId: user._id.toString() });
    } else {
      const error = new Error("کلمه عبور یا نام کاربری اشتباه است ");
      error.statusCode = 422;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

exports.creatUser = async (req, res, next) => {
  try {
    await User.userValidation(req.body);
    const { email, fullname, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const error = new Error("کاربری یا این ایمیل وجود دارد ");
      error.statusCode = 422;
      throw error;
    } else {
      await User.create({ fullname, email, password }); // use middleware for hash on /model/User

      //send Wellcome email
      sendEmail(
        email,
        fullname,
        "خوش امدی به وبلاگ ما ",
        "سلام من به تو یار قدیمی منم همون هوادار قدیمی"
      );

      res.status(201).json({ message: "با موفقیت عضو شدید" });
    }

    // const hash = await bcrypt.hash(password, 10);
  } catch (err) {
    next(err);
  }
};

exports.handleForgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("یوزرنیم وجود ندارد");
      error.statusCode = 422;
      throw error;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:3000/users/reset-password/${token}`;
    sendEmail(
      user.email,
      user.fullname,
      "فراموشی رمز عبور",
      `جهت تَغییر رمز عبور روی لینک زیر کلیک کنید   <a href="${resetLink}">لینک تِیر رمز عبور</a>`
    );
    res.status(200).json({ message: "لینک ارسال شد " });
  } catch (err) {
    next(err);
  }
};

exports.handleResetPassword = async (req, res, next) => {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  try {
    if (!decodedToken) {
      const error = new Error("شما مجوز این کار را ندارید ");
      error.statusCode = 401;
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new Error("کلمه های عبور یکسان نیستند");
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      const error = new Error("کاربر با این شناسه یافت نشد");
      error.statusCode = 404;
      throw error;
    }

    user.password = password;

    await user.save();
    res.status(200).json({ message: "پسورد شما با موفقیت تغیر کرد" });
  } catch (err) {
    next(err);
  }
};
