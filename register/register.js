import { participantTemplate, successTemplate } from './Templates.js';

let participantCount = 1;

function totalFees() 
{
  const feeElements = [...document.querySelectorAll("[id^=fee]")];
  let total = 0;
  for (const element of feeElements) 
  {
    total += Number(element.value) || 0;
  }
  
  return total;
}

document.addEventListener('DOMContentLoaded', function() 
{
  console.log("DOM fully loaded");
  const addButton = document.getElementById('add');
  const form = document.querySelector('form');
  const summarySection = document.getElementById('summary');

  if (addButton) 
  {
    addButton.addEventListener('click', function() 
    {
      participantCount++;
      const newParticipantHTML = participantTemplate(participantCount);
      addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
    });
  } 
  else 
  {
    console.error("Could not find add button element!");
  }

  if (form) 
  {
    form.addEventListener('submit', function(event) 
    {
      event.preventDefault();
      const adultName = document.getElementById('adult_name').value;
      const fees = totalFees();
      const info = 
      {
        name: adultName || "Customer",
        participants: participantCount,
        fees: fees
      };
      form.style.display = 'none';
      summarySection.innerHTML = successTemplate(info);
      summarySection.style.display = 'block';
    });
  } 
  else 
  {
    console.error("Could not find form element!");
  }
});