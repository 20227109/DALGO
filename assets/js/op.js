const arrays = []; // 배열 저장
let updatedArray = null; // 업데이트된 배열 저장
let updateProcess = []; // 갱신 과정 저장

function createArrays() {
    const arrayCount = parseInt(document.getElementById("arrayCount").value);
    const arrayContainer = document.getElementById("arrayContainer");
    arrayContainer.innerHTML = ""; // 이전 내용 삭제
    
    for (let i = 0; i < arrayCount; i++) {
        const arrayDiv = document.createElement("div");
        arrayDiv.className = "array";
        
        const arrayLabel = document.createElement("label");
        arrayLabel.textContent = `${String.fromCharCode(65 + i)}배열`;
        arrayLabel.className = "array-label"; // 라벨에 스타일 추가
        arrayDiv.appendChild(arrayLabel);
        
        const array = [];
        for (let j = 0; j < arrayCount; j++) {
            const input = document.createElement("input");
            input.type = "text"; 
            if (i === j) {
                input.value = "0"; 
            } else {
                input.placeholder = "∞"; 
            }
            array.push(input);
            arrayDiv.appendChild(input);
        }
        
        arrays.push(array);
        arrayContainer.appendChild(arrayDiv);
    }
}

function showSelectedArray() {
    const selectArrayInput = document.getElementById("selectArray");
    const selectedArrayDiv = document.getElementById("selectedArray");
    const routingResultDiv = document.getElementById("routingResult");
    const resultCommentDiv = document.getElementById("resultComment");
    const selectedArrayName = selectArrayInput.value.toUpperCase();
    
    selectedArrayDiv.innerHTML = ""; // 이전 내용 삭제
    routingResultDiv.innerHTML = ""; // 이전 결과 삭제
    resultCommentDiv.innerHTML = ""; // 이전 코멘트 삭제
    
    for (let i = 0; i < arrays.length; i++) {
        if (String.fromCharCode(65 + i) === selectedArrayName) {
            const selectedArray = arrays[i];
            const resultArray = [];
            for (let j = 0; j < selectedArray.length; j++) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = selectedArray[j].value;
                selectedArrayDiv.appendChild(input);
                resultArray.push(input);
            }
            applyRipAlgorithm(selectedArrayName, resultArray, routingResultDiv, resultCommentDiv);
            break;
        }
    }
}

function applyRipAlgorithm(selectedArrayName, selectedArray, resultDiv, commentDiv) {
    const N = selectedArray.length;
    const distances = new Array(N).fill(null).map(() => new Array(N).fill(Infinity));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (i === j) {
                distances[i][j] = 0;
            } else {
                distances[i][j] = parseInt(selectedArray[j].value) || Infinity;
            }
        }
    }

    const updateProcess = []; // 갱신 과정 초기화

    for (let k = 0; k < N; k++) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (distances[i][k] + distances[k][j] < distances[i][j]) {
                    distances[i][j] = distances[i][k] + distances[k][j];
                    updateProcess.push(`${String.fromCharCode(65 + i)}열 -> ${String.fromCharCode(65 + j)}열: ${distances[i][j]}`);
                }
            }
        }
    }

    // 갱신 과정 표시
    for (let i = 0; i < updateProcess.length; i++) {
        const processDiv = document.createElement("div");
        processDiv.className = "comment";
        processDiv.textContent = updateProcess[i];
        commentDiv.appendChild(processDiv);
    }

    // 결과를 resultDiv에 표시
    for (let i = 0; i < N; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "array";
        for (let j = 0; j < N; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.value = distances[i][j] === Infinity ? "∞" : distances[i][j].toString();
            rowDiv.appendChild(input);
        }
        resultDiv.appendChild(rowDiv);
    }

    // 코멘트 표시
    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = `${selectedArrayName}배열의 열의 최단 거리 결과는 다음과 같습니다: ${distances[0].join(', ')}`;
    commentDiv.appendChild(comment);

    // 업데이트된 배열 저장
    updatedArray = selectedArray.slice();
}

// 업데이트된 배열을 표시하는 함수
function showUpdatedArray() {
    const updatedArrayDiv = document.getElementById("updatedArray");
    
    if (updatedArray !== null) {
        updatedArrayDiv.innerHTML = ""; // 이전 내용 삭제

        for (let j = 0; j < updatedArray.length; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.value = updatedArray[j].value;
            const label = document.createElement("label");
            label.textContent = `${String.fromCharCode(65 + j)}열`;
            label.className = "array-label";
            updatedArrayDiv.appendChild(label);
            updatedArrayDiv.appendChild(input);
        }
    }
}


<style>
      .array {
          display: inline-block;
          margin: 30px;
      }
      input {
          width: 60px;
      }
      .label {
            font-size: 12px;
            color: gray;
        }
        .array-container {
            display: flex;
            flex-direction: row;
        }
        .selected-array {
            display: flex;
            flex-direction: row;
        }
  </style>