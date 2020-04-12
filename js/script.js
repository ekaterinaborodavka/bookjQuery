'use strict';

let addBook = $('.add_book'),
    cancel = $('.cancel'),
    save = $('.save'),
    book = $('#title_book'),
    author = $('#title_author'),
    friend = $('#title_friend'),
    until = $('#datepicker'),
    bookList = $('.book_list'),
    totalBook = $('.total_book'),
    parentLi,
    parentLiId;

    $(addBook.on('click', showModal));
    $(cancel.on('click', cancelModal));
    $(save.on('click', saveBook));

    $('#datepicker').datepicker({
        dateFormat:'d.mm.yy',
        minDate: 0
    });

function showModal (){
    $('.modal').attr('class', 'active'),
    $('.filter').attr('class', 'active_filter');
}

function cancelModal (){
    $('.active').attr('class', 'modal'),
    $('.active_filter').attr('class', 'filter');
    reset ();
    parentLi = 'n';
}

function reset (){
    book.val(''),
    author.val(''),
    friend.val(''),
    until.val(''),
    $('#title_checkbox').prop('checked',false);
}

class Books{
    constructor(book,author,friend, until){
        this.book = book;
        this.author = author;
        this.friend = friend;
        this.until = until;
    }
}
Books.order=1;
Books.listId=1;

function saveBook(){
    let newBook = new Books (book.val(), author.val(), friend.val() , until.val());

    if(book.val()&&author.val()&&friend.val()&&until.val()&&!$('#title_checkbox').prop('checked')&&!$(parentLi).hasClass('edit')){
            addNewBook(newBook);
            cancelModal ();
    }else if($('#title_checkbox').prop('checked')){
            Books.order--;
            deleteBook(parentLiId);
    }else if(parentLi){        
            $(parentLi).find('.book_title .book_name').html(newBook.book),
            $(parentLi).find('.book_title .book_author').html('from ' + newBook.author),
            $(parentLi).find('.book_info .book_friend').html(newBook.friend),
            $(parentLi).find('.book_info .book_until').html(new Date().toLocaleDateString() + ' - ' +newBook.until);
           
            $(parentLi).removeClass('edit');
            parentLiId = 'n';
            parentLi = 'n';
            
            cancelModal ();
       }else{
            cancelModal ();
       }
}

function addNewBook(newBook){
        totalBook.html('You have lent '+ Books.order +' books to friends');
        $('.total_lent').html('Lent to:');
    
        $('<li>', {class: 'book_item', id:'list_id'+Books.listId++}).appendTo(bookList);
        $('<div>', {class: 'number'}).html(Books.order++).appendTo('.book_item:last');
        $('<div>', {class: 'book_title'}).appendTo('.book_item:last');
        $('<div>', {class: 'book_name'}).html(newBook.book).appendTo('.book_title:last');
        $('<div>', {class: 'book_author'}).html('from ' + newBook.author).appendTo('.book_title:last');
        $('<div>', {class: 'book_info'}).appendTo('.book_item:last');
        $('<div>', {class: 'book_friend'}).html(newBook.friend).appendTo('.book_info:last');
        $('<div>', {class: 'book_until'}).html(new Date().toLocaleDateString() + ' - ' +newBook.until).appendTo('.book_info:last');
        $('<button>', {class: 'book_button', type: 'button'}).appendTo('.book_item:last');
        $('<img>', {class: 'button_img', src: 'img/menu.png'}).appendTo('.book_button:last');
        $('.book_button').on('click', showChangeModal);

        reset ();
}

function showChangeModal(){
        parentLi = this.parentNode;

        $('.checkbox').attr('id', 'active_checkbox');

        parentLiId = $(parentLi).attr('id');
        $(parentLi).addClass('edit');

        book.val($(parentLi).find('.book_title .book_name').text());
        author.val($(parentLi).find('.book_title .book_author').text().slice(5,));
        friend.val($(parentLi).find('.book_info .book_friend').text());
        until.val($(parentLi).find('.book_info .book_until').text().slice(13,))

        showModal ();
}

function deleteBook(value){
        $('#'+value).remove();
        $('.checkbox').removeAttr('id');
    
    let num = $('.number'),
        changeNum = 1;
    for(let i=0; i<num.length; i++){
        $(num[i]).html(changeNum);
        changeNum++;
        totalBook.html('You have lent '+ num[num.length-1].textContent +' books to friends');
    }
    cancelModal ();
}
