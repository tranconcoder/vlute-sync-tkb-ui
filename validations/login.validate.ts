import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  student_id: Yup.string()
    .required("Vui lòng nhập mã sinh viên")
    .matches(
      /^[0-9]{8}$/,
      "Mã sinh viên định dạng không đúng (phải gồm 8 chữ số)",
    ),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});
