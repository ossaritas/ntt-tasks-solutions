import { useEffect, useState } from "react";
import Task from "./Task";
import Loader from "../UI/Loader";
import { v4 as uuidv4 } from "uuid";

const TaskThree = () => {
  const [offerCount, setOfferCount] = useState(0);
  const [sortedOffers, setSortedOffers] = useState([]);

  const sortOrders = (orders, newOffer) => {
    const newArray = [newOffer, ...orders];
    const modifiedArray = [...newArray];
    console.log(modifiedArray);
    return modifiedArray.sort(
      (a, b) =>
        parseFloat(
          a.QuotaInfo.HasDiscount ? a.QuotaInfo.PremiumWithDiscount : a.Cash
        ) -
        parseFloat(
          b.QuotaInfo.HasDiscount ? b.QuotaInfo.PremiumWithDiscount : b.Cash
        )
    );
  };
  useEffect(() => {
    const fetchOfferCount = async () => {
      const offerCount = await fetch(
        "https://snetmyapp.herokuapp.com/get_offer_count"
      );
      const jsonResponse = await offerCount.json();
      const offersNum = jsonResponse.num_offers;
      setOfferCount(offersNum);
    };
    fetchOfferCount();
  }, []);

  useEffect(() => {
    if (offerCount) {
      const numArr = new Array(offerCount).fill(0);
      numArr.map(() =>
        fetch("https://snetmyapp.herokuapp.com/case3")
          .then((response) => response.json())
          .then((newOffer) => {
            setSortedOffers((offers) => sortOrders(offers, newOffer));
          })
      );
    }
  }, [offerCount]);

  return (
    <div>
      {sortedOffers.length !== offerCount ? (
        <Loader offerCount={offerCount - sortedOffers.length} />
      ) : null}
      {sortedOffers.map((item) => (
        <Task
          key={uuidv4()}
          img={item.ImagePath}
          firmName={item.FirmName}
          type={item.ProductDesc}
          description={
            item.popoverContent ? item.popoverContent[0].Description : false
          }
          explanation={item.popoverContent ? item.popoverContent[0].Title : ""}
          discount={item.QuotaInfo.HasDiscount}
          dsPrice={item.QuotaInfo.PremiumWithDiscount}
          price={item.Cash}
          saleActive={item.SaleClosed}
        />
      ))}
    </div>
  );
};

export default TaskThree;
