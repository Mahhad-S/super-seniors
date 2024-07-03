var goveQuill = new Quill('#gov', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});

var loc_histQuill = new Quill('#loc_hist', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});

var demoQuill = new Quill('#demo', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});

var distQuill = new Quill('#dist', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});

var poisQuill = new Quill('#pois', {
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
    const category = 'locations'; // Or dynamically determine the category based on the page

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
            
            document.getElementById('ch_pop_inp').value = article.lPop;
            document.getElementById('ch_denonym_inp').value = article.lDen;
            document.getElementById('ch_altName_inp').value = article.lAlt;

            document.getElementById('ch_fDate_inp').value = article.lFDate;
            document.getElementById('ch_dDate_inp').value = article.lDDate;

            document.querySelector('#gov .ql-editor').innerHTML = article.lGov;
            document.querySelector('#loc_hist .ql-editor').innerHTML = article.lHist;
            document.querySelector('#demo .ql-editor').innerHTML = article.lDemo;
            document.querySelector('#dist .ql-editor').innerHTML = article.lDist;
            document.querySelector('#pois .ql-editor').innerHTML = article.lPOIS;
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

    const lPop = document.getElementById('ch_pop_inp').value;
    const lDen = document.getElementById('ch_denonym_inp').value;
    const lAlt = document.getElementById('ch_altName_inp').value;

    const lFDate = document.getElementById('ch_fDate_inp').value;
    const lDDate = document.getElementById('ch_dDate_inp').value;

    const lGov = document.querySelector('#gov .ql-editor').innerHTML;
    const lHist = document.querySelector('#loc_hist .ql-editor').innerHTML;
    const lDemo = document.querySelector('#demo .ql-editor').innerHTML;
    const lDist = document.querySelector('#dist .ql-editor').innerHTML;
    const lPOIS = document.querySelector('#pois .ql-editor').innerHTML;


    const data = { title, body, sttb, sptb, spbb, sbtb,
        lPop, lDen, lAlt, lFDate, lDDate, lGov, lHist, lDemo, lDist, lPOIS
    };
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const category = 'locations'; // Or dynamically determine the category based on the page

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
            response = await fetch(`/saveArticleLoc`, {
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
            alert('Error saving article');
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
    const lPop = document.getElementById('ch_pop_inp').value;
    const lDen = document.getElementById('ch_denonym_inp').value;
    const lAlt = document.getElementById('ch_altName_inp').value;
    const lFDate = document.getElementById('ch_fDate_inp').value;
    const lDDate = document.getElementById('ch_dDate_inp').value;
    const lGov = document.querySelector('#gov .ql-editor').innerHTML;
    const lHist = document.querySelector('#loc_hist .ql-editor').innerHTML;
    const lDemo = document.querySelector('#demo .ql-editor').innerHTML;
    const lDist = document.querySelector('#dist .ql-editor').innerHTML;

    localStorage.setItem('articleCategory', 'locations');
    localStorage.setItem('articleTitle', title);
    localStorage.setItem('articleBody', body);
    localStorage.setItem('articleSttb', sttb);
    localStorage.setItem('articleSptb', sptb);
    localStorage.setItem('articleSpbb', spbb);
    localStorage.setItem('articleSbtb', sbtb);
    localStorage.setItem('articleLPop', lPop);
    localStorage.setItem('articleLDen', lDen);
    localStorage.setItem('articleLAlt', lAlt);
    localStorage.setItem('articleLFDate', lFDate);
    localStorage.setItem('articleLDDate', lDDate);
    localStorage.setItem('articleLGov', lGov);
    localStorage.setItem('articleLHist', lHist);
    localStorage.setItem('articleLDemo', lDemo);
    localStorage.setItem('articleLDist', lDist);

    window.open('/viewArticle', '_blank');
}