# 업비트 트레이딩 봇

## 1. 설치
``` bash
# install dependencies
$ npm install
```

## 2. 사용법
- 업비트 [Open API](https://upbit.com/mypage/open_api_management)에 방문해 API 키를 발급받습니다.

- 발급받은 엑세스키와 시크릿키를 config/index.js에 넣어줍니다.

```javascript
module.exports = {
  "access_key": "이곳에 엑세스키를 넣어주세요.",
  "secret_key": "이곳에 시크릿키를 넣어주세요.",
  "server_url": "https://api.upbit.com"
}
```

## 3. 리스너
시장의 상태를 감시하는 코드는 listener 디렉토리에 있습니다.

코드를 조금 수정하시면 가상으로 매수와 매도를 실행해 자신만의 알고리즘을 현재 시장 상태에 반영해볼 수 있습니다.

## 4. 액션
action 디렉토리에는 다음의 파일이 있습니다.

account.js: 계좌 정보를 불러오는 코드

buyAll.js: 현재 가지고 있는 한국 원화를 모든 코인에 동일하게 시장가로 매수하는 코드.

sellAll.js: 소유한 모든 코인 전체를 시장가로 매도하는 코드.

## 5. 주의
이 코드는 실제 자산을 거래할 수 있으니 신중히 사용해주세요.
이 코드를 사용하시던 중 발생한 문제에 대해서 개발자는 책임을 지지 않습니다.