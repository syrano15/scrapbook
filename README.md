# 스크랩북 (Scrapbook)

웹에서 모은 기사를 **번역 전문**과 **요약·분석** 두 탭으로 읽는 개인 읽을거리 앱.

- 주소: https://syrano15.github.io/scrapbook/
- 이 저장소(공개)에는 **앱 코드만** 있습니다. 기사 본문·번역·이미지·메모는 비공개 저장소 `syrano15/scrapbook-data`에 있고, 기기마다 한 번 넣는 fine-grained 토큰(그 저장소 하나만 읽기·쓰기)으로만 열립니다.
- 기사 등록 규격: [ARTICLE_IMPORT_SPEC.md](ARTICLE_IMPORT_SPEC.md) · 예시: [article-template.json](article-template.json) (테스트용 지어낸 글)

## 비공개 저장소 구조 (scrapbook-data)

```
index.json              목록용 요약 (제목, 매체, 날짜, 소개, 태그, 표지)
articles/<id>.json      기사 한 편 (등록 규격 + id, addedAt, updatedAt)
images/<id>/...         기사 이미지
user.json               읽기 상태, 읽던 위치, 즐겨찾기, 메모, 저장한 문장, 체크리스트
```

모닝 브리핑(syrano15/morning-board)의 "읽을거리" 카드는 같은 주소(syrano15.github.io)에 저장된 토큰으로 `index.json`과 `user.json`을 읽어, 아직 다 읽지 않은 가장 최근 글을 보여 줍니다.
