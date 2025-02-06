module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // "subject-case": [2, "always", ["sentence-case"]], // 제목은 문장형식으로....
    "subject-full-stop": [2, "never", "."], // 제목에 마침표 금지
    "header-max-length": [2, "always", 50], // 제목은 50자 이하
    "body-max-line-length": [1, "always", 72], // 본문은 72자 이하
  },
};
