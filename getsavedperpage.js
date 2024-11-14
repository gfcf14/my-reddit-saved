// HOW TO USE: 
// - Head to https://old.reddit.com/user/gfcf14/saved/ 
// - Open Chrome dev tools
// - Paste the function below on console and press ENTER
// - Copy printed objects in console into a blank file
// - Some posts won't unsave on their own. Find and manually unsave
// - Refresh the page
// - Repeat until no saved posts are left (unless by internal error)
// - Add to a saved-x.json file with less than 1000 lines, from bottom to top, to its top. Create new if it reaches 1000

$('[id^=content_],[id^=thing]').each(function() {
  var ref = $(this).find('a').attr('href');
  if (ref === undefined) ref = $(this).data('permalink');
  if (!ref.includes('https://old.reddit.com/')) ref = 'https://old.reddit.com/' + ref;
	var imgsrc = $(this).find(' a img').attr('src');
  var title = (imgsrc === undefined) ? $(this).find(' p a.title').html() : $(this).find(' div.entry.unvoted div p a').html();
  if (title === undefined) title = $(this).find('p a.title').html();
	
  //var text = (imgsrc === undefined) ? $(this).find(' div.entry.unvoted form div div.md').html() + '\n\t\t' : '';
  var text = /*(imgsrc === undefined) ?*/ $(this).find('div.md').html() + '\n\t\t'/* : ''*/;
	if (text.length <= 12) text = '';
	
  //var cref = (imgsrc === undefined) ? $(this).find('li a.bylink:nth-child(2)').attr('href') : $(this).find(' div.entry.unvoted div ul li a').attr('href');
  //if (cref === undefined) 
  //var co = (imgsrc === undefined) ? 'context' : 'comments';
  var co = ($(this).find('div.md').length !== 0) ? 'context' : 'comments';
  var cref = ref;
  if (co === 'context') cref = $(this).find("a:contains('" + co + "')").attr('href');
	
	if (imgsrc === undefined) $(this).find('div.entry.unvoted ul li.comment-unsave-button.save-button a').click()
	else $(this).find('div.entry.unvoted div ul li.link-unsave-button.save-button a').click();
	
	if (imgsrc === undefined) imgsrc = 'https://www.greendreampg.net/images/reddit-generic.png';
	else imgsrc = 'https:' + imgsrc;
	
  // console.log("<tr>\n\t<td class=\"topped\">\n\t\t<a href=\"" + ref + "\"><img src=\"" + imgsrc + "\"></a>\n\t</td>\n\t<td>\n\t\t<a href=\"" + ref + "\"><div class=\"title\">" + title + "</div></a>\n\t\t<br>\n\t\t" + text + "<a href=\"" + cref + "\"><div class=\"comments\">" + co + "</div></a>\n\t</td>\n</tr>");
  
  const currItem = {
    icon: {
      src: imgsrc,
      url: ref,
    },
    title,
    content: text,
    footer: {
      link: cref,
      type: co == 'comments' ? 'C' : 'X',
    }
  };

  console.log(`${JSON.stringify(currItem)},`);
});
