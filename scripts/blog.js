

function page_exists(url, callback) { /// check existance of page
    let urll = url + ".html";
    $.ajax({
        url: urll,
        type: "HEAD",
        success: function(){ callback(true, url); },
        error: function(){ callback(false, url); }
    });
}


function update_links($) { /// next/previous links

    // initialize variables
    var url_arr = window.location.href.replace(".html", "").split('/'),
        cur_page_num = parseInt(url_arr[url_arr.length - 1]),
        url_root = window.location.href.replace(cur_page_num + ".html", ""),
        nxt_page = new String(cur_page_num + 1);

    var bck_link, nxt_link = false;

    // next check
    page_exists(nxt_page, function(exists, url) {
        if (exists) {
            nxt_link = nxt_page;
            let load_holder = $('<div>Failed to load content</div>');

            load_holder.load(nxt_link + '.html .page-title', function() {
                $("#link-next").prop("href", nxt_link).html('<h2>' + $("#link-next>h2").text() + ': <a id="prev-title">' + $(load_holder).text() + '</a></h2>');
                $("#link-next").removeClass("invisible");
            });

        } else {
            $("#link-next").remove();
        }
    });

    // prev check
    if (cur_page_num > 1) {
        bck_link = new String(cur_page_num - 1);
    } else bck_link = false;

    // Apply baxk link
    if (bck_link !== false) {
        let load_holder = $('<div>Failed to load content</div>');

        load_holder.load(bck_link + '.html .page-title', function() {
            $("#link-prev").prop("href", bck_link).html('<h2>' + $("#link-prev>h2").text() + ': <a id="next-title">' + $(load_holder).text() + '</a></h2>');
            $("#link-prev").removeClass("invisible");
        });
    } else {
        $("#link-prev").remove();
    }
}


function include_links($, page_count) { /// Create divs with content from subpages
    var i = 1;

    while (i <= page_count) {
        page_exists(i++, function(exists, url) {
            if (exists) {
                let page = url + ".html";

                /*$.ajax({
                let page_title = $().text();
                   url:href,
                   type:'GET',
                   success: function(data){
                       $('.page-title').html($(data).find('.page-title').html());
                   }
               });*/

               let load_holder = $('<div>Failed to load content</div>');

               load_holder.load(page + ' .page-title', function() {
                   /*window.alert("here");
                   $('.page-title').load_holder.find('.page-title').html());*/
                   $("#blog-content").append( '<a class="link" id="post-' + url + '" href="' + url + '"><p> post ' + url + ': ' + $(load_holder).text() + '</p></a>');
               });
           }
        });
    }
}
