const moment = require('moment/min/moment-with-locales.min');

const url = process.env.NODE_ENV === 'production' ? process.env.MAIL_URL_PROD : process.env.MAIL_URL_DEV;

const orderConfirmation = (order, isPaid) => {
  const {
    orderItems,
    orderNumber,
    purchaseDate,
    recipient,
    payment,
    delivery,
    deliveryPayment,
  } = order;

  const getDeliveryText = (
    delivery === 'courier' ? `
      <h3 style="margin-bottom: 8px">Доставка:</h3>
      <div>
        Кур&rsquo;єром: <strong>${deliveryPayment}грн.</strong>  
      </div>
      <div>
        Адреса:
        <strong> 
          м.${recipient.city},
          вул.${recipient.street},
          дім.${recipient.house},
          кв.${recipient.apartment}.
        </strong>  
      </div>  
    ` : '');

  const recipientText = `
      <h3 style="margin-bottom: 8px">Дані одержувача:</h3>
      <div>
        Повне ім&rsquo;я: <strong>${recipient.fullName}</strong>;
      </div> 
      <div>
        Телефон: <strong>${recipient.phone}</strong>.
      </div>
    `;

  const itemsText = orderItems.map((el, ind) => `
    <div style="text-align: left">
      <span>
        <strong>${ind + 1}. ${el.name}</strong>  -  
        код товару: <strong>${el.code}</strong>, 
        кількість: <strong>${el.count}шт.</strong>, 
        ціна за одиницю товару: <strong>${el.price}грн.</strong>; 
      </span>
    </div>`).join('');

  const getIsPaidText = (
    isPaid ? `
    <div>
      <span>Підтвердження оплати:</span>
      <strong>підтверджено.</strong>
    </div>
    ` : ''
  );

  return `
    <div style="font-size: 18px">
      <a href="${url}" style="text-align: center">
        <h2>CoffeeVarka</h2>
      </a>
      <div>
        <h3 style="margin-bottom: 8px">Замовлення:</h3>
        <span>Номер:</span>
        <strong>${orderNumber}</strong>;
      </div>
      <div>
        <span>Дата:</span>
        <strong>${moment(purchaseDate).locale('uk').format('D MMMM YYYYр. HH:mm')}</strong>;
      </div>
      <div>
        <span>Загальна сума:</span>
        <strong>${payment}грн.</strong>
      </div>
      ${getIsPaidText}
      <h3 style="margin-bottom: 8px">Перелік замовлених товарів:</h3>
      ${itemsText}
      ${recipientText}
      ${getDeliveryText}
      <div style="font-size: 16px;
                  width: 300px;
                  margin-top: 24px">
        <div>Якщо у вас виникли питання щодо оформлення замовлення, дзвоніть нам за наступними номерами телефонів:</div>
        <div style="margin-top: 8px">
          <strong>+38(067)1234567</strong>
        </div>
        <div>
          <strong>+38(063)1234567</strong>
        </div>
      </div>
    </div>`;
};

const userRegistration = (protocol, host, token) => `
  <div style="font-size: 16px; margin-top: 24px;">
    Перейдіть за          
    <a href="${protocol}://${host}/api/users/confirm?token=${token}">
       цим посиланням
    </a>
    для підтвердження електронної пошти.
  </div>
`;

module.exports = {
  orderConfirmation,
  userRegistration,
};
