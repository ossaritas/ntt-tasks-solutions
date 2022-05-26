import { useEffect, useState } from "react";
import Task from "./Task";
import Loader from "../UI/Loader";
import { v4 as uuidv4 } from "uuid";

const TaskTwo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch("https://snetmyapp.herokuapp.com/case2");
      const jsonResponse = await response.json();
      const { offerList } = jsonResponse;
      setOffers(offerList);
      setIsLoading(false);
    };
    fetchOffers();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        offers.map((item) => (
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

export default TaskTwo;
