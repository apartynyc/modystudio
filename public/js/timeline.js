 // Generate timeline markers
 const timeline = document.querySelector('.timeline');
 const pricingCards = document.querySelectorAll('.pricing-card');
 
 // Create markers
 pricingCards.forEach((card, index) => {
     const position = (index / (pricingCards.length - 1)) * 100;
     
     const marker = document.createElement('div');
     marker.className = 'project-marker';
     marker.style.left = `${position}%`;
     
     const info = document.createElement('div');
     info.className = 'project-info';

     // Get the title, price, and delivery time
     const title = card.querySelector('.pricing-card-title').textContent;
     const price = card.querySelector('.pricing-card-price').textContent;
     let delivery = '';

     // Find the delivery/timeline information
     const features = card.querySelectorAll('.pricing-card-features li');
     features.forEach(feature => {
         if (feature.textContent.includes('Delivery:') || feature.textContent.includes('Timeline:')) {
             delivery = feature.textContent;
         }
     });

     info.textContent = `${title} • ${price} • ${delivery}`;
     
     marker.appendChild(info);
     timeline.appendChild(marker);

     // Link marker to card
     marker.addEventListener('click', () => {
         card.scrollIntoView({ behavior: 'smooth' });
     });
 });