$(document).ready(
  function() {
    showMyPage(),
    showMyCat()
  }
)

function showMyPage() {
  $.ajax({
    type: 'GET',
    url: 'users/mypage',
    data: {},
    success: function(response) {
      let tempHtml = `      
      <div class="lineContainer">
        <ul class="line">
          <div class="subLine">
            <li class="miniTitle">이메일</li>
            <input value="${response.email}" class="infoContent" type="text" readonly>
          </div>
          <div class="subLine">
            <li class="miniTitle">이름</li>
            <input value="${response.name}" class="infoContent1" type="text" readonly>
          </div>
          <div class="subLine">
            <li class="miniTitle">주소</li>
            <input value="${response.address}" class="infoContent1" id="address" type="text">
          </div>
        </ul> 
        <ul class="line" id="line3">
          <div class="subLine">
            <li class="miniTitle">닉네임</li>
            <input value="${response.nickname}" class="infoContent1" id="nickname" type="text">
          </div>
          <div class="subLine">
            <li class="miniTitle">전화번호</li>
            <input value="${response.phone_number}" class="infoContent" id="phoneNumber" type="text">
          </div>
        </ul> 
    </div>
    
    <div class="edit">
      <button class="editBtn" onclick= "modifyMyPage(${response.user_id})">수정</button>
      <button class="removeBtn" onclick= "deleteUser(${response.user_id})">회원 탈퇴</button>
    </div>`
    $('.humanInfo').append(tempHtml)
    }
  })
}

function modifyMyPage(id) {
  const nickname = $('#nickname').val();
  const address = $('#address').val();
  const phone_number = $('#phoneNumber').val();
  $.ajax({
    type: 'PATCH',
    url: `users/mypage/${id}`,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    async: false,
    data: JSON.stringify({
      nickname: nickname,
      address: address,
      phone_number: phone_number
    }),
    success: function(response) {
      window.location.reload()
    },
    error: function(response) {
      console.log(response)
    }
  })
}

function deleteUser(id) {
  $.ajax({
    type: 'DELETE',
    url: `users/mypage/${id}`,
    success: function(response) {
      window.location.replace('/')
    }
  })
}


// 고양이 추가
const addCatModal = document.querySelector('.addCatModal');
const addCatModalBody = addCatModal.querySelector('.addCatModalBody')
const catModalOn = document.querySelector('.addCatBtn');

// 열기
catModalOn.addEventListener('click', () => {
  addCatModal.style.display = 'block';
})

// 닫기
addCatModal.addEventListener('click', (e) => {
  if (e.target !== addCatModalBody) addCatModal.style.display = 'none';
});

function addMyCat() {
  const catName = $()
  $.ajax({
    type: 'POST',
    url: '/cats',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    async: false,
    data: JSON.stringify({

    })

  })
}


// 고양이 정보 불러오기

function showMyCat() {
  $.ajax({
    type: 'GET',
    url: '/cats',
    data: {},
    success: function(response) {
      let rows = response
      for (let i = 0; i < rows.length; i++) {
        let catName = rows[i]['name'];
        let catAge = rows[i]['age'];
        let catGender = rows[i]['gender'];
        let catNeutered = rows[i]['neutered'];
// FIXME: 이미지 업로드 완성되면 수정 let catImg = rows[i]['image'];
        let catCharacter = rows[i]['character'];
        let catId = rows[i]['cat_id'];

        let neutered = '';
        let neutered2 = '';
        let neutered3 = true;
        let neutered4 = false;

        if (catNeutered === true) {
          neutered = '유'
          neutered2 = '무'
        }
        if (catNeutered === false) {
          neutered = '무'
          neutered2 = '유'
          neutered3 = false
          neutered4 = true
        }
        let tempHtml = `      
      <div class="lineContainer2">
        <li class="catPageCard">
          <div class="imgContainer3">
            <img src="" alt="">
          </div>
          <label for="catFile">
            <div class="uploaderBtn">사진 선택</div>
          </label>
          <input class="uploader" type="file" id="catFile">
          <div class="infoContainer2">
            <div class="nameContainer2">
              <div class="catInfo2" id="name2">
                이름
              </div>
              <div class="catName2">
                ${catName}
              </div>
            </div>
            <div class="ageContainer2">
              <div class="catInfo2" id="age2">
                나이
              </div>
              <div class="catAge2">
                <input value="${catAge}" class="catContent" id="catAge2">                
              </div>
            </div>
          </div>
          <div class="infoContainer2">
            <div class="nameContainer2">
              <div class="catInfo2" id="name2">
                성별
              </div>
              <div class="genderSelect">
                <div class="genderSelect2">
                  ${catGender}
                </div>
              </div>
            </div>
            <div class="ageContainer3">
              <div class="catInfo3">
                중성화 여부
              </div>
              <div class="neuteredSelect">
                <select class="neuteredSelect2" id="catNeutered" name="neutered">
                  <option value="${neutered3}">${neutered}</option>
                  <option value="${neutered4}">${neutered2}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="characterContainer2">
            <div class="catInfo2" id="character2">
              성격
            </div>
            <div class="catCharacter2">
              <input value="${catCharacter}" class="catContent" id="catCharacter2">              
            </div>
            <div class="edit2">
              <button onclick="modifyMyCat(${catId})" class="editBtn2">수정</button>
              <button onclick="deleteMyCat(${catId})" class="cancleBtn2">삭제</button>
            </div>
          </div>
        </li>
      </div>`
      $('.catInfo1').append(tempHtml)
      }
      
    }
  })
}

function modifyMyCat(id) {
  // const catImg = $('#catFile').val();
  const catAge = $('#catAge2').val();
  let catNeutered = $('#catNeutered').val();
  const catCharacter = $('#catCharacter2').val();
  
  if (catNeutered === 'true') {
    catNeutered = true
  }
  if (catNeutered === 'false') {
    catNeutered = false
  }


  $.ajax({
    type: 'PATCH',
    url: `/cats/${id}`,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    async: false,
    data: JSON.stringify({
      image: '1',
      age: Number(catAge),
      neutered: catNeutered,
      character: catCharacter
    }),
    success: function(response) {
      window.location.reload()
    }
  })  
}

function deleteMyCat(id) {
  $.ajax({
    type: 'DELETE',
    url: `/cats/${id}`,
    success: function(response) {
      window.location.reload()
    }
  })
}