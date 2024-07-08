"use client";

import React from "react";
import { useParams } from "next/navigation";
import InstaCard from "@/components/product-card/insta-card";

type CardData = {
  title: string;
  thumbnail: string;
  source_icon: string;
  price: string;
  link: string;
};

type Results = {
  [key: number]: CardData[]; // Assumes that the keys are numbers
};

const Searches = () => {
  let results: Results = {
    0: [
      {
        title: "Van Heusen Men Slim Fit Shirt",
        thumbnail:
          "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThKo6G2gC4_8e6nERn_gAXxfOyCu8qpzYjhG0J20rjz1DolMrl",
        source_icon:
          "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
        price: "₹1,789.00",
        link: "https://www.amazon.in/Van-Heusen-Men-Shirt/dp/B0BCPVVLCV",
      },
      {
        title: "Classic Mens Solid White Formal Shirt",
        thumbnail:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaAXYGijGOnOGKSgMxq_Vn88hUYL4-Pc3bXIkPV-yucs7iIfxB",
        source_icon:
          "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcSVSgO1cREAcotL53kgY41YeEtpIzj_v89mZqm4xpWf9tiQeKqzzMvk4LCW8jxKSe1LaauexP12mxcbDe-aRQpgrbMEXDVL8rtxsJjRV8__7y9rVGPaMg",
        price: "1,789.00",
        link: "https://www.goosebery.com/products/gbmnr-3005",
      },
      {
        title: "Devin Fox Men Solid Casual White Shirt",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRckNgEeAVKVP6ESadxAUFOImqlsaS26Z43aqXSWErMqintEL",
        source_icon:
          "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTZINa-Te7bv8MscB5b6FfK__Uu4XBkWQsis7wRqrWRsMISW0ldAmte6VNWHgquxAHZyLYCZZswiMTaqLML3WB19-_CfgDoKZ-dupPqPfoV6TgbXdaR",
        price: "1,789.00",
        link: "https://www.flipkart.com/devin-fox-men-solid-casual-white-shirt/p/itm50a8c880dc94a?pid=SHTGKHZA5BJBDVYM&lid=LSTSHTGKHZA5BJBDVYM4A5I6V&marketplace=FLIPKART&store=clo%2Fash%2Faxc%2Fmmk%2Fkp7",
      },
      {
        title: "Mens Urban Slim Fit Printed Shirt",
        thumbnail:
          "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRoR9kWwZWKkzKgQwYHjKnbkKHrjF3_t8EDCJQcLbmWWWFQvSqy",
        source_icon:
          "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcRYP9nXiBtEydtSJOfYS2P816QcX4ZVJfTK0lPLcd16En5x0VevcGpLONr3gmz_IEnsmeUcO3jcZ_9JXEQDm_KGvXHIEdYl6UFzEx6Yw308rvakYV2_9xNk1Q",
        price: "₹2,099.00",
        link: "https://www.shoppersstop.com/arrow-mens-urban-slim-fit-printed-shirt/p-202092567/colorChange/202092567_WHITE",
      },
      {
        title: "White Slim Fit Solid Full Sleeves Shirt",
        thumbnail:
          "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRFd4FEvPJtduhBgd3kON5miLZmJye6Cv7aqf8UpBErua8uxNyi",
        source_icon:
          "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTd3jYGszPpQhlQRf-AHW4koIeQoD85nubY7pzGnGiFyCWNxDSHE6hnC3zvJh0431GviARNRnCXC4e6GBUdum1grqgTJYXNEdn-bGG7o753t830zeP6Ag4Ai_3CeA",
        price: "1,789.00",
        link: "https://vanheusenindia.abfrl.in/p/van-heusen-white-shirt-39563443.html",
      },
      {
        title: "Solid Casual Shirt with Button Placket",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZAu9HBu-uwECqg__sn9mfCEJELvKiJlCjZSvVA5EW76agKMxI",
        source_icon:
          "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcQoPnP33u1jZH8WK201Opjohx-X8o2G7hOq8p-eXeTKfhwXQT4lt1PnnekHaOjMP8jHYNTT7oylMgDqxCHtvoMmYv0_n2bUfKSDTERjeYGzkEpr",
        price: "1,789.00",
        link: "https://stylishop.com/sa/en/product-dennis-lingo-solid-casual-shirt-with-button-placket-7006634220",
      },
      {
        title: "Van Heusen White Slim Fit Shirt",
        thumbnail:
          "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrHEsx9l_J_mJAqHnFCmtp5W-Ab_64f1kuSzJJVwq2hQQs_Ax-",
        source_icon:
          "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcTzTKd6vOpthf_YakKljUYHZVndAOFGJkAQe0-GTN1GE_BXa3uwKYcOXXmK2mWW16aXGkqjKiwN8s6Gr_NpknFuxGT96zA7HWw2MKcNK66z6tqekgEc",
        price: "INR 100,000",
        link: "https://www.tatacliq.com/van-heusen-white-slim-fit-cotton-shirt/p-mp000000008428707",
      },
      {
        title: "Men's Plain Long Sleeve Cotton Shirt ",
        link: "https://www.meesho.com/mens-plain-solid-long-sleeve-casual-cotton-shirt/p/2oufy8",
        source_icon:
          "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcRILfQUakeHOSu5dggkcAVZJbGTnrIo5JZHHOEXQWwdf5i0EKvvQYH6cEKDmx9wLxk96e8RIaCcliCvNvGwIHrWTvDu0O2iEYc0AyVVYil21gFn_A",
        thumbnail:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQzDBOilbigf5sbvdMJkj5vta2TzU7FKfxXXpjY_18n8HtkHxpb",
        price: "INR 100,000",
      },
    ],

    1: [
      {
        title: "Van Heusen Men Slim Fit Shirt",
        thumbnail:
          "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThKo6G2gC4_8e6nERn_gAXxfOyCu8qpzYjhG0J20rjz1DolMrl",
        source_icon:
          "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcR2emfet7RmzmPRsHjYm_UPCTAgzmbvxRasG6I2u0I4LbQ54ZknecWGFOlBWs77JqzWT4yV05Z70DroaUwrYGlJKA1RUCO8YFzPxNBQf8kSXLfu",
        price: "₹1,789.00",
        link: "https://www.amazon.in/Van-Heusen-Men-Shirt/dp/B0BCPVVLCV",
      },
      {
        title: "Classic Mens Solid White Formal Shirt",
        thumbnail:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaAXYGijGOnOGKSgMxq_Vn88hUYL4-Pc3bXIkPV-yucs7iIfxB",
        source_icon:
          "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcSVSgO1cREAcotL53kgY41YeEtpIzj_v89mZqm4xpWf9tiQeKqzzMvk4LCW8jxKSe1LaauexP12mxcbDe-aRQpgrbMEXDVL8rtxsJjRV8__7y9rVGPaMg",
        price: "1,789.00",
        link: "https://www.goosebery.com/products/gbmnr-3005",
      },
      {
        title: "Devin Fox Men Solid Casual White Shirt",
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRckNgEeAVKVP6ESadxAUFOImqlsaS26Z43aqXSWErMqintEL",
        source_icon:
          "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcTZINa-Te7bv8MscB5b6FfK__Uu4XBkWQsis7wRqrWRsMISW0ldAmte6VNWHgquxAHZyLYCZZswiMTaqLML3WB19-_CfgDoKZ-dupPqPfoV6TgbXdaR",
        price: "1,789.00",
        link: "https://www.flipkart.com/devin-fox-men-solid-casual-white-shirt/p/itm50a8c880dc94a?pid=SHTGKHZA5BJBDVYM&lid=LSTSHTGKHZA5BJBDVYM4A5I6V&marketplace=FLIPKART&store=clo%2Fash%2Faxc%2Fmmk%2Fkp7",
      },
    ],
  };

  const params = useParams<{ id: string }>(); // Specify that `id` is a string
  const id = parseInt(params.id, 10); // Convert to number since your results use numeric keys
  const resultsCurrent = results[id] || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-14 justify-items-center">
        {resultsCurrent.map((card, index) => (
          <InstaCard
            key={index}
            className="w-full cursor-pointer"
            cardData={card}
          />
        ))}
      </div>
    </div>
  );
};

export default Searches;
