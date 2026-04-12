// 주식 MBTI 데이터
// Design: 개미투자자 밈 감성 + Y2K 팝아트

export interface Question {
  id: number;
  text: string;
  subtext?: string;
  answers: {
    text: string;
    emoji: string;
    scores: Partial<Record<MbtiDimension, number>>;
  }[];
}

export type MbtiDimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface MbtiResult {
  type: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  famousQuote: string;
  mascot: 'bull' | 'bear' | 'neutral';
  color: string;
  compatibleWith: string;
  worstMatch: string;
  memeText: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "주식 앱을 여는 빈도는?",
    subtext: "솔직하게 답해주세요 👀",
    answers: [
      {
        text: "5분마다 확인함. 화장실도 폰 들고 감",
        emoji: "📱",
        scores: { E: 2, P: 2 }
      },
      {
        text: "하루에 한 번 장 마감 후에 봄",
        emoji: "😌",
        scores: { I: 2, J: 2 }
      }
    ]
  },
  {
    id: 2,
    text: "종목 선택 기준은?",
    subtext: "진짜 이유를 말해봐요",
    answers: [
      {
        text: "차트 보고 기술적 분석으로 판단",
        emoji: "📊",
        scores: { S: 2, T: 2 }
      },
      {
        text: "커뮤니티에서 핫하다길래 샀음",
        emoji: "🔥",
        scores: { N: 2, F: 2 }
      }
    ]
  },
  {
    id: 3,
    text: "주가가 -10% 됐을 때 당신의 반응은?",
    subtext: "현실적으로 생각해봐요",
    answers: [
      {
        text: "추가매수! 더 싸게 살 기회잖아?",
        emoji: "💪",
        scores: { J: 2, T: 2 }
      },
      {
        text: "손절하고 다른 종목 찾아봄",
        emoji: "✂️",
        scores: { P: 2, S: 2 }
      }
    ]
  },
  {
    id: 4,
    text: "투자 정보는 주로 어디서 얻나요?",
    subtext: "가장 많이 보는 곳",
    answers: [
      {
        text: "재무제표, 공시, 애널리스트 리포트",
        emoji: "📋",
        scores: { S: 2, T: 2 }
      },
      {
        text: "유튜브, 카카오톡 오픈채팅, 종토방",
        emoji: "💬",
        scores: { N: 2, F: 2 }
      }
    ]
  },
  {
    id: 5,
    text: "목표 수익률을 정하고 투자하나요?",
    subtext: "계획형 vs 즉흥형",
    answers: [
      {
        text: "네, 목표가 되면 무조건 팜",
        emoji: "🎯",
        scores: { J: 2, T: 2 }
      },
      {
        text: "더 오를 것 같으면 그냥 들고 있음",
        emoji: "🤔",
        scores: { P: 2, N: 2 }
      }
    ]
  },
  {
    id: 6,
    text: "주변 지인에게 종목 추천을 하나요?",
    subtext: "책임감 있게 답해주세요",
    answers: [
      {
        text: "당연하죠! 좋은 거 같이 벌어야죠",
        emoji: "🤝",
        scores: { E: 2, F: 2 }
      },
      {
        text: "절대 안 함. 내 계좌도 모르는데",
        emoji: "🤐",
        scores: { I: 2, T: 2 }
      }
    ]
  },
  {
    id: 7,
    text: "주식 얘기를 꺼내는 상황은?",
    subtext: "솔직한 당신의 모습",
    answers: [
      {
        text: "밥 먹다가도, 자다가도 생각남",
        emoji: "💭",
        scores: { E: 2, N: 2 }
      },
      {
        text: "물어보는 사람한테만 조용히 말함",
        emoji: "🤫",
        scores: { I: 2, S: 2 }
      }
    ]
  },
  {
    id: 8,
    text: "손실 중인 종목을 얼마나 버티나요?",
    subtext: "멘탈 테스트",
    answers: [
      {
        text: "원금 회복할 때까지 존버함",
        emoji: "🏔️",
        scores: { J: 2, F: 2 }
      },
      {
        text: "일정 % 이상 손실나면 칼손절",
        emoji: "⚡",
        scores: { T: 2, P: 2 }
      }
    ]
  },
  {
    id: 9,
    text: "투자 포트폴리오 구성은?",
    subtext: "현재 상태 기준",
    answers: [
      {
        text: "한 종목에 올인! 분산은 수익률 분산",
        emoji: "🎰",
        scores: { N: 2, P: 2 }
      },
      {
        text: "여러 종목에 분산해서 리스크 관리",
        emoji: "🗂️",
        scores: { S: 2, J: 2 }
      }
    ]
  },
  {
    id: 10,
    text: "주식 수익이 났을 때 당신은?",
    subtext: "기쁨을 어떻게 표현하나요",
    answers: [
      {
        text: "바로 SNS에 인증샷 올림 📸",
        emoji: "🎉",
        scores: { E: 2, F: 2 }
      },
      {
        text: "혼자 조용히 기뻐하고 재투자",
        emoji: "😏",
        scores: { I: 2, T: 2 }
      }
    ]
  },
  {
    id: 11,
    text: "테마주, 급등주 소식을 들으면?",
    subtext: "첫 번째 반응",
    answers: [
      {
        text: "일단 매수부터! 이유는 나중에",
        emoji: "🚀",
        scores: { N: 2, P: 2 }
      },
      {
        text: "왜 올랐는지 먼저 분석하고 판단",
        emoji: "🔍",
        scores: { S: 2, T: 2 }
      }
    ]
  },
  {
    id: 12,
    text: "투자 스타일을 한 마디로?",
    subtext: "가장 가까운 것 선택",
    answers: [
      {
        text: "단기 수익 극대화! 빠르게 먹고 나옴",
        emoji: "⚡",
        scores: { P: 2, S: 2 }
      },
      {
        text: "장기 투자! 10년 뒤를 본다",
        emoji: "🌱",
        scores: { J: 2, N: 2 }
      }
    ]
  }
];

