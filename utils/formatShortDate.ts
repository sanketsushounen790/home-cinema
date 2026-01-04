/**
 * Định dạng chuỗi ngày ISO thành định dạng ngày tháng ngắn gọn theo locale (mặc định 'vi-VN').
 *
 * @param isoDateString Chuỗi ngày tháng theo chuẩn ISO (ví dụ: "2017-07-03T...Z").
 * @param locale Locale để định dạng (mặc định là 'vi-VN').
 * @returns Chuỗi ngày tháng đã định dạng (ví dụ: "03/07/2017").
 */
const formatShortDate = (isoDateString: string, locale: string): string => {
  try {
    const dateObject = new Date(isoDateString);
    // Tùy chọn mặc định cho định dạng ngắn gọn
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return dateObject.toLocaleDateString(locale, options);
  } catch (error) {
    console.error("Lỗi khi định dạng ngày tháng:", error);
    return isoDateString; // Trả về chuỗi gốc nếu có lỗi
  }
};

export default formatShortDate;
