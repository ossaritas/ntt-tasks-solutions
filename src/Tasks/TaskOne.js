import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Task from "./Task";

const TaskOne = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch("https://snetmyapp.herokuapp.com/case1");
      const jsonResponse = await response.json();
      const { offerList } = jsonResponse;
      setOffers(offerList);
    };
    fetchOffers();
  }, []);

  return (
    <div>
      {offers
        ? offers.map((item) => (
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
        : null}
    </div>
  );
};

export default TaskOne;
