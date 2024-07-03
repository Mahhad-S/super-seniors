var goveQuill = new Quill('#items_hist', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var goveQuill = new Quill('#simb', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var goveQuill = new Quill('#inWork', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});

document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const category = 'items'; // Or dynamically determine the category based on the page

    if (articleId) {
        try {
            const response = await fetch(`/getArticleDetails/${category}/${articleId}`);
            const article = await response.json();
            
            document.getElementById('title').value = article.title;
            document.querySelector('#editor .ql-editor').innerHTML = article.body;
            document.querySelector('#sttb .ql-editor').innerHTML = article.sttb;
            document.querySelector('#sptb .ql-editor').innerHTML = article.sptb;
            document.querySelector('#spbb .ql-editor').innerHTML = article.spbb;
            document.querySelector('#sbtb .ql-editor').innerHTML = article.sbtb;

            document.getElementById('ch_price_inp').value = article.iPrice;
            document.getElementById('ch_weight_inp').value = article.iWeight;
            document.getElementById('ch_size_inp').value = article.iSize;

            document.getElementById('ch_cDate_inp').value = article.iCDate;
            document.getElementById('ch_dDate_inp').value = article.iDDate;

            document.querySelector('#items_hist .ql-editor').innerHTML = article.iHist;
            document.querySelector('#simb .ql-editor').innerHTML = article.iSimb;
            document.querySelector('#inWork .ql-editor').innerHTML = article.iInWork;

        } catch (error) {
            console.error('Error loading article details:', error);
        }
    }
});

document.getElementById('saveButton').addEventListener('click', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.querySelector('#editor .ql-editor').innerHTML; 
    const sttb = document.querySelector('#sttb .ql-editor').innerHTML; 
    const sptb = document.querySelector('#sptb .ql-editor').innerHTML;
    const spbb = document.querySelector('#spbb .ql-editor').innerHTML;
    const sbtb = document.querySelector('#sbtb .ql-editor').innerHTML;

    const iPrice = document.getElementById('ch_price_inp').value;
    const iWeight = document.getElementById('ch_weight_inp').value;
    const iSize = document.getElementById('ch_size_inp').value;

    const iCDate = document.getElementById('ch_cDate_inp').value;
    const iDDate = document.getElementById('ch_dDate_inp').value;

    const iHist = document.querySelector('#items_hist .ql-editor').innerHTML;
    const iSimb = document.querySelector('#simb .ql-editor').innerHTML;
    const iInWork = document.querySelector('#inWork .ql-editor').innerHTML;

    const data = { title, body, sttb, sptb, spbb, sbtb,
        iPrice, iWeight, iSize, iCDate, iDDate, iHist, iSimb, iInWork
    };
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const category = 'items'; // Or dynamically determine the category based on the page

    try {
        let response;
        if (articleId) {
            // Update existing article
            response = await fetch(`/updateArticle/${category}/${articleId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } else {
            // Create new article
            response = await fetch(`/saveArticleItems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            console.error('Error saving article');
        }
    } catch (error) {
        console.error('Error saving article:', error);
    }
});

function viewArticle() {
    const title = document.getElementById('title').value;
    const body = document.querySelector('#editor .ql-editor').innerHTML;
    const sttb = document.querySelector('#sttb .ql-editor').innerHTML;
    const sptb = document.querySelector('#sptb .ql-editor').innerHTML;
    const spbb = document.querySelector('#spbb .ql-editor').innerHTML;
    const sbtb = document.querySelector('#sbtb .ql-editor').innerHTML;

    localStorage.setItem('articleTitle', title);
    localStorage.setItem('articleBody', body);
    localStorage.setItem('articleSttb', sttb);
    localStorage.setItem('articleSptb', sptb);
    localStorage.setItem('articleSpbb', spbb);
    localStorage.setItem('articleSbtb', sbtb);

    window.open('/viewArticle', '_blank');
}