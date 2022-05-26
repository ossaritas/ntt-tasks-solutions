import { useEffect, useState } from "react";
import Task from "./Task";
import Loader from "../UI/Loader";
import { v4 as uuidv4 } from "uuid";

const TaskThree = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [offerCount, setOfferCount] = useState(0);

  useEffect(() => {
    const fetchOfferCount = async () => {
      const offerCount = await fetch(
        "https://snetmyapp.herokuapp.com/get_offer_count"
      );
      const jsonResponse = await offerCount.json();
      const offersNum = jsonResponse.num_offers;
      setOfferCount(offersNum);
      let numArr = [];
      for (let i = 1; i <= offersNum; i++) {
        numArr.push(i);
      }
      const dataPromises = numArr.map((r) =>
        fetch("https://snetmyapp.herokuapp.com/case3")
      );
      const datas = await Promise.all(dataPromises);
      const data = await Promise.all(datas.map((r) => r.json()));

      setOffers(data);
      setIsLoading(false);
    };
    fetchOfferCount();
  }, []);
  const ascendOffers = offers.sort(
    (a, b) =>
      parseFloat(
        a.QuotaInfo.HasDiscount ? a.QuotaInfo.PremiumWithDiscount : a.Cash
      ) -
      parseFloat(
        b.QuotaInfo.HasDiscount ? b.QuotaInfo.PremiumWithDiscount : b.Cash
      )
  );
  return (
    <div>
      {isLoading ? (
        <Loader offerCount={offerCount} />
      ) : (
        ascendOffers.map((item) => (
          <Task
            key={uuidv4()}
            img={item.ImagePath}
            firmName={item.FirmName}
            type={item.ProductDesc}
            description={
              item.popoverContent ? item.popoverContent[0].Description : false
            }
            explanation={
              item.popoverContent ? item.popoverContent[0].Title : ""
            }
            discount={item.QuotaInfo.HasDiscount}
            dsPrice={item.QuotaInfo.PremiumWithDiscount}
            price={item.Cash}
            saleActive={item.SaleClosed}
          />
        ))
      )}
    </div>
  );
};

export default TaskThree;
