import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // 테스트할 로컬 서버 주소
    supportFile: false, // 기본 support 파일 사용 안 함 (선택 사항)
  },
});
