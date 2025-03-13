document.addEventListener('DOMContentLoaded', async function() 
{
    console.log('Recipe Book website initialized');
    
    try 
    {
        const recipesModule = await import('./recipes.mjs');
        const recipes = recipesModule.default;
        
        // const appleCrispRecipe = recipes.find(recipe => recipe.name === 'Apple Crisp') || recipes[0];
        // displayRecipe(appleCrispRecipe);

        function random(num) 
        {
            return Math.floor(Math.random() * num);
        }

        function RandomListEntry(list) 
        {
            const listLength = list.length;
            const randNum = random(listLength);
            return list[randNum];
        }

        function tagsTemplate(tags) 
        {
            if (!tags || tags.length === 0) return '';
            
            let html = '';
            tags.forEach(tag => {
                html += `<span class="tag">${tag.toLowerCase()}</span>`;
            });
            
            return html;
        }

        function ratingTemplate(rating) 
        {
            let html = `<span
                class="rating"
                role="img"
                aria-label="Rating: ${rating} out of 5 stars"
            >`;
            
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            
            for (let i = 0; i < fullStars; i++) {
                html += '<span aria-hidden="true" class="icon-star">⭐</span>';
            }
            
            if (hasHalfStar) {
                html += '<span aria-hidden="true" class="icon-star-half">⭐</span>';
            }
            
            for (let i = 0; i < emptyStars; i++) {
                html += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
            }
            
            html += '</span>';
            return html;
        }

        function recipeTemplate(recipe) 
        {
            return `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <div class="recipe-content">
                <div class="tags">
                    ${tagsTemplate(recipe.tags)}
                </div>
                <h2 class="recipe-title">${recipe.name}</h2>
                ${ratingTemplate(recipe.rating)}
                <p class="recipe-description">
                    ${recipe.description}
                </p>
            </div>`;
        }
        
        function renderRecipes(recipeList) 
        {
            const recipeContainer = document.querySelector('.recipe');
            if (!recipeContainer) return;
            
            recipeContainer.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
        }

        function init() 
        {
            const recipe = RandomListEntry(recipes);
            renderRecipes([recipe]);
            const searchForm = document.querySelector('.search form');
            if (searchForm) 
            {
                searchForm.addEventListener('submit', searchRecipes);
            }
        }

        init();

        function filterRecipes(input) 
        {
            if (!input) return [];
            
            const searchTerm = input.toLowerCase();
            const filtered = recipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm) ||
                recipe.description.toLowerCase().includes(searchTerm) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                (recipe.recipeIngredient && recipe.recipeIngredient.some(ingredient => 
                    ingredient.toLowerCase().includes(searchTerm)
                ))
            );
            return filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        function searchRecipes(c) 
        {
            c.preventDefault();
            const searchInput = document.querySelector('.search input');
            if (!searchInput) return;
            
            const input = searchInput.value.trim().toLowerCase();
            if (input === '') return;
            
            const searchResults = filterRecipes(input);
            if (searchResults.length > 0) {
                renderRecipes(searchResults);
                console.log(`Found ${searchResults.length} recipes matching "${input}"`);
            } else {
                console.log(`No recipes found matching "${input}"`);
            }
        }
        
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
});