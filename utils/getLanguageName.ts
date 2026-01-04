const getLanguageName = (
  code: string,
  displayLocale: string = "en"
): string => {
  try {
    // Intl.DisplayNames is available in modern TS environments (ES2020+)
    const displayNames = new Intl.DisplayNames([displayLocale], {
      type: "language",
    });

    // The .of() method may return 'undefined' if the code is invalid,
    // so we handle that case and return the original code as a fallback.
    return displayNames.of(code) ?? code;
  } catch (error) {
    console.error("Error formatting language code:", error);
    return code;
  }
};

export default getLanguageName;
