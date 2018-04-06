$(document).ready(() => {
  $('.category-delete').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-cat-id');
    
    $.ajax({
      type: 'DELETE',
      url: '/categories/delete/'+id,
      success: (response) => {
        // window.location.href='/';
      },
      error: (error) => {
        alert('ewew');
        console.log(error);
      }
    });
  });

  $('.article-delete').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-article-id');
    
    $.ajax({
      type: 'DELETE',
      url: '/articles/delete/'+id,
      success: (response) => {
        // window.location.href='/';
      },
      error: (error) => {
        alert('ewew');
        console.log(error);
      }
    });
  });
});