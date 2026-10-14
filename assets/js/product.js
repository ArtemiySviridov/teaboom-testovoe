'use strict';

(() => {
  const variants = [
    { weight: 100, sku: '01306', oldPrice: 349.2, price: 326.4 },
    { weight: 500, sku: '01307', oldPrice: 1646, price: 1432 },
    { weight: 1000, sku: '01308', oldPrice: 2592, price: 2064 },
    { weight: 5000, sku: '01309', oldPrice: 8710, price: 6320 },
  ];
  const packaging = document.querySelector('#packaging');
  if (!packaging) return;

  const sku = document.querySelector('#product-sku');
  const oldPrice = document.querySelector('#old-price');
  const currentPrice = document.querySelector('#current-price');

  const formatPrice = (value) =>
    new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);

  function renderVariant(variant) {
    sku.textContent = variant.sku;
    oldPrice.textContent = formatPrice(variant.oldPrice);
    currentPrice.textContent = formatPrice(variant.price);
  }

  packaging.addEventListener('change', (event) => {
    const variant = variants.find(
      (item) => String(item.weight) === event.target.value,
    );
    if (variant) renderVariant(variant);
  });

  const restoredWeight = packaging.querySelector('input:checked').value;
  renderVariant(
    variants.find((item) => String(item.weight) === restoredWeight) ||
      variants[0],
  );
  packaging.disabled = false;
})();
