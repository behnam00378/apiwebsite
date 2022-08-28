const yup = require("yup");

exports.schema = yup.object().shape({
  fullname: yup
    .string()
    .required("نام  و نام خانوادگی الزامی میباشد")
    .min(4, "نام و نام خانوادگی نباید کمتر از ۴ کاراکتر باشد ")
    .max(255, "نام و نام خانوادگی نباید بیشتر از ۲۵۵ کاراکتر باشد "),
  email: yup
    .string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل الزامی میباشد "),
  password: yup
    .string()
    .min(4, " گذرواژه نباید کمتر از ۴ کاراکتر باشد ")
    .max(255, " گذرواژه نباید بیشتر از ۲۵۵ کاراکتر باشد ")
    .required("وارد کردن گذرواژه الزامیست"),
  confirmPassword: yup
    .string()
    .required("وارد کردن دوباره گذرواژه الزامیست")
    .oneOf([yup.ref("password"), null], "گذرواژه ها مشابه نیستند"),
});
