/* MIT License

Copyright (c) 2017 Keanu Rivaldy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. /*

<script src='https://code.jquery.com/jquery-2.1.4.min.js' type='text/javascript'/>
<script type='text/javascript'>
	//<![CDATA[
	function ScrollTop(){
		$('html, body').animate({scrollTop: '0px'}, 100);
	}

	function initialBack(){
		$(window).on('popstate', function() {
			var link = window.location.href;
			LoadPost(link,false);								
		});	
	}

	function initialLink(){
		$('a.linktoload').click(function(event){
			event.preventDefault();
			var link = $(this).attr('href');
			if (!$(this).hasClass('active')) {
				LoadPost(link,true);
			}
		}); 
	}

	function initialTitle(url,data,status){
		var title= $(data).filter('title').text();
		if (url != window.location && status) {							
			window.history.pushState(data,title,url);
		}
		document.title = title;
	}

	function initialHistory(url){
		if (url != window.location) {							
			window.history.pushState({path: url},'',url);
		}
	}

	function initialLoadMore(data){
		var linkloadmore = $(data).find('#linkloadmore');
		if (linkloadmore.length == 0) {			
			$("#linkloadmore").remove();
		}else if (linkloadmore.length == 1) {	
			var clone = linkloadmore.clone();
			$(".content-wrapper").append(clone);
			LoadMore();
		}
	}

	function LoadMore(){
		$('#linkloadmore').click(function(event){
			event.preventDefault();
			$('#linkloadmore a span').html('Loading...');
			var link = $("#Blog1_pagination-old").attr('href');
			$.get(link,function(data) {
				var source = $(data).find('.content-wrapper').length ? $(data) : $('<div></div>');
				$(".content-wrapper").append(source.find('.content-wrapper').html());
				$("#linkloadmore").html(source.find('#Blog1_pagination-old').clone());
				initialLink();
			}, "html");
		})
	}

	function LoadPost(url, boolean) {
     animationstart();
     initialHistory(url);
     $(".content-wrapper").load(url + ' .content', function(data) {
          var disqus_config = function() {
     this.page.url = '' + url + '';
     this.page.identifier = '' + data + '';
     this.page.title = '' + data + '';
   };
   (function() { // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
     var d = document,
       s = d.createElement('script');
     s.src = '//kang-kelon.disqus.com/embed.js'; // IMPORTANT: Replace EXAMPLE with your forum shortname!
     s.setAttribute('data-timestamp', +new Date());
     (d.head || d.body).appendChild(s);
   })();
       initialLink();
       initialTitle(url, data, boolean);
       initialLoadMore(data);
       ScrollTop();
       animationfinish();
     })
   }

	function animationstart(){
		$('body').fadeOut();	
	}

	function animationfinish(){
		$('body').fadeIn();	
	}

	initialLink();
	initialBack();
	LoadMore();

	// Loader
	$(window).bind("load",function(){$("#loader-wrapper").fadeOut(1e3)});
	//]]>
</script>
