$(document).ready(function() {
  showUserStatus();
  showMember();
});

// 가입 대기인 유저 목록 불러오기 
function showUserStatus() {
  const url = new URL(window.location.href)
  const registrationPage = url.searchParams.get('registrationPage') || 1
  $.ajax({
    type: 'GET',
    url: `/users/admin?registrationPage=${registrationPage}`,
    async: false,
    data: {},
    success: function(response) {
      
      const totalCount = response[1];
      showPagination(totalCount, registrationPage, 'registrationPage')
      response = response[0];
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
  const url = new URL(window.location.href)
  const memberPage = url.searchParams.get('memberPage') || 1
  $.ajax({
    type: 'GET',
    url: `/users/admin/member?memberPage=${memberPage}`,
    async: false,
    data: {},
    success: function(response) {
      const totalCount = response[1];
      showPagination(totalCount, memberPage, 'memberPage')
      response = response[0];

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

function showPagination(totalCount, currentPage, pageType) {

  totalCount = Number(totalCount)
  currentPage = Number(currentPage)
  const lastPage = Math.ceil(totalCount / 5)
  const pagesInPageGroup = 5


  // 1~2페이지는 그룹1, 3~4페이지는 그룹2
  const pageGroup = Math.ceil(currentPage / pagesInPageGroup)

  // 페이지 그룹1의 마지막 페이지는 2
  const pageGroupLast =
      pageGroup * pagesInPageGroup > lastPage
          ? lastPage
          : pageGroup * pagesInPageGroup

  // 페이지 그룹1의 첫번째 페이지는 1
  // => 마지막 페이지 숫자(2) - 한 페이지 그룹에 들어가는 페이지 수(2) - 1
  // const pageGroupFirst = pageGroupLast - (pagesInPageGroup - 1) < 1 ? 1 : pageGroupLast - (pagesInPageGroup -1)
  const pageGroupFirst =
      pageGroup === 1 ? 1 : (pageGroup - 1) * pagesInPageGroup + 1

  const pages = []

  // 전 페이지 그룹으로 가기
  if (pageGroup > 1) {
      // 이전 페이지 그룹 - 1 => 이전 페이지 그룹의 마지막 페이지는 (pageGroup-1)*2
      pages.push(
          `<li class="page-item"><a class="page-link" onclick="appendQueryParameter('${pageType}',${
              (pageGroup - 1) * pagesInPageGroup
          })"><<</a></li>`
      )
  }

  // 페이지 그룹의 첫번 째 페이지가 1보다 크면 이전 화살 만들기
  if (currentPage > 1) {
      pages.push(
          `<li class="page-item"><a class="page-link" onclick="appendQueryParameter('${pageType}',${
              currentPage - 1
          })"><</a></li>`
      )
  }

  // 페이지 그룹의 마지막 페이지까지 페이지 숫자 렌더링 하기
  for (i = pageGroupFirst; i <= pageGroupLast; i++) {
      pages.push(
          `<li class="page-item" id="${pageType}${i}"><a class="page-link" onclick="appendQueryParameter('${pageType}',${i})">${i}</a></li>`
      )
  }

  // 페이지 그룹의 마지막 페이지가 총 마지막 페이지보다 작을 때 다음 화살 만들기
  if (currentPage < lastPage) {
      pages.push(
          `<li class="page-item"><a class="page-link" onclick="appendQueryParameter('${pageType}',${
              currentPage + 1
          })">></a></li>`
      )
  }

  // 다음 페이지 그룹으로 가기
  if (pageGroupLast < lastPage) {
      // 다음 페이지 그룹 + 2 => 다음 페이지 그룹의 첫 페이지는 pageGroup * pagesInPageGroup + 1
      pages.push(
          `<li class="page-item"><a class="page-link" onclick="appendQueryParameter('${pageType}',${
              pageGroup * pagesInPageGroup + 1
          })">>></a></li>`
      )
  }
  if (pageType === 'registrationPage') {
    document.getElementById('accessPagination').innerHTML = pages.join('')
  } else if (pageType === 'memberPage') {
    document.getElementById('memberPagination').innerHTML = pages.join('')
  }
  

  $(`#${pageType}${currentPage}`).addClass('active')
}

function appendQueryParameter(query, value){
  let url = new URL(window.location.href)
  url.searchParams.set(query, value)
  window.location.href = url.href
}