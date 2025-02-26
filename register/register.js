let participantCount = 1;

function participantTemplate(count) 
{
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade${count}" name="grade${count}">
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

function successTemplate(info) 
{
  return `
    <h2>Registration Complete</h2>
    <p>Thank you ${info.name} for registering. You have registered ${info.participants} participant${info.participants > 1 ? 's' : ''} and owe $${info.fees} in Fees.</p>
  `;
}

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
        console.log("Add button found");
        addButton.addEventListener('click', function()
        {
          console.log("Add button clicked");
          participantCount++;
          const newParticipantHTML = participantTemplate(participantCount);
          addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
          console.log(`Added participant ${participantCount}`);
        });
      } else 
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

    console.log("Script loaded successfully");