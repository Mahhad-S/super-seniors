var editorQuill = new Quill('#editor', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
      },
    theme: 'snow'
});

var sttbQuill = new Quill('#sttb', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
      },
    theme: 'snow'
});

var sptbQuill = new Quill('#sptb', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
      },
    theme: 'snow'
});

var spbbQuill = new Quill('#spbb', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
      },
    theme: 'snow'
});

var sbtbQuill = new Quill('#sbtb', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
      },
    theme: 'snow'
});

var org_histQuill = new Quill('#orgStr', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var org_histQuill = new Quill('#pubAgenda', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var org_histQuill = new Quill('#org_hist', {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', ],
            [{ list: 'ordered' }, { list: 'bullet' }, 'link',],
        ],
    },
    theme: 'snow'
});
var org_histQuill = new Quill('#disb', {
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
    const category = 'organizations'; // Or dynamically determine the category based on the page

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

            document.getElementById('ch_slogan_inp').value = article.oSlog;
            document.getElementById('ch_denonym_inp').value = article.oDen;
            document.getElementById('ch_altName_inp').value = article.oAlt;

            document.getElementById('ch_fDate_inp').value = article.oFDate;
            document.getElementById('ch_dDate_inp').value = article.oDDate;

            document.querySelector('#orgStr .ql-editor').innerHTML = article.oStr;
            document.querySelector('#pubAgenda .ql-editor').innerHTML = article.oAgenda;
            document.querySelector('#org_hist .ql-editor').innerHTML = article.oHist;
            document.querySelector('#disb .ql-editor').innerHTML = article.oDisb;

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

    const oSlog = document.getElementById('ch_slogan_inp').value;
    const oDen = document.getElementById('ch_denonym_inp').value;
    const oAlt = document.getElementById('ch_altName_inp').value;

    const oFDate = document.getElementById('ch_fDate_inp').value;
    const oDDate = document.getElementById('ch_dDate_inp').value;

    const oStr = document.querySelector('#orgStr .ql-editor').innerHTML;
    const oAgenda = document.querySelector('#pubAgenda .ql-editor').innerHTML;
    const oHist = document.querySelector('#org_hist .ql-editor').innerHTML;
    const oDisb = document.querySelector('#disb .ql-editor').innerHTML;

    const data = { title, body, sttb, sptb, spbb, sbtb, 
        oSlog, oDen, oAlt, oFDate, oDDate, oStr, oAgenda, oHist, oDisb
    };
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const category = 'organizations'; // Or dynamically determine the category based on the page

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
            response = await fetch(`/saveArticleOrg`, {
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