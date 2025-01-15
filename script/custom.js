// //Navigation all
// // $('.menu li').mouseenter(function(){
// //     $('.sub-menu').stop().slideDown()
// // })
// // $('.menu li').mouseleave(function(){
// //     $('.sub-menu').stop().slideUp()
// // })


// //Navigation 1
// $('.menu li').mouseenter(function(){
//     $(this).children('.sub-menu').stop().slideDown()
// })
// $('.menu li').mouseleave(function(){
//     $(this).children('.sub-menu').stop().slideUp()
// })


// //Tab Menu
// $('.btn a:first-child').click(function(){
//     $('.tab1').show()
//     $('.tab2').hide()
//     $(this).addClass('active')
//     $(this).siblings().removeClass('active')
// })
// $('.btn a:last-child').click(function(){
//     $('.tab2').show()
//     $('.tab1').hide()
//     $(this).addClass('active')
//     $(this).siblings().removeClass('active')
// })

// //Modal
// $('.open-modal').click(function(){
//     $('.modal').fadeIn();  
// })
// $('.close-modal').click(function(){
//     $('.modal').fadeOut();  
// // })
// var flipbookEL = document.getElementById('flipbook');

// window.addEventListener('resize', function (e) {
// 	flipbookEL.style.width = '';
//   flipbookEL.style.height = '';
//   $(flipbookEL).turn('size', flipbookEL.clientWidth, flipbookEL.clientHeight);
// });

// $(flipbookEL).turn({
//     autoCenter: true
// });
$(document).ready(function() {
    console.log("문서가 준비되었습니다.");
    $(".book").turn({
        width: 400,
        height: 300,
        autoCenter: true
    });
});
    $('#book').turn({
        when: {
            turning: function(event, page) {
                $(this).find('.turn-page').css('transform', 'rotateY(-10deg)'); // 각도 조정
            },
            turned: function(event, page) {
                $(this).find('.turn-page').css('transform', 'rotateY(0deg)'); // 원래 위치로 복귀
            }
        }
    });

    