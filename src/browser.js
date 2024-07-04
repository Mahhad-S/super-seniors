document.addEventListener('DOMContentLoaded', function () {
    const categoryToggles = document.querySelectorAll('.category-toggle');
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');

    categoryToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const category = toggle.getAttribute('data-category');
            const targetContainer = document.querySelector(`.article-container.${category}`);
            if (targetContainer) {
                targetContainer.classList.toggle('hidden');
                toggle.textContent = toggle.textContent.includes('▼') ? toggle.textContent.replace('▼', '▶') : toggle.textContent.replace('▶', '▼');
            }
        });
    });

    // Load all articles when the page loads
    loadAllArticles();

    searchButton.addEventListener('click', async function () {
        const query = searchBar.value.trim();
        console.log('Search button clicked. Query:', query);
        if (query) {
            try {
                const response = await fetch(`/searchArticles?title=${encodeURIComponent(query)}`);
                console.log('Search response status:', response.status);
                if (response.ok) {
                    const articles = await response.json();
                    console.log('Search results:', articles);
                    displayArticles(articles);
                } else {
                    console.error('Search request failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            loadAllArticles();
        }
    });

    async function loadAllArticles() {
        try {
            const response = await fetch('/getAllArticles');
            const articles = await response.json();
            displayArticles(articles);
        } catch (error) {
            console.error('Error loading all articles:', error);
        }
    }

    function displayArticles(articles) {
        const containers = {
            general: document.querySelector('.article-container.general'),
            character: document.querySelector('.article-container.character'),
            items: document.querySelector('.article-container.items'),
            locations: document.querySelector('.article-container.locations'),
            organizations: document.querySelector('.article-container.organizations')
        };

        // Clear previous articles
        Object.values(containers).forEach(container => container.innerHTML = '');

        articles.forEach(article => {
            const container = containers[article.category];
            const articleRow = document.createElement('div');
            articleRow.className = 'article';
            articleRow.innerHTML = `
                <div>${article.title}</div>
                <div>
                    <button class="browser-button view-button" data-id="${article._id}" data-category="${article.category}">View</button>
                    <button class="browser-button edit-button" data-id="${article._id}" data-category="${article.category}">Edit</button>
                    <button class="browser-button delete-button" data-id="${article._id}" data-category="${article.category}">Delete</button>
                </div>
            `;
            container.appendChild(articleRow);
        });

        // Attach event listeners to new buttons
        document.querySelectorAll('.view-button').forEach(button => {
            button.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                const category = this.getAttribute('data-category');
                const response = await fetch(`/getArticle/${category}/${id}`);
                const article = await response.json();

                // Clear local storage
                localStorage.clear();

                // Set common article data
                localStorage.setItem('articleTitle', article.title);
                localStorage.setItem('articleBody', article.body);
                localStorage.setItem('articleSttb', article.sttb || '');
                localStorage.setItem('articleSptb', article.sptb || '');
                localStorage.setItem('articleSpbb', article.spbb || '');
                localStorage.setItem('articleSbtb', article.sbtb || '');

                // Set category-specific data and open the article
                localStorage.setItem('articleCategory', category);
                if (category === 'character') {
                    localStorage.setItem('articleCHair', article.cHair || '');
                    localStorage.setItem('articleCSkin', article.cSkin || '');
                    localStorage.setItem('articleCEye', article.cEye || '');
                    localStorage.setItem('articleCHeight', article.cHeight || '');
                    localStorage.setItem('articleCWeight', article.cWeight || '');
                    localStorage.setItem('articleCSex', article.cSex || '');
                    localStorage.setItem('articleCGen', article.cGen || '');
                    localStorage.setItem('articleCRace', article.cRace || '');
                    localStorage.setItem('articleCEth', article.cEth || '');
                    localStorage.setItem('articleCNat', article.cNat || '');
                    localStorage.setItem('articleCAge', article.cAge || '');
                } else if (category === 'items') {
                    localStorage.setItem('articleIPrice', article.iPrice || '');
                    localStorage.setItem('articleIWeight', article.iWeight || '');
                    localStorage.setItem('articleISize', article.iSize || '');
                    localStorage.setItem('articleICDate', article.iCDate || '');
                    localStorage.setItem('articleIDDate', article.iDDate || '');
                    localStorage.setItem('articleIHist', article.iHist || '');
                    localStorage.setItem('articleISimb', article.iSimb || '');
                    localStorage.setItem('articleIInWork', article.iInWork || '');
                } else if (category === 'locations') {
                    localStorage.setItem('articleLPop', article.lPop || '');
                    localStorage.setItem('articleLDen', article.lDen || '');
                    localStorage.setItem('articleLAlt', article.lAlt || '');
                    localStorage.setItem('articleLFDate', article.lFDate || '');
                    localStorage.setItem('articleLDDate', article.lDDate || '');
                    localStorage.setItem('articleLGov', article.lGov || '');
                    localStorage.setItem('articleLHist', article.lHist || '');
                    localStorage.setItem('articleLDemo', article.lDemo || '');
                    localStorage.setItem('articleLDist', article.lDist || '');
                    localStorage.setItem('articleLPOIS', article.lPOIS || '');
                } else if (category === 'organizations') {
                    localStorage.setItem('articleOSlog', article.oSlog || '');
                    localStorage.setItem('articleODen', article.oDen || '');
                    localStorage.setItem('articleOAlt', article.oAlt || '');
                    localStorage.setItem('articleOFDate', article.oFDate || '');
                    localStorage.setItem('articleODDate', article.oDDate || '');
                    localStorage.setItem('articleOStr', article.oStr || '');
                    localStorage.setItem('articleOAgenda', article.oAgenda || '');
                    localStorage.setItem('articleOHist', article.oHist || '');
                    localStorage.setItem('articleODisb', article.oDisb || '');
                }

                window.open('/viewArticle', '_blank');
            });
        });

        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                const category = this.getAttribute('data-category');
                window.location.href = `/${category}-article?id=${id}`;
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                if (this.textContent === 'Confirm Delete') {
                    const id = this.getAttribute('data-id');
                    const category = this.getAttribute('data-category');
                    deleteArticle(id, category);
                } else {
                    this.textContent = 'Confirm Delete';
                    this.classList.add('confirm-delete');
                }
            });
        });               
    }

    async function deleteArticle(id, category) {
        try {
            const response = await fetch(`/deleteArticle/${category}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadAllArticles();
            } else {
                console.error('Delete request failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    }
});