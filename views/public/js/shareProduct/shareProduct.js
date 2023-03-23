console.log(user);
console.log(user.id);
function loadCategories() {
  $.ajax({
    url: '/productsCategory',
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

  $('#productForm').on('submit', async function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    const categoryId = $('#categorySelect').val();
    const latitude = formData.get('latitude');
    const longitude = formData.get('longitude');

    if (!latitude || !longitude || !categoryId) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    formData.delete('latitude');
    formData.delete('longitude');

    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    if (categoryId) {
      formData.append('productsCategoryId', categoryId);
    }

    // 로그인한 사용자의 ID를 추가합니다.
    formData.append('userId', userId);
    console.log(userId);
    const productsTradeLocation = {
      latitude,
      longitude,
    };
    formData.append(
      'productsTradeLocation',
      JSON.stringify(productsTradeLocation)
    );

    // 상품 생성 요청을 보냅니다.
    $.ajax({
      url: '/products/create',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert('상품이 등록되었습니다!');
        window.location.href = '/shareList';
      },
      error: function (error) {
        alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
      },
    });
  });
});

function previewImage() {
  const input = document.getElementById('imageInput');
  const preview = document.getElementById('imagePreview');

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = this.result;
        preview.style.display = 'block'; // 미리보기 이미지를 표시합니다.
      });
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
      preview.style.display = 'none'; // 이미지가 선택되지 않았을 때 미리보기를 숨깁니다.
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  previewImage();
});
