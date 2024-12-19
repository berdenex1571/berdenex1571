const xhr = new XMLHttpRequest();
xhr.open("GET","ikon.xml");
xhr.onload = function(){
    if(xhr.status===200){
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xhr.responseText,"text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        const newsList = document.getElementById("newsList");
        for (let i = 0; i < items.length; i++) {
            const title = items[i].getElementsByTagName("title")[0].textContent;
            const pubdate = items[i].getElementsByTagName("pubDate")[0].textContent;
            const id = new Date(pubdate).getTime();
            console.log(id);
            const newsItem = document.createElement("div");
            newsItem.className = "news-item";
            newsItem.innerHTML = `
            <a href="2doh.html?id=${encodeURIComponent(id)}">
                ${title}
            </a>`;
        newsList.appendChild(newsItem);}
    }else{console.error("RSS tathad aldaa garlaa");}
};
xhr.onerror = function() {
    console.error("Сервертэй холбогдох боломжгүй байна.");
};
xhr.send();