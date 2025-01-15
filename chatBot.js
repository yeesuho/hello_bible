const initialPrompt = "성경에 대한 정확한 답변을 해줘. 이전 대화 내용과 관련지어 대화해줘. 넌 항상 존댓말을 해. 너의 이름은 바이블이야. 넌 친절한 조언자야. 말끝마다 친절한 이모티콘을 사용해줘.";
/*  사용자가 질문하면 성경에 관련된 내용을 바탕으로 대답해 줘." */
// 채팅 메시지를 표시할 DOM
const chatMessages = document.querySelector('#chat-messages');
// 사용자 입력 필드
const userInput = document.querySelector('#user-input input');
// 전송 버튼
const sendButton = document.querySelector('#user-input button');
// 발급받은 OpenAI API 키를 변수로 저장
/* const apiKey = 'api-key'; // 여기에 API 키를 입력하세요 */
// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

function addMessage(sender, message) {
    // 새로운 div 생성
    const messageElement = document.createElement('div');
    // 생성된 요소에 클래스 추가
    messageElement.className = sender === '' ? 'message' : 'bot-message';
    // 채팅 메시지 목록에 새로운 메시지 추가
    messageElement.textContent = `${sender} ${message}`;
    chatMessages.appendChild(messageElement);
    // 자동으로 스크롤을 아래로 내리기
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
// ChatGPT API 요청
async function fetchAIResponse(prompt) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [
                {    role: "system", content: initialPrompt }, // 시스템 메시지로 초기 프롬프트 설정
                { role: "user", content: prompt}  // 사용자의 입력 메시지
             ],
            temperature: 0.8, // 모델의 출력 다양성
            max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
            top_p: 1, // 토큰 샘플링 확률을 설정
            frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
            stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
        }),
    };
    // API 요청후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
		console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}
// 전송 버튼 클릭 이벤트 처리
sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message.length === 0) return;
    addMessage('', message);
    userInput.value = '';
    const aiResponse = await fetchAIResponse(message);
    addMessage('바이블: ', aiResponse);
});

// 사용자 입력 필드에서 Enter 키 이벤트를 처리
let isProcessing = false; // 메시지 처리 중 여부

userInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // 기본 동작 방지

        if (isProcessing) return; // 이미 처리 중이면 함수 종료
        isProcessing = true; // 처리 시작

        const message = userInput.value.trim();
        if (message.length === 0) {
            isProcessing = false; // 처리 종료
            return;
        }

        
        const aiResponse = await fetchAIResponse(message); // AI 응답 요청
        addMessage('', message); // 메시지 추가
        userInput.value = null; // 입력 필드 비우기
        addMessage('바이블: ', aiResponse); // AI 응답 추가
        
        // 마지막 메시지를 중복 전송하지 않도록 처리

        isProcessing = false; // 처리 종료
    }
});