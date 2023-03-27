$(document).ready(function() {
  showUserStatus();
  showMember();
});

// 가입 대기인 유저 목록 불러오기 
function showUserStatus() {
  $.ajax({
    type: 'GET',
    url: '/users/admin',
    async: false,
    data: {},
    success: function(response) {
      for( let i = 0; i < response.length; i++) {
        let userId = response[i].user_id;
        let status = response[i].status;
        let catList = "";
        for (let j = 0; j < response[i].cats.length; j++) {
          catList += response[i].cats[j].name + ", ";
        }
        catList = catList.slice(0, -2);
        catList = catList ? catList : "No cats";
        let nickname = response[i].nickname;

        let tempHtml = `
        <div class="statusTable">
          <table class="statusView">
            <tr class="statusTableOutline">
              <th class="blank"></th><td class="statusBlock">${status}</td>
              <td class="catNameBlock">반려묘:${catList}</td>         
              <td class="nickBlock">${nickname}</td>
              <td class="editStatusBlock">
                <select name="userStatus" id="userStatus${userId}">
                  <option value="일반">일반</option>
                  <option value="관리자">관리자</option>
                </select>
                <button class="editStatusBtn" onclick="modifyUserStatus(${userId})">수정</button>
              </td>
              <td class="btnBlock">
                    <button class="deleteMemBtn" onclick="deleteAllUser(${userId})">삭제</button>
                  </td>
            </tr>
          </table>
        </div>`
        $('.accessContent').append(tempHtml);
      }
    },
  });
}

// 대기 상태 변경
function modifyUserStatus(id) {
  let status = $(`#userStatus${id}`).val();

  $.ajax({
    type: 'PATCH',
    url: `/users/admin/${id}`,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    async: false,
    data: JSON.stringify({
      status: status
    }),
    success: function(response) {
      alert('수정 완료')
      window.location.reload()
    },
    error: function(response) {
      console.log('error:', response);
    }
  })
}

// 일반 회원 리스트
function showMember() {
  $.ajax({
    type: 'GET',
    url: '/users/admin/member',
    async: false,
    data: {},
    success: function(response) {
      console.log(response)
      for(let i = 0; i < response.length; i++) {
        let userId = response[i].user_id;
        let status = response[i].status;
        let userEmail = response[i].email;
        let userName = response[i].name;
        let userNickname = response[i].nickname;
        let createdAt = response[i].created_at.split('T')[0];

        let tempHtml = `
            <div class="userTable">
              <table class="memberView">
                <tr>
                  <th class="blank"></th><td class="memberBlock">${status}</td>
                  <td class="memberInfo1">이메일:${userEmail}</td>
                  <td class="memberInfo2">이름:${userName}</td>
                  <td class="memberInfo4">${userNickname}</td>
                  <td class="joinDate">
                    가입 날짜:${createdAt}
                  </td>
                  <td class="btnBlock">
                    <button class="deleteMemBtn" onclick="deleteAllUser(${userId})">삭제</button>
                  </td>
                </tr>
              </table>
            </div>`
        $('.memberContent').append(tempHtml);
      } 
    }
  });
}

// 회원 삭제 
function deleteAllUser(id) {

  $.ajax({
    type: 'DELETE',
    url: `/users/admin/member/${id}`,
    success: function(response) {
      alert('삭제 완료')
      window.location.reload()
    },
    error: function(response) {
      console.log('error:', response);
    }
  })
}