function loadCategories() {
  $.ajax({
    url: '/productsCategory', // Replace with your API endpoint
    type: 'GET',
    success: function (categories) {
      const categorySelect = $('#categorySelect');
      categories.forEach((category) => {
        categorySelect.append(
          `<option value="${category.id}">${category.name}</option>`
        );
      });
    },
    error: function (error) {
      console.error('Failed to load categories:', error);
    },
  });
}

$(document).ready(function () {
  loadCategories();

  $('#productForm').on('submit', function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    const categoryId = $('#categorySelect').val();
    const city = formData.get('city');
    const cityDetail = formData.get('cityDetail');

    formData.delete('city');
    formData.delete('cityDetail');

    formData.append(
      'productsTradeLocation',
      JSON.stringify({ city, cityDetail })
    );

    if (categoryId) {
      formData.append('productsCategoryId', categoryId);
    }

    $.ajax({
      url: '/products/create',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert('상품이 등록되었습니다!');
        window.location.href = '/shareProduct';
      },
      error: function (error) {
        alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  });
});