export const mbtiResults: Record<string, MbtiResult> = {
  ESTJ: {
    type: "ESTJ",
    title: "시스템 트레이더",
    emoji: "🤖",
    subtitle: "\"규칙이 곧 수익이다\"",
    description: "당신은 철저한 매매 원칙을 세우고 감정 없이 실행하는 기계형 투자자입니다. 손절선 도달하면 눈물 없이 칼손절, 목표가 도달하면 미련 없이 익절. 주변에서 '냉혈한'이라고 부르지만 사실 당신이 제일 오래 살아남습니다. 종토방에서 '흔들리지 마세요'라고 댓글 달아주는 그 사람이 바로 당신.",
    strengths: ["철저한 리스크 관리", "감정 배제한 매매", "일관된 원칙 유지"],
    weaknesses: ["너무 빠른 익절로 큰 수익 놓침", "융통성 부족", "재미없는 투자 스타일"],
    famousQuote: "\"감정은 계좌를 갉아먹는다\"",
    mascot: "bull",
    color: "#22c55e",
    compatibleWith: "INFP (꿈꾸는 개미)",
    worstMatch: "ENFP (테마주 헌터)",
    memeText: "손절선 -7% 도달\n→ 0.001초 만에 매도\n→ 다음날 +30%\n→ 괜찮아, 원칙이 중요해"
  },
  ESTP: {
    type: "ESTP",
    title: "단타의 신",
    emoji: "⚡",
    subtitle: "\"5분봉이 곧 인생이다\"",
    description: "당신은 순간의 기회를 놓치지 않는 타고난 단타 트레이더입니다. 아침 9시 개장벨이 울리면 심장이 두근거리고, 호가창을 보면 눈이 반짝입니다. 점심도 주식 보면서 먹고, 화장실도 폰 들고 갑니다. 하루에 10번 매매는 기본. 수수료가 수익보다 많아도 '오늘은 연습이었어'라고 합리화하는 당신.",
    strengths: ["빠른 판단력", "순간 기회 포착", "높은 집중력"],
    weaknesses: ["수수료 폭탄", "과매매 경향", "장기 수익률 의문"],
    famousQuote: "\"1분 1초가 돈이다\"",
    mascot: "bull",
    color: "#FFE500",
    compatibleWith: "ISTJ (안전제일 장기투자자)",
    worstMatch: "INFJ (가치투자 철학자)",
    memeText: "9:00 매수\n9:03 매도 (+0.3%)\n9:05 재매수\n9:10 손절\n9:15 '오늘도 열심히 했다'"
  },
  ENTJ: {
    type: "ENTJ",
    title: "포트폴리오 CEO",
    emoji: "👔",
    subtitle: "\"내 계좌는 내가 운영하는 회사다\"",
    description: "당신은 주식을 단순한 투자가 아닌 사업으로 접근하는 전략가입니다. 섹터 배분, 리밸런싱, 헤지 전략까지 완벽하게 관리합니다. 주변 사람들한테 투자 강의를 자청하고, 카카오톡 프로필에 '투자 철학'을 적어놓는 타입. 수익률보다 '프로세스'를 더 중요시합니다.",
    strengths: ["체계적인 포트폴리오 관리", "거시경제 이해", "리더십"],
    weaknesses: ["과도한 자신감", "남의 말 안 들음", "복잡한 전략으로 오히려 손실"],
    famousQuote: "\"시장은 내 전략을 아직 이해 못 했을 뿐\"",
    mascot: "bull",
    color: "#3b82f6",
    compatibleWith: "ISFP (감성 배당 투자자)",
    worstMatch: "ESFP (인플루언서 따라쟁이)",
    memeText: "Q1 전략 수립 완료\nQ2 리밸런싱 예정\nQ3 섹터 로테이션\n실제 수익률: -3%"
  },
  ENTP: {
    type: "ENTP",
    title: "테마주 헌터",
    emoji: "🎯",
    subtitle: "\"다음 대박 테마는 내가 먼저 찾는다\"",
    description: "당신은 남들이 모르는 숨겨진 테마주를 발굴하는 것에 희열을 느끼는 탐험가 투자자입니다. AI, 2차전지, 우주, 로봇... 새로운 테마가 뜨면 가장 먼저 달려갑니다. 종토방에서 '이 종목 아직 모르는 사람?'으로 시작하는 글을 자주 씁니다. 10개 중 1개만 맞아도 된다는 마인드.",
    strengths: ["트렌드 선점 능력", "창의적 아이디어", "빠른 정보 수집"],
    weaknesses: ["너무 이른 진입", "분산 투자 과도", "한 테마에 집중 못함"],
    famousQuote: "\"남들이 알 때는 이미 늦었다\"",
    mascot: "neutral",
    color: "#a855f7",
    compatibleWith: "ISTJ (안전제일 장기투자자)",
    worstMatch: "ESTJ (시스템 트레이더)",
    memeText: "\"이 종목 곧 터진다\"\n→ 3개월 후 -40%\n\"아직 때가 안 됐을 뿐\"\n→ 6개월 후 -60%"
  },
  ESFJ: {
    type: "ESFJ",
    title: "종토방 인싸",
    emoji: "💬",
    subtitle: "\"같이 오르면 더 기쁘잖아요\"",
    description: "당신은 주식 커뮤니티의 핵심 인물입니다. 보유 종목 게시판에서 '화이팅!' 댓글을 달아주고, 손실 중인 사람들을 위로해줍니다. 종목 선택도 커뮤니티 분위기에 영향을 많이 받습니다. '다들 좋다고 하니까 좋겠지'라는 생각으로 매수하는 경우가 많습니다. 혼자 수익 내는 것보다 같이 수익 내는 게 더 좋은 사람.",
    strengths: ["정보 공유 능력", "커뮤니티 활동", "긍정적 에너지"],
    weaknesses: ["군중심리에 취약", "소문에 쉽게 흔들림", "손절 타이밍 놓침"],
    famousQuote: "\"우리 다 같이 오르자!\"",
    mascot: "neutral",
    color: "#ec4899",
    compatibleWith: "INTJ (퀀트 투자자)",
    worstMatch: "ISTP (차트 분석가)",
    memeText: "종토방: \"이 종목 곧 상한가!\"\n나: 바로 매수\n→ 다음날 하한가\n\"다 같이 물렸으니 괜찮아 😊\""
  },
  ESFP: {
    type: "ESFP",
    title: "인플루언서 따라쟁이",
    emoji: "📱",
    subtitle: "\"유튜버가 추천했으면 믿어야지\"",
    description: "당신은 주식 유튜버, 인플루언서, 오픈채팅방의 핫한 종목 정보를 따라가는 트렌디한 투자자입니다. 구독자 100만 유튜버가 추천하면 일단 매수. 나중에 알고 보면 그 유튜버가 이미 팔고 나간 경우가 많지만... 그래도 다음 영상도 열심히 봅니다. 주식보다 주식 콘텐츠 보는 시간이 더 긴 타입.",
    strengths: ["최신 트렌드 파악", "활발한 정보 수집", "긍정적 마인드"],
    weaknesses: ["검증 없는 추종", "뒤늦은 진입", "쉬운 조작 대상"],
    famousQuote: "\"이 분이 추천하면 진짜예요\"",
    mascot: "bear",
    color: "#f97316",
    compatibleWith: "INTJ (퀀트 투자자)",
    worstMatch: "ENTJ (포트폴리오 CEO)",
    memeText: "유튜버: \"이 종목 주목!\"\n나: 매수 완료 👍\n유튜버: \"이미 팔았습니다\"\n나: 😱"
  },
  ENFJ: {
    type: "ENFJ",
    title: "주식 전도사",
    emoji: "📢",
    subtitle: "\"주식은 선택이 아닌 필수입니다\"",
    description: "당신은 주변 모든 사람에게 주식 투자를 권유하는 열정적인 전도사입니다. 부모님, 친구, 심지어 처음 만난 사람에게도 '지금 안 하면 후회해요'라고 말합니다. 본인도 수익률이 좋지 않을 때도 있지만, 투자 자체의 중요성을 전파하는 것에 사명감을 느낍니다. 주변 사람이 손실 나면 본인 일처럼 마음 아파합니다.",
    strengths: ["강한 설득력", "열정적인 공유", "사람들 동기부여"],
    weaknesses: ["책임감 부담", "감정적 투자", "객관적 판단 어려움"],
    famousQuote: "\"지금 시작 안 하면 10년 후 후회해요\"",
    mascot: "bull",
    color: "#14b8a6",
    compatibleWith: "ISTP (차트 분석가)",
    worstMatch: "INTP (경제학 덕후)",
    memeText: "나: \"주식 해봐, 진짜 좋아\"\n친구: 손실 -30%\n나: \"미안... 내가 책임질게\"\n친구: \"됐어 😤\""
  },
  ENFP: {
    type: "ENFP",
    title: "꿈꾸는 개미",
    emoji: "🌈",
    subtitle: "\"언젠간 10배 오를 거야\"",
    description: "당신은 무한한 낙관주의로 무장한 희망 투자자입니다. 지금 -50%여도 '이건 분명히 오른다'는 확신이 있습니다. 재무제표보다 '이 회사의 비전'을 더 중요하게 봅니다. 투자 일기를 쓰고, 종목에 애착을 갖습니다. 손절을 '포기'라고 생각하기 때문에 좀처럼 손절을 못합니다. 하지만 가끔 진짜 10배 종목을 발굴하기도 합니다.",
    strengths: ["강한 신념", "장기 보유 능력", "독창적 종목 발굴"],
    weaknesses: ["손절 못함", "비현실적 기대", "감정적 판단"],
    famousQuote: "\"이 종목은 달라, 진짜야\"",
    mascot: "bear",
    color: "#8b5cf6",
    compatibleWith: "ESTJ (시스템 트레이더)",
    worstMatch: "ENTP (테마주 헌터)",
    memeText: "매수가: 10만원\n현재가: 3만원\n나: \"곧 오를 거야 😊\"\n3년 후: \"곧 오를 거야 😊\""
  },
  ISTJ: {
    type: "ISTJ",
    title: "안전제일 장기투자자",
    emoji: "🏦",
    subtitle: "\"삼성전자는 망하지 않는다\"",
    description: "당신은 대한민국 국민주 삼성전자, 코스피 ETF, 미국 S&P500 ETF를 묵묵히 적립식으로 매수하는 안정형 투자자입니다. 단기 변동에 흔들리지 않고, 10년, 20년을 바라봅니다. 주변에서 '재미없다'고 해도 '수익률이 재미다'라고 말합니다. 실제로 장기적으로는 대부분의 단타 트레이더보다 수익률이 좋습니다.",
    strengths: ["안정적 수익", "감정 통제", "장기적 관점"],
    weaknesses: ["기회 비용 손실", "단기 급등 종목 놓침", "재미없음"],
    famousQuote: "\"10년 뒤에 보자\"",
    mascot: "bull",
    color: "#6366f1",
    compatibleWith: "ENTP (테마주 헌터)",
    worstMatch: "ESTP (단타의 신)",
    memeText: "친구: \"이 종목 오늘 +30%!\"\n나: \"그래, 나는 ETF 적립식 중\"\n친구: \"재미없다\"\n나: \"10년 후에 보자\""
  },
  ISTP: {
    type: "ISTP",
    title: "차트 분석가",
    emoji: "📈",
    subtitle: "\"차트는 거짓말을 하지 않는다\"",
    description: "당신은 캔들 차트, 이동평균선, RSI, MACD를 보며 매매 타이밍을 잡는 기술적 분석의 달인입니다. 뉴스나 소문보다 차트를 더 신뢰합니다. 혼자 조용히 분석하고, 조용히 매매합니다. 종토방에는 거의 안 가고, 차트 분석 결과만 가끔 공유합니다. 말은 없지만 수익률은 있습니다.",
    strengths: ["객관적 분석", "감정 배제", "독립적 판단"],
    weaknesses: ["펀더멘털 무시", "블랙스완 대응 어려움", "외로운 투자"],
    famousQuote: "\"차트가 다 말해준다\"",
    mascot: "neutral",
    color: "#0ea5e9",
    compatibleWith: "ENFJ (주식 전도사)",
    worstMatch: "ESFJ (종토방 인싸)",
    memeText: "차트: 골든크로스 발생\n나: 매수\n→ 다음날 데드크로스\n나: '차트가 틀릴 리 없는데...'"
  },
  INTJ: {
    type: "INTJ",
    title: "퀀트 투자자",
    emoji: "🔬",
    subtitle: "\"데이터만이 진실이다\"",
    description: "당신은 감정이 아닌 데이터와 알고리즘으로 투자하는 냉철한 분석가입니다. PER, PBR, ROE 같은 지표를 엑셀로 정리하고, 백테스팅을 돌려봅니다. 파이썬으로 자동매매 시스템을 만들려고 시도한 적이 있습니다. 주변에서 '너무 복잡하게 생각한다'고 하지만 당신은 '단순한 게 위험하다'고 생각합니다.",
    strengths: ["체계적 분석", "감정 배제", "장기 전략"],
    weaknesses: ["과도한 분석 마비", "실행력 부족", "시장의 비이성 대응 어려움"],
    famousQuote: "\"시장은 장기적으로 효율적이다\"",
    mascot: "bull",
    color: "#64748b",
    compatibleWith: "ESFJ (종토방 인싸)",
    worstMatch: "ESFP (인플루언서 따라쟁이)",
    memeText: "분석 시간: 3주\n매매 결정: 0.1초\n결과: -5%\n'모델을 수정해야겠군'"
  },
  INTP: {
    type: "INTP",
    title: "경제학 덕후",
    emoji: "📚",
    subtitle: "\"금리가 오르면 채권이 내려가고...\"",
    description: "당신은 주식 투자보다 경제 이론과 거시경제 분석에 더 관심이 많은 학구파 투자자입니다. 워런 버핏 전기를 3번 읽었고, 레이 달리오의 유튜브는 다 봤습니다. 투자 아이디어는 넘치는데 실제 매매는 잘 안 합니다. '아직 더 분석이 필요해'라는 말을 입에 달고 삽니다. 결국 분석하다가 기회를 놓치는 경우가 많습니다.",
    strengths: ["깊은 이해", "이론적 기반", "장기적 통찰"],
    weaknesses: ["분석 마비", "실행력 부족", "타이밍 놓침"],
    famousQuote: "\"좀 더 분석해봐야 알 것 같아\"",
    mascot: "neutral",
    color: "#84cc16",
    compatibleWith: "ESFP (인플루언서 따라쟁이)",
    worstMatch: "ENFJ (주식 전도사)",
    memeText: "분석 시작: 2020년\n'아직 더 봐야 해'\n분석 완료: 2024년\n주가: 이미 10배"
  },
  ISFJ: {
    type: "ISFJ",
    title: "배당 수집가",
    emoji: "💰",
    subtitle: "\"매달 들어오는 배당금이 행복이야\"",
    description: "당신은 화려한 시세차익보다 꾸준한 배당금을 선호하는 안정 지향 투자자입니다. 배당수익률 5% 이상 종목만 매수하고, 배당락일 전후 주가 변동에 일희일비하지 않습니다. 매달 배당금이 들어올 때마다 스크린샷 찍어서 저장합니다. '주식으로 월급 받는 느낌'을 좋아합니다.",
    strengths: ["안정적 현금흐름", "심리적 안정", "장기 보유"],
    weaknesses: ["성장주 기회 놓침", "배당 함정 위험", "낮은 수익률"],
    famousQuote: "\"배당금이 들어왔다 😊\"",
    mascot: "bull",
    color: "#f59e0b",
    compatibleWith: "ENTP (테마주 헌터)",
    worstMatch: "ESTP (단타의 신)",
    memeText: "배당금 입금: 3,500원\n나: 스크린샷 저장 📸\n'이게 진짜 불로소득이지'\n주가 -20%: '배당만 받으면 돼'"
  },
  ISFP: {
    type: "ISFP",
    title: "감성 배당 투자자",
    emoji: "🌸",
    subtitle: "\"내가 좋아하는 회사에 투자한다\"",
    description: "당신은 재무제표보다 '이 회사가 좋은 일을 하는가'를 더 중요하게 생각하는 가치 중심 투자자입니다. 환경, 사회적 가치, 좋아하는 브랜드에 투자합니다. 손실이 나도 '좋은 회사니까 괜찮아'라고 생각합니다. 주식 앱보다 그 회사의 제품을 더 자주 씁니다. ESG 투자의 선구자.",
    strengths: ["신념 있는 투자", "장기 보유", "스트레스 적음"],
    weaknesses: ["수익률 무관심", "감정적 판단", "나쁜 뉴스에 충격"],
    famousQuote: "\"이 회사는 세상을 바꿀 거야\"",
    mascot: "neutral",
    color: "#f472b6",
    compatibleWith: "ENTJ (포트폴리오 CEO)",
    worstMatch: "ESTP (단타의 신)",
    memeText: "나: '이 회사 제품 너무 좋아서 투자함'\n주가: -40%\n나: '그래도 제품은 좋잖아 😊'\n친구: '...' "
  },
  INFJ: {
    type: "INFJ",
    title: "가치투자 철학자",
    emoji: "🧘",
    subtitle: "\"10년 후 이 회사의 모습을 본다\"",
    description: "당신은 워런 버핏과 찰리 멍거를 롤모델로 삼는 진지한 가치투자자입니다. 단기 변동은 노이즈일 뿐이라고 생각하고, 기업의 본질적 가치에 집중합니다. 주식 투자를 '기업의 일부를 소유하는 것'으로 정의합니다. 주변에서 '너무 진지하다'고 하지만 당신은 '투자는 진지해야 한다'고 믿습니다.",
    strengths: ["깊은 통찰", "장기적 관점", "흔들리지 않는 신념"],
    weaknesses: ["단기 기회 놓침", "너무 느린 의사결정", "현실과 괴리"],
    famousQuote: "\"좋은 기업을 적정 가격에 사라\"",
    mascot: "bull",
    color: "#10b981",
    compatibleWith: "ESTP (단타의 신)",
    worstMatch: "ESTP (단타의 신)",
    memeText: "나: '이 주식 5년 뒤를 봐야 해'\n친구: '오늘 +30% 먹었는데?'\n나: '단기 노이즈일 뿐'\n5년 후 내 수익률: -10%"
  },
  INFP: {
    type: "INFP",
    title: "희망회로 투자자",
    emoji: "🌙",
    subtitle: "\"언젠가는 오를 거야... 그렇지?\"",
    description: "당신은 현실보다 희망을 믿는 낭만적 투자자입니다. 물린 종목에 대해 '이건 분명히 반등한다'는 믿음을 버리지 못합니다. 주식 투자 일기를 쓰고, 종목에 이름을 붙여줍니다. '삼성이', '카카오야' 이런 식으로요. 손절은 배신이라고 생각합니다. 하지만 그 믿음 덕분에 가끔 진짜 대박이 나기도 합니다.",
    strengths: ["강한 인내심", "낙관적 마인드", "독특한 종목 발굴"],
    weaknesses: ["손절 불가", "비현실적 기대", "감정적 투자"],
    famousQuote: "\"이 종목이 나를 배신할 리 없어\"",
    mascot: "bear",
    color: "#c084fc",
    compatibleWith: "ESTJ (시스템 트레이더)",
    worstMatch: "ISTP (차트 분석가)",
    memeText: "매수가: 50,000원\n현재가: 8,000원\n나: '곧 오를 거야 🌙'\n종목명: '희망이'\n희망이: -84%"
  }
};

export function calculateMbtiType(scores: Record<MbtiDimension, number>): string {
  const e = scores['E'] > scores['I'] ? 'E' : 'I';
  const s = scores['S'] > scores['N'] ? 'S' : 'N';
  const t = scores['T'] > scores['F'] ? 'T' : 'F';
  const j = scores['J'] > scores['P'] ? 'J' : 'P';
  return `${e}${s}${t}${j}`;
}

export const initialScores: Record<MbtiDimension, number> = {
  E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
};
