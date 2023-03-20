$(document).ready(function () {
  // API 엔드포인트에서 카테고리 정보를 가져옵니다.
  $.ajax({
    url: '/productsCategory',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      // 가져온 카테고리를 동적으로 목록에 추가합니다.
      const categoryMenu = $('#categoryMenu');
      data.categories.forEach(function (category) {
        const menuItem = $('<a>')
          .attr('href', '/category/' + category.id)
          .addClass('dropdown-item')
          .text(category.name);
        categoryMenu.append(menuItem);
      });
    },
    error: function (xhr, status, error) {
      console.error('카테고리를 불러오는 데 실패했습니다:', error);
    },
  });
});
