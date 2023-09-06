$(document).ready(function() {
    let nums = [7,8,9,4,5,6,1,2,3]
    for (i in nums) {
        $("#calcNums").append(`<p class="nums">${nums[i]}</p>`)
    }

    $(".nums").hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    })
});