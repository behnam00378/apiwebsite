const yup = require("yup");

exports.schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الزامی میباشد")
    .min(5, "عنوان نباید کمتر از ۵ حرف باشد")
    .max(100, "عنوان نباید بیشتر از ۱۰۰ حرف باشد"),
  body: yup.string().required('محتوای پست الزامی میباشد'),
  status:yup.mixed().oneOf(["private" , "public"],"یکی از دو وضعیت را انتخاب کنید"),
  thumbnail:yup.object().shape({
    name:yup.string().required("عکس بند انگشتی الزامی میباشد"),
    size:yup.number().max(3000000,"عکس بیشتر از ۳ مگابات مجاز نیست"),
    mimetype: yup.mixed().oneOf(["image/jpeg","image/png"],"پسوند peg و ng وارد کنید")
  })

});
