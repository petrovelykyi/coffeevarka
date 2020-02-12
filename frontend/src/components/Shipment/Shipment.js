import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from 'mdbreact';

import shipment from '../../images/shipment/shipment.png';
import courier from '../../images/shipment/courier.jpg';
import ukrposhta from '../../images/shipment/ukrposhta.jpg';
import novaposhta from '../../images/shipment/novaposhta.jpg';
import cash from '../../images/shipment/cash.jpg';
import cashless from '../../images/shipment/cashless.jpg';
import privat from '../../images/shipment/privat.png';
import visa from '../../images/shipment/Visa.jpg';
import mastercard from '../../images/shipment/MasterCard.png';
import liqpay from '../../images/shipment/liqpay.png';
import kit from '../../images/shipment/kit.jpg';
import warranty from '../../images/shipment/warranty.png';

import './Shipment.scss';

const Shipment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shipmentArticlesArray = [
    {
      id: 1,
      img: courier,
      title: 'Кур\'єром',
      text: 'Доставка за адресою здійснюється після надходження готівки на рахунок або ж після '
        + 'того, як кур\'єр доставить та продемонструє клієнту якість та відповідність товарів. '
        + 'За доставку знімається відповідна плата.',
    },
    {
      id: 2,
      img: ukrposhta,
      title: 'Укрпошта',
      text: 'Звертаємо Вашу увагу на те, що за певних умов, не всі товари можуть бути відправлені'
        + ' Укрпоштою. Детальну інформацію Ви можете дізнатися за телефонами або електронною'
        + ' поштою. Телефони та адреса електронної пошти вказані в контактах.',
    },
    {
      id: 3,
      img: novaposhta,
      title: 'Нова Пошта',
      text: 'Відправка замовлення здійснюється тільки після 100% передплати за товар. Доставка'
        + ' товарів на суму понад 5000 грн безкоштовна (склад-склад). Ми не несемо відповідальність'
        + ' за можливе псування вантажу при транспортуванні перевізником.',
    },
  ];

  const paymentArticlesArray = [
    {
      id: 1,
      img: cash,
      title: 'Оплата готівкою',
      text: 'Готівкою можливо розрахуватися після отримання замовлення в пунктах видачі та курєру'
        + ' після того, як товар буде перевірено замовником на якість, цілісність та відповідність'
        + ' до замовлення.',
    },
    {
      id: 2,
      img: cashless,
      title: 'Безготівкова оплата',
      text: 'Оплату можливо здійснити банківським платежем, для цього потрібно оплатити чек по'
        + ' реквізитам (вираховується банківська комісія). Як тільки кошти, що перераховуються,'
        + ' потрапляють на наш рахунок, товар передається до служби доставки.',
    },
  ];

  const costArticlesArray = [
    {
      id: 1,
      img: courier,
      title: 'Кур\'єром',
      cost: '50 грн.',
      term: 'до 3-х робочих днів',
    },
    {
      id: 2,
      img: ukrposhta,
      title: 'Укрпошта',
      cost: '15 грн.',
      term: '2-4 робочих днів',
    },
    {
      id: 3,
      img: novaposhta,
      title: 'Нова Пошта',
      cost: 'безкоштовно',
      term: 'до 3-х робочих днів',
    },
  ];

  const orderDetailsArticlesArray = [
    {
      id: 1,
      img: kit,
      title: 'Комплексність та цілісність',
      text: 'Обов’язково перевіряйте комплектність і цілісність товару при отриманні його у'
        + ' перевізника! Після того як Ви отримаєте товар, всі питання комплектності і'
        + ' цілісності товару буде дуже важко вирішити. При виникненні непорозумінь з'
        + ' компаніями-перевізниками переконливе прохання зателефонуйте нам не виходячи з'
        + ' офісу перевізника і ми вирішимо всі виниклі питання.',
    },
    {
      id: 2,
      img: warranty,
      title: 'Гарантія',
      text: 'Виробник гарантує якість продукції, що випускається, всі вироби відповідають'
        + ' усім санітарно-гігієнічним нормам і вимогам України. Якщо у Вас виникли питання'
        + ' або пропозиції щодо якості виробів - менеджер компанії завжди готовий допомогти!',
    },
  ];

  const ShipmentArticles = () => shipmentArticlesArray.map((el) => (
    <div key={el.id} className="shipment__article pt-4">
      <div className="d-flex pb-2">
        <img
          className="shipment__article-img pr-2"
          src={el.img}
          alt="article_img"
        />
        <h6 className="font-weight-bolder">{el.title}</h6>
      </div>
      <p>{el.text}</p>
    </div>
  ));

  const PaymentArticles = () => paymentArticlesArray.map((el) => (
    <div key={el.id} className="shipment__article pt-4">
      <div className="d-flex pb-2">
        <img
          className="shipment__article-img pr-2"
          src={el.img}
          alt="article_img"
        />
        <h6 className="font-weight-bolder">{el.title}</h6>
      </div>
      <p>{el.text}</p>
    </div>
  ));

  const CostArticles = () => costArticlesArray.map((el) => (
    <div key={el.id} className="shipment__article pt-4">
      <div className="d-flex pb-2">
        <img
          className="shipment__article-img pr-2"
          src={el.img}
          alt="article_img"
        />
        <h6 className="font-weight-bolder">{el.title}</h6>
      </div>
      <div>
        Вартість доставки:
        {` ${el.cost}`}
      </div>
      <div className="mb-3">
        Термін доставки:
        {` ${el.term}`}
      </div>
    </div>
  ));

  const OrderDetailsArticles = () => orderDetailsArticlesArray.map((el) => (
    <div key={el.id} className="shipment__article pt-4">
      <div className="d-flex pb-2">
        <img
          className="shipment__article-img pr-2"
          src={el.img}
          alt="article_img"
        />
        <h6 className="font-weight-bolder">{el.title}</h6>
      </div>
      <p>{el.text}</p>
    </div>
  ));

  return (
    <MDBContainer className="py-5 dark-grey-text font-small">
      <MDBCard>
        <MDBRow>
          <MDBCol>
            <img
              src={shipment}
              className="img-fluid shipment__title-img"
              alt="shipment_img "
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="px-3">
          <MDBCol md="6" sm="12" className="p-4">
            <h4 className="font-weight-bolder">
              <MDBIcon icon="shipping-fast" className="pr-2 blue-text" />
              Способи доставки
            </h4>
            <p>
              Відправка замовлень здійснюється за допомогою служби доставки до 12:00.
              Всі замовлення, які оплачуються або надійшли пізніше відправляються наступного дня
              після відправлення службою.
            </p>
            <ShipmentArticles />
          </MDBCol>
          <MDBCol md="6" sm="12" className="p-4">
            <h4 className="font-weight-bolder">
              <MDBIcon icon="credit-card" className="pr-2 pink-text" />
              Способи оплати
            </h4>
            <p>
              Оплату можливо здійснити банківською карткою та готівкою при отриманні
              замовлення в пунктах видачі або післяcплатою безпосередньо в представництві служб
              доставки «Укрпочта» та «Нова Пошта»;
            </p>
            <PaymentArticles />
            <div className="shipment__article pt-4">
              <div className="d-flex pb-2">
                <h6 className="font-weight-bolder">Здійснити оплату можливо за допомогою:</h6>
              </div>
              <img
                className="shipment__article-img p-1"
                src={visa}
                alt=""
              />
              <img
                className="shipment__article-img p-1"
                src={mastercard}
                alt=""
              />
              <img
                className="shipment__article-img p-1"
                src={liqpay}
                alt=""
              />
              <img
                className="shipment__article-img p-1"
                src={privat}
                alt=""
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="px-3">
          <MDBCol md="6" sm="12" className="p-4">
            <h4 className="font-weight-bolder">
              <MDBIcon icon="hand-holding-usd" className="pr-2 green-text" />
              Вартість
            </h4>
            <p>
              Вартість відправлення залежить від вибору способу доставки товарів від магазину до
              покупців.
            </p>
            <CostArticles />
          </MDBCol>
          <MDBCol md="6" sm="12" className="p-4">
            <h4 className="font-weight-bolder">
              <MDBIcon icon="info-circle" className="pr-2 amber-text" />
              Деталі здійснення замовлення
            </h4>
            <p>
              Те, що важливо знати при здійснення замовлення та усі нюанси оплати товарів.
            </p>
            <OrderDetailsArticles />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Shipment;
