document.addEventListener('DOMContentLoaded', async function() 
{
    console.log('Recipe Book website initialized');
    
    try 
    {
        const recipesModule = await import('./recipes.mjs');
        const recipes = recipesModule.default;
        
        const appleCrispRecipe = recipes.find(recipe => recipe.name === 'Apple Crisp') || recipes[0];
        displayRecipe(appleCrispRecipe);
        
        const searchForm = document.querySelector('.search form');
        if (searchForm) 
        {
            searchForm.addEventListener('submit', function(event) 
            {
                event.preventDefault();
                const searchInput = this.querySelector('input').value;
                console.log('Searching for:', searchInput);
                
                if (searchInput.trim() === '') return;
                
                const searchResults = recipesModule.searchRecipes(searchInput);
                if (searchResults.length > 0) 
                {
                    displayRecipe(searchResults[0]);
                    console.log(`Found ${searchResults.length} recipes matching "${searchInput}"`);
                } 
                else 
                {
                    console.log(`No recipes found matching "${searchInput}"`);
                }
            });
        }
    } 
    catch (error) 
    {
        console.error('Error loading recipes:', error);
    }
    
    function displayRecipe(recipe) 
    {
        if (!recipe) return;
      
        const recipeImage = document.querySelector('.recipe-image img');
        if (recipeImage) 
        {
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.name;
        }
      
        const tagsContainer = document.querySelector('.tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            if (recipe.tags && recipe.tags.length > 0) 
            {
                recipe.tags.forEach(tag => 
                {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag.toLowerCase();
                    tagsContainer.appendChild(tagSpan);
                });
            }
        }
      
        const titleElement = document.querySelector('.recipe-title');
        if (titleElement) 
        {
            titleElement.textContent = recipe.name;
        }
      
        const ratingElement = document.querySelector('.rating');
        if (ratingElement) 
        {
            const fullStars = Math.floor(recipe.rating);
            const hasHalfStar = recipe.rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
            let ratingHTML = '';
            let ariaLabel = `Rating: ${recipe.rating} out of 5 stars`;
        
            for (let i = 0; i < fullStars; i++) 
            {
                ratingHTML += '<span aria-hidden="true" class="icon-star">⭐</span>';
            }
        
            if (hasHalfStar) 
            {
                ratingHTML += '<span aria-hidden="true" class="icon-star-half">⭐</span>';
            }
        
            for (let i = 0; i < emptyStars; i++) 
            {
                ratingHTML += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
            }
        
            ratingElement.innerHTML = ratingHTML;
            ratingElement.setAttribute('aria-label', ariaLabel);
        }
      
        const descriptionElement = document.querySelector('.recipe-description');
        if (descriptionElement) 
        {
            descriptionElement.textContent = recipe.description;
        }
    }
  });